/**
 * Created by JanJan on 10/06/2017.
 */

var THREE = require("three-js");

function loadModels(path, ext) {
    let extension = undefined;

    if (path === "" || path === undefined)
    {
        alert("app.js loadModels() parameters incorrect.");
        return(undefined);
    }
    if (ext === "" || ext === undefined)
        extension = path.split(".")[1];
    let loaders = {
      'obj': function (path)
      {
      },
      'dae': function (path)
      {

      },
      'fbx': function(path)
      {
      },
    };
    loaders[extension](path)
}
