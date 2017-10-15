/*eslint-disable*/
'use strict';

let THREE = require('three');

function loadModels(path, texture, ext, pos, rot) {
    let extension = undefined;
    texture = texture || undefined;
    pos = pos || THREE.Vector3(0, 0, 0);
    rot = rot || THREE.Vector3(0, 0, 0);

    if (path === '' || path === undefined)
    {
        alert('app.js loadModels() parameters incorrect.');
        return(undefined);
    }
    if (ext === '' || ext === undefined)
        extension = path.split('.')[1];
    let loaders = {
        'obj': function (path, texture, pos, rot)
        {
            let   loader = new THREE.OBJLoader();

            loader.load(
                path,
                function(object)
                {
                    if (texture !== undefined)
                    {
                        let textureLoader = THREE.TextureLoader;
                        textureLoader.load(textures, function(textures)
                        {
                            let mat = new THREE.MeshBasicMaterial({map: textures});
                        });
                    }
                    object.position = pos;
                    object.rotation = rot;
                    scene.add(object);
                }
            );
        },
        'dae': function (path, texture, pos, rot)
        {
            let   loader = new THREE.ColladaLoader();

            loader.load(
                path,
                function(object)
                {
                    if (texture !== undefined)
                    {
                        let textureLoader = THREE.TextureLoader;
                        textureLoader.load(textures, function(textures)
                        {
                            let mat = new THREE.MeshBasicMaterial({map: textures});
                        });
                    }
                    object.position = pos;
                    object.rotation = rot;
                    scene.add(object);
                }
            );
        },
        'fbx': function(path, texture, pos, rot)
        {
            let   loader = new THREE.FBXLoader();

            loader.load(
                path,
                function(object)
                {
                    if (texture !== undefined)
                    {
                        let textureLoader = THREE.TextureLoader;
                        textureLoader.load(textures, function(textures)
                        {
                            let mat = new THREE.MeshBasicMaterial({map: textures});
                        });
                    }
                    object.position = pos;
                    object.rotation = rot;
                    scene.add(object);
                }
            );
        },
        'json': function(path, texture, pos, rot)
        {
            let   loader = new THREE.FBXLoader();

            loader.load(
                path,
                function(object)
                {
                    object.position = pos;
                    object.rotation = rot;
                    scene.add(object);
                }
            );
        },
        'js': function(path, texture, pos, rot)
        {
            let   loader = new THREE.FBXLoader();

            loader.load(
                path,
                function(object)
                {
                    object.position = pos;
                    object.rotation = rot;
                    scene.add(object);
                }
            );
        }
    };
    loaders[extension](path, texture, pos, rot);
}
