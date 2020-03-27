
  
// scene and camera setup
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000)

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//reize viewport with browser window
window.addEventListener('resize',function(){
    let height = window.innerHeight;
    let width = window.innerWidth;
    renderer.setSize(width,height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});


//controls
//OrbitControls,js file is in the three.js-master file in three.js-master/examples/js/controls/ 
//control the scene make sure to include OrbitControls.js in index.html
controls = new THREE.OrbitControls(camera, renderer.domElement)

//cube geometry
let geometry = new THREE.BoxGeometry(2,2,2);


//flat color material  or wirframe
//let material = new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true});
let cubeMaterials = [

    // if one of the sides is left out you get a open sided box
    new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('img/x.png'), side: THREE.DoubleSide}), // right
    new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('img/o.png'), side: THREE.DoubleSide}), // left
    new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('img/boxside.png'), side: THREE.DoubleSide}), // top
    new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('img/boxside.png'), side: THREE.DoubleSide}), // bottom
    new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('img/boxside.png'), side: THREE.DoubleSide}), // front
    new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('img/boxside.png'), side: THREE.DoubleSide}) // back
 
]

//place material to the geometry
let material = new THREE.MeshFaceMaterial(cubeMaterials);

//build Mesh geometry and material 
//cube
let cube = new THREE.Mesh(geometry,material);

//floor
let floor = new THREE.CubeGeometry(10,1,10);
let floorMaterial = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('img/steel-floor.jpg'), side: THREE.DoubleSide});
let floorMesh = new THREE.Mesh(floor,floorMaterial);
floorMesh.position.y = -5;
scene.add(floorMesh);

//ceiling
let roof = new THREE.CubeGeometry(10,1,10);
let roofMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('img/plaster.jpg'), side: THREE.DoubleSide});
let roofMesh = new THREE.Mesh(roof,roofMaterial);
roofMesh.position.y = 5;
scene.add(roofMesh);

//left wall
let lWall = new THREE.CubeGeometry(1,10,10);
let lWallMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('img/brick-wall-white.jpg'), side: THREE.DoubleSide});
let lWallMesh = new THREE.Mesh(lWall,lWallMaterial);
lWallMesh.position.x = -5;
scene.add(lWallMesh);

//right wall
let rWall = new THREE.CubeGeometry(1,10,10);
let rWallMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('img/brick-wall-white.jpg'), side: THREE.DoubleSide});
let rWallMesh = new THREE.Mesh(rWall,rWallMaterial);
rWallMesh.position.x = 5;
scene.add(rWallMesh);


//add mesh to scene
scene.add(cube);

//camera position
camera.position.z = 3;

//lighting ambient
let ambientLight = new THREE.AmbientLight(0xffffff,0.4);
scene.add(ambientLight);

//light point lights
// color, intensity, light distance effected
let l1 = new THREE.PointLight(0xff0040, 8, 50);
scene.add(l1);

let l2 = new THREE.PointLight(0x0040ff, 7, 50);
scene.add(l2);

let l3 = new THREE.PointLight(0x80ff80, 9, 50);
scene.add(l3);

//game logic
let update = function(){
   cube.rotation.x+=0.01;
   cube.rotation.y+=0.005;

   //animation based of the date * 0.0005
   let time = Date.now() * 0.0005;

   // animated point light positions
   l1.position.x = Math.sin(time*0.7)*30;
   l1.position.y = Math.cos(time*0.5)*40;
   l1.position.z = Math.cos(time*0.3)*30;

   l2.position.x = Math.cos(time*0.3)*30;
   l2.position.y = Math.sin(time*0.5)*30;
   l2.position.z = Math.sin(time*0.7)*30;

   l3.position.x = Math.sin(time*0.5)*30;
   l3.position.y = Math.cos(time*0.7)*30;
   l3.position.z = Math.sin(time*0.5)*30;
};

//renderer function
let render = function(){

    renderer.render(scene,camera);
};



//Game loop updates renders repeat
let gameLoop = function(){

    requestAnimationFrame(gameLoop);

    update();
    render();

}

gameLoop();
