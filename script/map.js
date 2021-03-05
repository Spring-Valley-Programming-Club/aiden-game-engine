// Maybe also add a height or flight thing
class Map{
   constructor(x,y,s,tileset,colliders,tiledata){
      this.x = x;
      this.y = y;
      this.TexturesLoaded = 0;
      this.mob = {
         offx: 0,
         offy: 0
      };
      this.scl = function(){     // Unimplemented - implement!
         let scale = {
            spd: 1,
            drw: 1
         };
         scale.spd = G.cam.BaseMapTileSize / this.tilesize;
         scale.drw = this.tilesize * G.cam.zoom;
         return scale;
      };
      // Add on-screen check for tiles
      this.sptlist = tiledata;
      this.tilesize = s;
      this.T = {
         missing: 0,   // Placeholder sprite
         S: tileset,    // Set
         C: colliders,  // Colliders
         D: [],         // Data
      };
      this.DTest = [];  // ^ update
   }
   move(){
      this.x -= this.mob.offx * this.scl().spd;
      this.y -= this.mob.offy * this.scl().spd;
      this.mob.offx = 0;
      this.mob.offy = 0;
   }
   GetTileColli(x,y){
      if(this.T.C[this.T.S[Math.floor((y - this.y) / this.tilesize)][Math.floor((x - this.x) / this.tilesize)]]){
         return 1;
      }else{
         return 0;
      }
      // return this.T.C[Math.floor((y - this.y) / this.tilesize)][Math.floor((x - this.x) / this.tilesize)];
   }
   async InitSprite(src){
      return new Promise(resolve => {
         let sprite = new Image();
         sprite.onload = () => {
            resolve(sprite);
         };
         sprite.src = './sprite/' + src + '.png';
      });
   }
   async TexturesGet(){
      for(let i = 0; i < this.sptlist.length; i++){
         // pen.drawImage(txtr, 50, 50);
         let txtr = await this.InitSprite(this.sptlist[i]);
         this.T.D.push(txtr);
      }
      this.T.missing = await this.InitSprite('./sprite/missing.png');
      return new Promise(resolve => {
         G.M.TexturesLoaded = 1;
         resolve('Map textures loaded');
      });
   }
   draw(){
      for(let i = 0; i < this.T.S.length; i++){
         for(let k = 0; k < this.T.S[i].length; k++){
            try{
               // if((G.P.x - this.x))
               pen.drawImage(this.T.D[this.T.S[i][k]],this.x+(k*this.tilesize),this.y+(i*this.tilesize),this.tilesize,this.tilesize);
               if(G.cfg.ShowMapCoordinates){
                  pen.strokeStyle = 'black';
                  pen.fillStyle = 'black';
                  pen.beginPath();
                  pen.rect(this.x+(k*this.tilesize),this.y+(i*this.tilesize),this.tilesize,this.tilesize);
                  pen.closePath();
                  pen.stroke();
                  pen.fillText('(' + k + ', ' + i + ')',this.x+(k*this.tilesize),this.y+(i*this.tilesize)+16);
               }
            }catch(err){
               if(!this.T.D[this.T.S[i][k]]){
                  pen.drawImage(this.T.missing,this.x+(k*this.tilesize),this.y+(i*this.tilesize),this.tilesize,this.tilesize);
                  if(this.TexturesLoaded){
                     this.T.D[this.T.S[i][k]] = this.T.missing;
                     this.T.C[this.T.S[i][k]] = 0;
                  }
               }
            }
         }
      }
   }
}

class Tile{
   constructor(x,y,s,id){
      this.x = x;
      this.y = y;
      this.s = s;
      this.id = id;
      this.sprite = new Image();
   }
   async initialize(){
      this.sprite.onload = () => {
         return new Promise(resolve => {
            resolve(this.sprite);
         });
      };
      this.sprite.src = G.M.sptlist[G.M.S[this.y][this.x]];
   }
}

let maparr = [
   [00,00,00],
   [00,01,00],
   [00,00,00]
];
let colarr = [0,1];
let shtdta = [];
let mapdat = ['border0','border0'];
var M = G.M = new Map(-G.S.offx/G.S.scale, -G.S.offy/G.S.scale, 32, maparr, colarr, mapdat);
// var M = G.M = new Map(0, 0, 32, maparr, colarr, mapdat);
// var M = G.M = new Map(G.S.center.x - 32, G.S.center.y, 32, maparr, colarr, mapdat);
(async function(){
   await M.TexturesGet();
})();