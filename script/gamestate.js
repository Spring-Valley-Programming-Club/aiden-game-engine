var G = {
   S: {
      x: 480,
      y: 270,
      tx: 480,
      ty: 270,
      scale: 1,
      minx: 0,
      maxx: 480,
      miny: 0,
      maxy: 270,
      offx: 0,
      offy: 0,
      center: {
         x: 240,
         y: 135
      }
   },
   P: null,
   M: null,
   err: function(e){
      pen.setTransform(1, 0, 0, 1, 0, 0);
      pen.clearRect(0,0,G.S.x*G.S.scale,90);
      pen.fillStyle = 'black';
      pen.fillText('ERROR: ' + e, 0, 10);
      pen.fillText('MESSAGE: ' + e.message, 0, 20);
      pen.fillText('NAME: ' + e.name, 0, 30);
      pen.fillText('FILE NAME: ' + e.fileName, 0, 40);
      pen.fillText('LINE NUMBER: ' + e.lineNumber, 0, 50);
      pen.fillText('COLUMN NUMBER: ' + e.columnNumber, 0, 60);
      pen.fillText('STACK: ' + e.stack, 0, 70);
      pen.fillText('JSON: ' + JSON.stringify(e), 0, 80);
   },
   fps: {
      target: 60,
      actual: 0,
      d: 1,
      calc: {
         LastFrameEndTime: 0,
         TimeSinceLastFrame: 0
      }
   },
   cam: {      // Make this an object
      // rounding x & y when drawing map tiles gives odd wuwuwu effect
      x: 0,
      y: 0,
      zoom: 1,
      BaseMapTileSize: 32
   },
   cfg: {
      DefaultResolution: 0,
      CustomScreenScale: 0,
      ShowMapCoordinates: 0,
      AllowMouseInput: 0,
      KeyBindExperi: [],
      MosBindExperi: [],
      ActiveKeys: [],
      ForceFrameEndInputClear: 0,   // Likely to be removed
      FancyInput: 1,                // Likely to be removed
      AbsolutePlayerDirection: 1,
      ToggleKey: 'ShiftLeft',
      KeyBindings: {
         MoveLe: 'ArrowLeft',
         MoveRi: 'ArrowRight',
         MoveUp: 'ArrowUp',
         MoveDo: 'ArrowDown',
         ActOne: 'KeyC',
         ActTwo: 'KeyX',
         ActThr: 'KeyZ',
         ActFou: 'Space',
         ActFiv: 'ShiftLeft',
         TstFnc: 'ArrowRight'
      },
      MouseBindings: {
         MoveLe: false,
         MoveRi: false,
         MoveUp: false,
         MoveDo: false,
         ActOne: false,
         ActTwo: false,
         ActThr: false,
         TstFnc: 0
      },
   }
};
var scn = document.getElementById('screen');
var pen = scn.getContext('2d');
pen.imageSmoothingEnabled = false;

function RefreshConfig(){
   let lclcfg = localStorage.getItem('config');
   if(lclcfg){
      G.cfg = JSON.parse(lclcfg);
   }else{
      console.log('Couldn\'t find a config in local storage');
   }
}
function ResetConfig(){
   G.cfg = DefaultConfig;
}
function UpdateConfig(){
   localStorage.setItem('config', JSON.stringify(G.cfg));
}
const DefaultConfig = {
   a: 'a',
   b: 'b'
};