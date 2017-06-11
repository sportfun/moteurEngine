import Scene from "./Scene";
var THREE = require("three");

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

var render = function () {
    requestAnimationFrame(render);

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    renderer.render(scene, camera);
};

render();

let scene2 = new Scene("test");
scene2.Clean();

function component () {
  var element = document.createElement('div');
  element.innerHTML = 'Hello world';
  return (element);
}

document.body.appendChild(component());

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
