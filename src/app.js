import Scene from "./Scene";

var THREE = require("three");

let scene = new Scene("test");
scene.Clean();

function loadModels(path, ext, pos, rot) {
    let extension = undefined;
    pos = pos || THREE.Vector3(0, 0, 0);
    rot = rot ||THREE.Vector3(0, 0, 0);

    if (path === "" || path === undefined)
    {
        alert("app.js loadModels() parameters incorrect.");
        return(undefined);
    }
    if (ext === "" || ext === undefined)
        extension = path.split(".")[1];
    let loaders = {
      'obj': function (path, pos, rot)
      {
      },
      'dae': function (path, pos, rot)
      {

      },
      'fbx': function(path, pos, rot)
      {
      },
    };
    loaders[extension](path, pos, rot)
}
