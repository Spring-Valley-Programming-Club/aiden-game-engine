// OBSELETE
var require = {
   get G: (){
      return require.tru.G;
   },
   set G: (e){
      require.tru.G = e
   },
   get S: (){
      return require.tru.S;
   },
   set S: (e){
      require.tru.S = e
   },
   get P: (){
      return require.tru.P;
   },
   set P: (e){
      require.tru.P = e
   },
   get M: (){
      return require.tru.M;
   },
   set M: (e){
      require.tru.M = e
   },
   validate: function(){
      if(require.G && require.S && require.P && require.M){
         require.hajime();
      }
   },
   hajime: function(){
      var RenderLoop = window.requestAnimationFrame(DrawLoop);
   },
   tru: {
      G: 0,
      S: 0,
      P: 0,
      M: 0
   }
};