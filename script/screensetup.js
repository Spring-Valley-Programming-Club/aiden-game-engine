window.onerror = (e) => {
   G.err('Error occured somewhere');
}
let gblw = window.innerWidth;
let gblh = window.innerHeight;
let scnw = scn.width;
let scnh = scn.height;
function resizecanvas(){
   gblw = window.innerWidth;
   gblh = window.innerHeight;
   scnw = G.S.tx;
   scnh = G.S.ty;
   for(let i = 1; i * scnw < gblw && i * scnh < gblh; i *= 2){
      if(i * scnw <= gblw && i * scnh <= gblh){
         G.S.scale = i;
      }
   }
   G.S.offx = Math.round((gblw - (G.S.scale * G.S.tx)) / 2);
   G.S.offy = Math.round((gblh - (G.S.scale * G.S.ty)) / 2);
   G.S.x = scnw * G.S.scale;
   G.S.y = scnh * G.S.scale;
   G.S.minx = 0 - (G.S.offx / G.S.scale);
   G.S.miny = 0 - (G.S.offy / G.S.scale);
   G.S.maxx = scnw + (G.S.offx / G.S.scale);
   G.S.maxy = scnh + (G.S.offy / G.S.scale);
   G.S.center.x = G.S.x / (2 * G.S.scale);
   G.S.center.y = G.S.y / (2 * G.S.scale);
   scn.width = gblw;
   scn.height = gblh;
}
// function resizecanvas(){
//    gblw = window.innerWidth;
//    gblh = window.innerHeight;
//    scnw = G.S.tx;
//    scnh = G.S.ty;
//    for(let i = 1; i * scnw < gblw && i * scnh < gblh; i *= 2){
//       if(i * scnw <= gblw && i * scnh <= gblh){
//          // scn.style.width = (i * scnw) + 'px';
//          // scn.style.height = (i * scnh) + 'px';
//          scn.width = (i * scnw);
//          scn.height = (i * scnh);
//          G.S.x = scn.width;
//          G.S.y = scn.height;
//          G.S.scale = i;
//       }
//    }
// }
window.onresize = resizecanvas;
resizecanvas();