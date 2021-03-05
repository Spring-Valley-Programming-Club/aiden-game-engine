var ActiveKeys = [];
var RemoveKeys = [];
var ActiveMouse = [];
var RemoveMouse = [];
var KeyBinds = [];

// BIG BUG: for some reason, not all input is registered if many keys are pressed
// EX: only two arrow keys can be pressed at once
// Fix: don't use arrow keys, keyboard is normally fine for some reason \_(ツ)_/

// POTENTIAL CONTROLS
// Move        || W A S D
// Skill       || O P L ; / SHIFT
// Attack      || K
// Dodge       || SPACEBAR
// Block       || SHIFT+SPACEBAR
// Lock on     || ALTRIGHT
// Next/Prev   || < >
// Weapon      || ← → ↑ ↓
// Inventory   || TAB
// Pause       || ESC

// BINARY TABLE
// to make seeing input easier with cons menu up?
// <WS^KOP↑←
// >AD_/L;↓→
// ^=shift, _=space, /=Ralt
   
class InputBind{
   // REMEMBER - add a thing that removes old keybinds on new one set
   constructor(keyCode, button, excluded, cmd){
      this.key = keyCode;
      this.button = button;
      this.exclude = excluded;
      // this.p = par;
      this.cmd = cmd;
   }
   ProdInput(){
      let CheckKeys = this.key ? this.key.every((l) => ActiveKeys.includes(l)) : 1;
      let CheckMouse = this.button ? this.button.every((l) => ActiveMouse.includes(l)) : 1;
      let CheckExclude = this.exclude ? this.exclude.every((l) => ActiveKeys.includes(l) != 1) : 1;
      // Fix this - add an action queue & remove the CheckExclude
      // to make actions not be as anal about input. Include
      // something that allows things to bypass queue so that
      // movement and whatnot aren't only done in an order and can
      // be done whenever. One idea: add a 'MostRecent' array/var
      // that tracks which key is the most recent so that the
      // priority of a key/action is not bound to when it is checked
      // for in a loop. May also need G.cfg.ForceFrameEndInputClear
      // and related functions to be removed/reworked.
      if(CheckKeys && CheckMouse && CheckExclude){
         G.P[this.cmd]();
      }
   }
}

window.onmousedown = (e) => {
   ActiveMouse[e.button] = 1;
}
window.onmouseup = (e) => {
   if(G.cfg.ForceFrameEndInputClear){
      RemoveMouse.push(e.button);
   }else{
      ActiveMouse[e.button] = 0;
   }
}
window.onkeydown = (e) => {
   // pen.fillText(e.code, 150, 50);
   if(!ActiveKeys.includes(e.code)){
      ActiveKeys.push(e.code);
   }
   return false;
}
window.onkeyup = (e) => {
   if(ActiveKeys.includes(e.code)){
      ActiveKeys.splice(ActiveKeys.indexOf(e.code), 1);
   }
}
// window.onkeydown = (e) => {
   // ActiveKeys[e.code] = 1;
// }
// window.onkeyup = (e) => {
   // if(G.cfg.ForceFrameEndInputClear){
      // RemoveKeys.push(e.code);
   // }else{
      // ActiveKeys[e.code] = 0;
   // }
// }

function InputHandleLoop(){
   KeyBinds.forEach((l) => l.ProdInput());
}
function CloseInputHandle(){
   RemoveMouse.every((l) => ActiveMouse[l] = 0);
   RemoveMouse = [];
   RemoveKeys.every((l) => ActiveKeys[l] = 0);
   RemoveKeys = [];
}

/*
   DIFFERENT INPUT HANDLING METHODS
   
   DECIDED: Use class for bind attached to JSON properties
      Allows for easy programming of rebinding
      Allows for multiple keys per action and multiple actions per key
      Allows for automatic detection of mouse/
      Probable slight impact on performance, but negligable
      controls = {
         ActOne: new InputBind(...),
         ActTwo: new InputBind(...)
      }
   
   1) Use array, have functions on index of keyCode
      Easier to make, probably less impact on performance
      Only allows one function per button, less readable
      if(input[e.keyCode]) input[e.keyCode]();
      
   2) Use object with commands assigned to e.code
      Easier to read, can have multiple commands per button
      Harder to program, may impact performance
      if(ActiveKeys.includes(controls.command)) controls.command();
         ^ in a for() loop maybe?
      
   3) Use object with a property for each e.code
      
      {
         ShiftLeft: function(),
         KeyA: function(),
      }
*/