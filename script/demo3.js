class spinny extends Entity{
   constructor(x,y,r,misc,traillength,size,speed){
      super(x,y,r,misc);
      this.long = traillength;
      this.tail = [];
      this.size = size;
      this.speed = speed;
   }
   ai(){
      this.mov.x = Math.round(Math.random() + 0.49) * this.speed * Math.cos(this.r);
      this.mov.y = Math.round(Math.random() + 0.49) * this.speed * Math.sin(this.r);
      this.mov.r = 0.25 * (Math.random() - 0.5) * Math.PI;
      if(this.mov.r > 2 * Math.PI) this.mov.r -= 2 * Math.PI;
      if(this.misc.t){
         this.misc.t--;
         if(this.misc.t <= 0){
            this.KillEnt();
         }
      }
      new spinnytailsegment(this.x,this.y,0,this);
      if(Math.random() * 100 < 0.5 && !this.misc.t){
         // new spark(this.x,this.y,Math.random()*6.23,{color:this.misc.color,t:(Math.random()*40)},40,1,this.speed*3);
         new spark(this.x,this.y,Math.random()*40,this);
      }
   }
   PointValid(coord){
      let rtrn = {
         x: 0,
         y: 0
      }
      if(coord.x - this.size > G.S.minx && coord.x + this.size < G.S.maxx){
         rtrn.x = 1;
      }
      if(coord.y - this.size > G.S.miny && coord.y + this.size < G.S.maxy){
         rtrn.y = 1;
      }
      return rtrn;
   }
   draw(){
      pen.fillStyle = this.misc.color;
      pen.beginPath();
      pen.arc(this.x,this.y,this.size,0,2*Math.PI);
      pen.fill();
      pen.closePath();
   }
}

class spinnytailsegment extends Entity{
   constructor(x,y,t,parent){
      super(x,y,0,parent.misc);
      this.t = 0;
      this.maxt = parent.long;
      this.maxsize = parent.size;
   }
   ai(){
      if(this.t >= this.maxt){
         this.KillEnt();
      }
      this.t++;
   }
   PointValid(coord){
      return {x: 1, y: 1};
   }
   draw(){
      pen.fillStyle = this.misc.color;
      pen.beginPath();
      pen.arc(this.x, this.y, this.maxsize * ((this.maxt - this.t) / this.maxt), 0, 2 * Math.PI);
      pen.fill();
      pen.closePath();
   }
}

class spark extends Entity{
   constructor(x,y,t,parent){
      super(x,y,0,parent.misc);
      this.t = t;
      this.long = parent.long / 3;
      this.tail = [];
      this.size = parent.size / 3;
      this.speed = parent.speed * 3;
      this.decay = this.size / this.long;
   }
   ai(){
      if(this.t > 0){
         this.mov.x = Math.round(Math.random() + 0.49) * this.speed * Math.cos(this.r);
         this.mov.y = Math.round(Math.random() + 0.49) * this.speed * Math.sin(this.r);
         this.mov.r = 0.25 * (Math.random() - 0.5) * Math.PI;
         if(this.mov.r > 2 * Math.PI) this.mov.r -= 2 * Math.PI;
         this.tail.push(new sparktail(this.x,this.y,this));
      }
      if(this.t < 0){
         this.size -= this.decay;
         if(this.size <= 0) this.size = 0.01;
      }
      if(this.t <= 0 - this.long){
         this.KillEnt();
      }
      this.t--;
   }
   PointValid(coord){
      let rtrn = {
         x: 0,
         y: 0
      }
      if(coord.x > G.S.minx && coord.x < G.S.maxx){
         rtrn.x = 1;
      }
      if(coord.y > G.S.miny && coord.y < G.S.maxy){
         rtrn.y = 1;
      }
      return rtrn;
   }
   draw(){
      let DelTail = 0;
      let TailEnd = this.tail.length;
      // pen.globalAlpha = 0.5;
      for(let i = 0; i < this.tail.length; i++){
         let ThisPnt = this.tail[i-DelTail];
         // pen.lineWidth = ThisPnt.currsize * 2;
         // pen.lineWidth = ((ThisPnt.maxt - ThisPnt.t) / ThisPnt.maxt) * this.size;
         pen.lineWidth = ((i + 1 - DelTail) / TailEnd) * this.size * 2;
         pen.strokeStyle = this.misc.color;
         ThisPnt.draw();
         if(this.tail[i+1-DelTail]){
            let NextPnt = this.tail[i+1-DelTail];
            if(this.tail[i+2]){
               let LastPnt = this.tail[i+2-DelTail];
               pen.beginPath();
               pen.moveTo(ThisPnt.x, ThisPnt.y);
               pen.quadraticCurveTo(NextPnt.x, NextPnt.y, LastPnt.x, LastPnt.y);
               pen.moveTo(NextPnt.x, NextPnt.y);
               pen.closePath();
               pen.stroke();
            }else{
               let LastPnt = {};
               LastPnt.x = this.x;
               LastPnt.y = this.y;
               pen.lineCap = 'round';
               pen.beginPath();
               pen.moveTo(ThisPnt.x, ThisPnt.y);
               pen.quadraticCurveTo(NextPnt.x, NextPnt.y, LastPnt.x, LastPnt.y);
               pen.moveTo(NextPnt.x, NextPnt.y);
               pen.closePath();
               pen.stroke();
            }
         }
         if(this.tail[i-DelTail].t >= this.tail[i-DelTail].maxt){
            this.tail.splice(i-DelTail,1);
            DelTail++;
         }
      }
      // pen.fillStyle = this.misc.color;
      // pen.beginPath();
      // pen.arc(this.x,this.y,this.size,0,2*Math.PI);
      // pen.fill();
      // pen.closePath();
      // pen.globalAlpha = 1;
   }
}

class sparktail{
   constructor(x,y,parent){
      this.x = x;
      this.y = y;
      this.t = 0;
      this.maxt = parent.long;
      this.maxsize = parent.size;
      this.color = parent.misc.color;
      this.currsize = this.maxsize * ((this.maxt - this.t) / this.maxt);
   }
   draw(){
      this.currsize = this.maxsize * ((this.maxt - this.t) / this.maxt);
      this.t++;
   }
}

// var spinnyboi = new spinny(20,20,0,{color:'blue'},60,6,0.5);
// var spinnyboi2 = new spinny(40,40,0,{color:'red'},50,4,1);
// var spinnyboi3 = new spinny(60,60,0,{color:'green'},80,8,0.2);
// var spinnyboi4 = new spinny(80,80,0,{color:'purple'},60,8,0.8);
// var spinnyboi5 = new spinny(100,100,0,{color:'yellow'},65,4,1.25);
// var spinnyboi6 = new spinny(20,120,0,{color:'blue'},60,6,0.5);
// var spinnyboi7 = new spinny(140,40,0,{color:'red'},50,4,1);
// var spinnyboi8 = new spinny(60,160,0,{color:'green'},75,8,0.2);
// var spinnyboi9 = new spinny(180,80,0,{color:'purple'},50,8,0.8);
// var spinnyboi10 = new spinny(120,100,0,{color:'yellow'},75,4,1.25);