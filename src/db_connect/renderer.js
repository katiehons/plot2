const electron = window.require('electron');
// import {electron, ipcRenderer} from 'Electron';
const { ipcRenderer } = electron;

export default function send(sql, params) {
  console.log(sql + " " + params )
  return new Promise((resolve) => {
    //todo, problem: we create one promise, but resolve it twice. how?
    ipcRenderer.once('asynchronous-reply', (_, arg) => {
      console.log("Inside ipc once: sql: " + sql + " \n\tparams: " + params + " \n\targ: " + arg );
      resolve(arg);
    });
    ipcRenderer.send('asynchronous-message', sql, params);
    // send is happening twice??? why???
  });
}
