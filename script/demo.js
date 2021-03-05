var spinny = {
   x: 5,
   y: 5,
   r: 0
};
var spinny2 = {
   x: 100,
   y: 100,
   r: 3.14
}
var spinnylist = [];
var spinnydel = 0;
var spinnylist2 = [];
var spinnydel2 = 0;
var spinsize = 5;
var traillength = 60;
class spinnytrail{
   constructor(x,y){
      this.x = x;
      this.y = y;
      this.time = traillength;
   }
   act(){
      pen.beginPath();
      pen.arc(this.x,this.y,spinsize * spinnylist.indexOf(this) / traillength,0,2*Math.PI);
      pen.fill();
      pen.closePath();
      if(this.time == 0){
         spinnylist.splice(0,1);
         spinnydel++;
      }
      this.time--;
      // if(this.time == 0){
         // spinnylist.splice(0,spinnylist.indexOf(this),1);
      // }
   }
}
class spinnytrail2{
   constructor(x,y){
      this.x = x;
      this.y = y;
      this.time = traillength;
   }
   act(){
      pen.beginPath();
      pen.arc(this.x,this.y,spinsize * spinnylist2.indexOf(this) / traillength,0,2*Math.PI);
      pen.fill();
      pen.closePath();
      if(this.time == 0){
         spinnylist2.splice(0,1);
         spinnydel2++;
      }
      this.time--;
      // if(this.time == 0){
         // spinnylist.splice(0,spinnylist.indexOf(this),1);
      // }
   }
}
function drawspinny(){
   try{
   pen.imageSmoothingEnabled = false;
   spinnydel = 0;
   pen.clearRect(0,0,screen.x,screen.y);
   pen.fillStyle = 'red';
   pen.beginPath();
   pen.arc(spinny.x,spinny.y,spinsize,0,2*Math.PI);
   pen.fill();
   pen.closePath();
   // spinny.x += Math.random() * 5 * Math.cos(spinny.r);
   spinny.x += Math.round(Math.random() + 0.49) * 2.5 * Math.cos(spinny.r);
   // spinny.y += Math.random() * 5 * Math.sin(spinny.r);
   spinny.y += Math.round(Math.random() + 0.49) * 2.5 * Math.sin(spinny.r);
   spinny.r += 0.15 * (Math.random() - 0.5) * Math.PI;
   if(spinny.x > screen.x) spinny.x = spinny.x - screen.x;
   if(spinny.x < 0) spinny.x = screen.x - spinny.x;
   if(spinny.y > screen.y) spinny.y = spinny.y - screen.y;
   if(spinny.y < 0) spinny.y = screen.y - spinny.y;
   if(spinny.r > 2 * Math.PI) spinny.r -= 2 * Math.PI;
   
   spinnylist.push(new spinnytrail(spinny.x, spinny.y));
   
   for(let i = 0; i < spinnylist.length; i++){
      spinnylist[i - spinnydel].act();
   }
   
   spinnydel2 = 0;
   pen.fillStyle = 'blue';
   pen.beginPath();
   pen.arc(spinny2.x,spinny2.y,spinsize,0,2*Math.PI);
   pen.fill();
   pen.closePath();
   // spinny.x += Math.random() * 5 * Math.cos(spinny.r);
   spinny2.x += Math.round(Math.random() + 0.49) * 2.5 * Math.cos(spinny2.r);
   // spinny.y += Math.random() * 5 * Math.sin(spinny.r);
   spinny2.y += Math.round(Math.random() + 0.49) * 2.5 * Math.sin(spinny2.r);
   spinny2.r += 0.15 * (Math.random() - 0.5) * Math.PI;
   if(spinny2.x > screen.x) spinny2.x = spinny2.x - screen.x;
   if(spinny2.x < 0) spinny2.x = screen.x - spinny2.x;
   if(spinny2.y > screen.y) spinny2.y = spinny2.y - screen.y;
   if(spinny2.y < 0) spinny2.y = screen.y - spinny2.y;
   if(spinny2.r > 2 * Math.PI) spinny2.r -= 2 * Math.PI;
   
   spinnylist2.push(new spinnytrail2(spinny2.x, spinny2.y));
   
   for(let i = 0; i < spinnylist2.length; i++){
      spinnylist2[i - spinnydel2].act();
   }
   }
   catch(err){
      alert(err);
   }
   window.requestAnimationFrame(drawspinny);
}
spinnylist.push(new spinnytrail(5,5));
spinnylist2.push(new spinnytrail2(100,100));
window.requestAnimationFrame(drawspinny);