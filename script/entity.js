var ActiveEntities = [];

class Entity{
   constructor(x,y,r,misc){
      this.x = x + G.M.x;
      this.y = y + G.M.y;
      this.tx = x + G.M.x;
      this.ty = y + G.M.y;
      this.r = r;
      this.misc = misc;
      this.mov = {
         x: 0,
         y: 0,
         r: 0
      };
      ActiveEntities.push(this);
   }
   LoadSprite(sprite){
      this.sprite = new Image();
      this.sprite.src = sprite;
   }
   KillEnt(){
      ActiveEntities.splice(ActiveEntities.indexOf(this),1);
      EntitiesDeleted++;
   }
   GetTrueCoords(){
      let tc = {
         x: Math.floor((this.x - G.M.x) / G.M.tilesize),
         y: Math.floor((this.y - G.M.y) / G.M.tilesize)
      };
      return tc;
   }
   ai(){
      this.mov.x = Math.round(Math.random() + 0.49) * 0.5 * Math.cos(this.r);
      this.mov.y = Math.round(Math.random() + 0.49) * 0.5 * Math.sin(this.r);
      this.mov.r = 0.15 * (Math.random() - 0.5) * Math.PI;
      if(this.mov.r > 2 * Math.PI) this.mov.r -= 2 * Math.PI;
   }
   move(delta){
      if(!G.M.GetTileColli(this.x, this.y)){
         this.x = G.M.x+(Math.round(G.M.T.S[0].length*Math.random())*G.M.tilesize);
         this.y = G.M.y+(Math.round(G.M.T.S.length*Math.random())*G.M.tilesize);
      }
      let MoveAllow = this.CheckMove(this.mov.x, this.mov.y);
      if(MoveAllow.x) this.x += this.mov.x;
      if(MoveAllow.y) this.y += this.mov.y;
      this.x -= G.M.mob.offx;
      this.y -= G.M.mob.offy;
      this.r += this.mov.r;
      this.mov.x = 0;
      this.mov.y = 0;
      this.mov.r = 0;
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
      let rtrn = {
         x: 0,
         y: 0
      }
      if(G.M.GetTileColli(coord.x, this.y) && G.M.GetTileColli(coord.x + 5, this.y + 5)){
         rtrn.x = 1;
      }
      if(G.M.GetTileColli(this.x, coord.y) && G.M.GetTileColli(this.x + 5, coord.y + 5)){
         rtrn.y = 1;
      }
      return rtrn;
   }
   draw(){
      pen.fillStyle = 'red';
      // pen.fillRect(this.x, this.y, 5, 5);
      pen.strokeStyle = 'black';
      pen.lineWidth = 2;
      pen.beginPath();
      // pen.moveTo(this.x, this.y);
      pen.rect(this.x, this.y, 5, 5);
      pen.closePath();
      pen.stroke();
      pen.fill();
   }
}