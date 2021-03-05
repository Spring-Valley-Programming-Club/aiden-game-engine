let maptestarr = [
   [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00],
   [00,01,01,01,00,00,01,01,00,00,01,00,00,01,01,00,00,01,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,00,00,01,01,00,00,01,00,00,01,01,00,00,01,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,00,00,01,01,00,00,01,00,00,01,01,00,00,01,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,00,00,01,01,00,00,01,00,00,01,01,00,00,01,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,04,05,07,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,02,05,02,02,02,07,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,03,02,02,02,02,07,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,02,02,02,02,02,02,08,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,03,02,02,02,02,08,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,02,02,02,02,02,02,08,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,03,02,02,02,02,08,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,03,02,06,06,06,10,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,09,10,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,01,00],
   [00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00]
];
let coltestarr = [0,1,1,1,1,1,1,1,1,1,1];
let maptestdat = [
   'border0','mud0','grass/middle','grass/edgel','grass/edgetl','grass/edget','grass/edgeb','grass/edgetr','grass/edger',
   'grass/edgelb','grass/edgerb'
];
var M = G.M = new Map(-G.S.offx/G.S.scale, -G.S.offy/G.S.scale, 32, maptestarr, coltestarr, maptestdat);
// var M = G.M = new Map(0, 0, 32, maparr, colarr, mapdat);
// var M = G.M = new Map(G.S.center.x - 32, G.S.center.y, 32, maparr, colarr, mapdat);
(async function(){
   await M.TexturesGet();
})();

var P = G.P = new Player(G.S.center.x,G.S.center.y,1.5,0);
P.DefaultControls();

var test = new Entity(0,0,0,{});
var test2 = new Entity(150,150,0,{});
var dumdum1 = new Entity(20,20,0,{});
var dumdum2 = new Entity(40,40,0,{});
var dumdum3 = new Entity(60,60,0,{});