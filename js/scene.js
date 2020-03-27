
  
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
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/x.png'), side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/o.png'), side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/boxside.png'), side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/boxside.png'), side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/boxside.png'), side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/boxside.png'), side: THREE.DoubleSide})
 
]

//place material to the geometry
let material = new THREE.MeshFaceMaterial(cubeMaterials);

//build Mesh geometry and material 
let cube = new THREE.Mesh(geometry,material);

//add mesh to scene
scene.add(cube);

//camera position
camera.position.z = 3;

//game logic
let update = function(){
   cube.rotation.x+=0.01;
   cube.rotation.y=0.005;
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
