var EntitiesDeleted = 0;

async function CalcLoop(){
   try{
      G.M.move();
      G.P.move();
      EntitiesDeleted = 0;
      let AIList = ActiveEntities;
      for(let i = 0; i < AIList.length; i++){
         AIList[i - EntitiesDeleted].ai();
         AIList[i - EntitiesDeleted].move();
      }
      return new Promise(resolve => {
         resolve('Calculations done');
      });
   }
   catch(err){
      G.err(err);
   }
}

async function DrawLoop(){
   try{
      await CalcLoop();
      pen.imageSmoothingEnabled = false;
      pen.setTransform(G.S.scale, 0, 0, G.S.scale, G.S.offx, G.S.offy);
      // pen.scale(G.S.scale, G.S.scale);
      pen.clearRect(G.S.minx,G.S.miny,window.innerWidth,window.innerHeight);
      G.M.draw();
   // START THINGS TO DRAW HERE
      pen.fillStyle = 'black';
      if(G.cfg.FancyInput) InputHandleLoop();
      // pine.ProdInput();
      // pen.clearRect(0,0,G.S.x,G.S.y);
      let DrawList = ActiveEntities;
      for(let i = 0; i < DrawList.length; i++){
         DrawList[i].draw();
      }
      G.P.draw();
      // pen.fillStyle = 'rgba(25,25,25,0.25)';
      // pen.fillRect(-10,-10,150,150);
      // pen.fillStyle = 'white';
      pen.setTransform(1, 0, 0, 1, 0, 0);
      if(G.cfg.FancyInput && G.cfg.ForceFrameEndInputClear) CloseInputHandle();
   }
   catch(err){
      G.err(err);
   }
   document.getElementById('fps').innerHTML = (1000 / (performance.now() - G.fps.calc.LastFrameEndTime)).toFixed(0);
   G.fps.calc.LastFrameEndTime = performance.now();
   window.requestAnimationFrame(DrawLoop);
}

var RenderLoop = window.requestAnimationFrame(DrawLoop);