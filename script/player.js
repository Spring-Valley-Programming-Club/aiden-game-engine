class Player{
   constructor(x,y,v,r){
      this.x = x;
      this.y = y;
      this.calcr = {
         x: 0,
         y: 0
      };
      this.mov = {
         x: 0,
         y: 0,
         r: 0
      };
      this.v = v;
      this.r = r;
      /*this.action = {
         ActOne: function(){
            pen.fillStyle = 'black';
            pen.fillText('Action one', 5, 0);
         },
         ActTwo: function(){
            pen.fillStyle = 'black';
            pen.fillText('Action two', 5, 10);
         },
         ActThr: function(){
            pen.fillStyle = 'black';
            pen.fillText('Action three', 5, 20);
         },
         ActFou: function(){
            pen.fillStyle = 'black';
            pen.fillText('Action four', 5, 30);
         },
         ActFiv: function(){
            pen.fillStyle = 'black';
            pen.fillText('Action five', 5, 40);
         },
         ActSix: function(){
            pen.fillStyle = 'black';
            pen.fillText('Action six', 5, 50);
         },
         ActEva: function(){
            pen.fillStyle = 'black';
            pen.fillText('Action evasive', 5, 60);
         },
         ActDef: function(){
            pen.fillStyle = 'black';
            pen.fillText('Action defensive', 5 ,70);
         },
         MoveLe: function(){
            // pen.fillStyle = 'black';
            // pen.fillText('Move left', 5, 80);
            this.x -= 5;
         },
         MoveRi: function(){
            // pen.fillStyle = 'black';
            // pen.fillText('Move right', 5, 90);
            this.x += 5;
         },
         MoveUp: function(){
            // pen.fillStyle = 'black';
            // pen.fillText('Move up', 5, 100);
            this.y -= 5;
            pen.fillStyle = 'black';
            pen.fillText(JSON.stringify(this), 50, 110);
            pen.fillText(JSON.stringify(P), 50, 120);
            // P.y -= 1;
         },
         MoveDo: function(){
            // pen.fillStyle = 'black';
            // pen.fillText('Move down', 5, 110);
            this.y += 5;
            pen.fillStyle = 'black';
            pen.fillText(JSON.stringify(this), 50, 110);
            pen.fillText(JSON.stringify(P), 50, 120);
            // P.y += 1;
         },
         TstFnc: function(){
            pen.fillStyle = 'black';
            pen.fillText('Test function', 5, 120);
         }
      }*/
      if(!G.M.GetTileColli(this.x, this.y)){
            G.M.T.S[this.GetTrueCoords().y][this.GetTrueCoords().x] = 0;
      }
   }
   draw(){
      pen.fillStyle = 'hotpink';
      pen.strokeStyle = 'black';
      pen.lineWidth = 1;
      pen.beginPath();
      pen.arc(this.x, this.y, 5, 0, 2*Math.PI);
      pen.closePath();
      pen.fill();
      pen.stroke();
      if(this.calcr.x || this.calcr.y){
         pen.beginPath();
         pen.moveTo(this.x + 5 * Math.cos(this.ang), this.y + 5 * Math.sin(this.ang));
         pen.lineTo(this.x + 10 * Math.cos(this.ang), this.y + 10 * Math.sin(this.ang));
         pen.closePath();
         pen.stroke();
      }
   }
   move(delta){
      this.ang = Math.atan2(this.calcr.y, this.calcr.x);
      if(this.ang < 0) this.ang += 2 * Math.PI;
      this.r += this.mov.r;
      if(this.calcr.x || this.calcr.y){
         if(G.cfg.AbsolutePlayerDirection){
            this.mov.x *= Math.cos(this.ang) * this.calcr.x;
            this.mov.y *= Math.sin(this.ang) * this.calcr.y;
         }
      }
      let MoveAllow = this.CheckMove(this.mov.x, this.mov.y);
      if(MoveAllow.y){
         // this.y += this.mov.y;
         G.M.mob.offy = this.mov.y;
      }
      if(MoveAllow.x){
         // this.x += this.mov.x;
         G.M.mob.offx = this.mov.x;
      }
      this.mov.x = 0;
      this.mov.y = 0;
      this.mov.r = 0;
      this.calcr = {
         x: 0,
         y: 0
      };
   }
   CheckMove(x, y){
      let project = {
         x: 0,
         y: 0
      }
      project.x = this.x + x;
      project.y = this.y + y;
      return this.PointValid(project);
      
   }
   PointValid(coord){
      // ADD A THING TO CHECK IF VALID BY TILE
      // Currently just returns a positive, the if() loops are just artifacts
      let rtrn = {
         x: 0,
         y: 0
      };
      if(G.M.GetTileColli(coord.x, this.y)){
         rtrn.x = 1;
      }
      if(G.M.GetTileColli(this.x, coord.y)){
         rtrn.y = 1;
      }
      // if(coord.x - 5 > G.S.minx && coord.x + 5 < G.S.maxx){
      //    rtrn.x = 1;
      // }
      // if(coord.y - 5 > G.S.miny && coord.y + 5 < G.S.maxy){
      //    rtrn.y = 1;
      // }
      return rtrn;
   }
   BindAction(k, m, a, id){
      // REMEMBER - add a thing that removes old keybinds on new one set
      let bind = new InputBind(k, m, a, id)
      KeyBinds.push(bind);
   }
   DefaultControls(){
      let TK = G.cfg.ToggleKey;
      P.BindAction(['KeyO'], null, [TK], 'ActOne');
      P.BindAction(['KeyP'], null, [TK], 'ActTwo');
      P.BindAction(['KeyL'], null, [TK], 'ActThr');
      P.BindAction(['Semicolon'], null, [TK], 'ActFou');
      P.BindAction([TK,'KeyO'], null, null, 'ActFiv');
      P.BindAction([TK,'KeyP'], null, null, 'ActSix');
      P.BindAction([TK,'KeyL'], null, null, 'ActSev');
      P.BindAction([TK,'Semicolon'], null, null, 'ActEig');
      P.BindAction(['Space'], null, [TK], 'ActEva');
      P.BindAction([TK,'Space'], null, null, 'ActDef');
      P.BindAction(['KeyA'], null, null, 'MoveLe');
      P.BindAction(['KeyD'], null, null, 'MoveRi');
      P.BindAction(['KeyW'], null, null, 'MoveUp');
      P.BindAction(['KeyS'], null, null, 'MoveDo');
      P.BindAction(['ArrowDown'], null, null, 'TstFnc');
   }
   GetTrueCoords(){
      let tc = {
         x: Math.floor((this.x - G.M.x) / G.M.tilesize),
         y: Math.floor((this.y - G.M.y) / G.M.tilesize)
      };
      return tc;
   }
   ActOne(){
      pen.fillStyle = 'black';
      pen.fillText('Action one', 5, 0);
   }
   ActTwo(){
      pen.fillStyle = 'black';
      pen.fillText('Action two', 5, 10);
   }
   ActThr(){
      pen.fillStyle = 'black';
      pen.fillText('Action three', 5, 20);
   }
   ActFou(){
      pen.fillStyle = 'black';
      pen.fillText('Action four', 5, 30);
   }
   ActFiv(){
      pen.fillStyle = 'black';
      pen.fillText('Action five', 5, 40);
      
   }
   ActSix(){
      pen.fillStyle = 'black';
      pen.fillText('Action six', 5, 50);
      
   }
   ActSev(){
      pen.fillStyle = 'black';
      pen.fillText('Action seven', 5, 60);
   }
   ActEig(){
      pen.fillStyle = 'black';
      pen.fillText('Action eight', 5, 70);
   }
   ActEva(){
      pen.fillStyle = 'black';
      pen.fillText('Action evasive', 5, 80);
      
   }
   ActDef(){
      pen.fillStyle = 'black';
      pen.fillText('Action defensive', 5, 90);
   }
   MoveLe(){
      // pen.fillStyle = 'black';
      // pen.fillText('Move left', 5, 80);
      this.calcr.x -= 1;
      this.mov.x -= this.v;
   }
   MoveRi(){
      // pen.fillStyle = 'black';
      // pen.fillText('Move right', 5, 90);
      this.calcr.x += 1;
      this.mov.x += this.v;
   }
   MoveUp(){
      // pen.fillStyle = 'black';
      // pen.fillText('Move up', 5, 100);
      this.calcr.y -= 1;
      this.mov.y -= this.v;
   }
   MoveDo(){
      // pen.fillStyle = 'black';
      // pen.fillText('Move down', 5, 110);
      this.calcr.y += 1;
      this.mov.y += this.v;
   }
   TstFnc(){
      pen.fillStyle = 'black';
      pen.fillText('Test function', 5, 100);
   }
}

var P = G.P = new Player(G.S.center.x,G.S.center.y,1.5,0);
P.DefaultControls();