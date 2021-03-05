var loaddest = document.getElementById('loadlz');
var loadlist = {};
var cfgdest = document.getElementById('cfglz');
var cfglist = {};

async function load(scriptname){
   console.log('Loading ' + scriptname);
   let loadingscript = document.createElement('script');
   loadingscript.src = './' + scriptname;
   loaddest.appendChild(loadingscript);
   loadingscript.onload = (e) => {
      return new Promise(resolve => {
         loadlist[scriptname] = loadingscript;
         resolve(loadingscript);
      });
   };
}

async function unload(scriptname){
   console.log('Unloading ' + scriptname);
   let unloadingscript = scriptlist[scriptname];
   scriptdest.removeChild(unloadingscript);
   return new Promise(resolve => {
       resolve(scriptlist);
   });
}