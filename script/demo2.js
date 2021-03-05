var testsprite = new Image();
testsprite.src = './sprite/qrollP2.png';
function spritetestloop(){
   let testx = Math.round(100);
   let testy = Math.round(100);
   let testmx = Math.round(testsprite.width);
   let testmy = Math.round(testsprite.height);
   // alert(testx);
   // alert(testmx);
   // alert(testy);
   // alert(testmy);
   pen.imageSmoothingEnabled = false;
   pen.drawImage(testsprite, testx, testy, testmx, testmy);
   window.requestAnimationFrame(spritetestloop);
}
testsprite.onload = window.requestAnimationFrame(spritetestloop);