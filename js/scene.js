
  

let scene = new THREE.Scene();
let cam = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000)

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let geometry = new THREE.BoxGeometry(1,1,1);
let material = new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true});
let cube = new THREE.Mesh(geometry,material);
scene.add(cube);

cam.position.z = 3;
//game logic
let update = function(){
   cube.rotation.x+=0.01;
   cube.rotation.y=0.005;
};

let render = function(){

    renderer.render(scene,cam);
};



//Game loop updates renders repeat
let gameLoop = function(){
    requestAnimationFrame(gameLoop);

    update();
    render();

}

gameLoop();
