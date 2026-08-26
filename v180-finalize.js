'use strict';
(function(){
  const APP='1.8.0', CONTENT='1.8.0';
  S.version=APP;
  if(S.meta172){
    S.meta172.appVersion=APP;
    S.meta172.contentVersion=CONTENT;
    S.meta172.volumeProfile='8h-50d-core-v1';
  }
  if(window.DELF50_FULL_AUDIT){
    window.DELF50_FULL_AUDIT.version=APP;
    window.DELF50_FULL_AUDIT.contentVersion=CONTENT;
  }
  if(window.DELF50_NOREPEAT){
    window.DELF50_NOREPEAT.version=APP;
    window.DELF50_NOREPEAT.contentVersion=CONTENT;
  }
  try{if(typeof KEY!=='undefined')localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}
  render();
})();