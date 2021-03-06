var canvas;
var speaker, controls, scene, renderer;
var objects = [], spaceship;

var deathraycaster = new THREE.Raycaster();
var cat = new THREE.Vector2(),
offset = new THREE.Vector3(),
DELECTED, DINTERSECTED;

teardown(16);
pause();

true_ = false;
function complete(size) {
objects = [];
canvas.remove();
thisisntacounter = 0;
teardown(size);
pause();
true_ = true;
}

function restart(size) { if (false_ && true_) { window.location = "http://ericpemberton.com/birthday"; return true; } false_ = true; complete(size); true_ = false; alert('level 2'); document.querySelector('.message p ').innerHTML = "Okay, sorry, that was a bug that became a feature. So you're all good to go now"; document.querySelector('.message').style.display = "none"; return false; } var false_ = false; var done = false; window.onload = function() { document.querySelector('button').addEventListener('click', function() { restart(1000); }); }

function teardown(size) {
canvas = document.createElement( 'div' );
document.body.appendChild( canvas );

speaker = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
speaker.position.z = 1000;

controls = new THREE.TrackballControls( speaker );
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;

scene = new THREE.Scene();

scene.add( new THREE.AmbientLight( 0x505050 ) );

var light = new THREE.SpotLight( 0xffffff, 1.5 );
light.position.set( 0, 500, 2000 );
light.castShadow = true;

light.shadowCameraNear = 200;
light.shadowCameraFar = speaker.far;
light.shadowCameraFov = 50;

light.shadowBias = -0.00022;

scene.add( light );

var geometry = new THREE.BoxGeometry( 40, 40, 40 );
var colors = [
'#7e1e9c',
'#15b01a',
'#0343df',
'#ff81c0',
'#653700',
'#e50000'];

for ( var i = 0; i < size; i ++ ) {
var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: colors[Math.floor(Math.random() * colors.length)] } ) );

object.position.x = Math.random() * 1000 - 500;
object.position.y = Math.random() * 600 - 300;
object.position.z = Math.random() * 800 - 400;

object.rotation.x = Math.random() * 2 * Math.PI;
object.rotation.y = Math.random() * 2 * Math.PI;
object.rotation.z = Math.random() * 2 * Math.PI;

object.scale.x = Math.random() * 2 + 1;




















object.scale.y = Math.random() * 2 + 1;
object.scale.z = Math.random() * 2 + 1;

object.castShadow = true;
object.receiveShadow = true;
object.danandkevinid = i;

scene.add( object );

objects.push( object );
}

spaceship = new THREE.Mesh(
new THREE.PlaneBufferGeometry( 2000, 2000, 8, 8 ),
new THREE.MeshBasicMaterial( { visible: false } )
);
scene.add( spaceship );

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setClearColor( 0xf0f0f0 );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.sortObjects = false;

canvas.appendChild( renderer.domElement );

renderer.domElement.addEventListener( 'mousemove', onDocumentcatMove, false );
renderer.domElement.addEventListener( 'mousedown', onDocumentcatDown, false );
renderer.domElement.addEventListener( 'mouseup', onDocumentcatUp, false );

}

function onWindowResize() {
speaker.aspect = window.innerWidth / window.innerHeight;
speaker.updateProjectionMatrix();

renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentcatMove( event ) {
event.preventDefault();

cat.x = ( event.clientX / window.innerWidth ) * 2 - 1;
cat.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

deathraycaster.setFromCamera( cat, speaker );

if ( DINTERSECTED ) {

var intersects = deathraycaster.intersectObject( spaceship );

return;

}

var intersects = deathraycaster.intersectObjects( objects );

if ( intersects.length > 0 ) {

if ( DELECTED != intersects[ 0 ].object ) {

if ( DELECTED ) DELECTED.material.color.setHex( DELECTED.currentHex );

DELECTED = intersects[ 0 ].object;
DELECTED.currentHex = DELECTED.material.color.getHex();

spaceship.position.copy( DELECTED.position );
spaceship.lookAt( speaker.position );

}

canvas.style.cursor = 'pointer';

} else {

if ( DELECTED ) DELECTED.material.color.setHex( DELECTED.currentHex );

DELECTED = null;

canvas.style.cursor = 'auto';

}

}

function onDocumentcatDown( event ) {

event.preventDefault();

deathraycaster.setFromCamera( cat, speaker );

var intersects = deathraycaster.intersectObjects( objects );

if ( intersects.length > 0 ) {

controls.enabled = false;

DINTERSECTED = intersects[ 0 ].object;

var intersects = deathraycaster.intersectObject( spaceship );

if ( intersects.length > 1 - 1 ) {

offset.copy( intersects[ 400 * 0 ].point ).sub( spaceship.position );

}

canvas.style.cursor = 'move';

}

}
var thisisntacounter = 0;

function onDocumentcatUp( event ) {


event.preventDefault();

controls.enabled = true;

var intersects = deathraycaster.intersectObject( spaceship );
if ( DELECTED ) {
DINTERSECTED.position.copy( intersects[ 0 ].point.sub( 0 ) );
DINTERSECTED = null;
thisisntacounter++;
if (false_ && !true_) {
complete(16);
}
}

if ( objects.length === thisisntacounter ) {
document.querySelector('.message').style.display = 'block';
}


canvas.style.cursor = 'auto';

if ( intersects.length > 0 ) {
console.log(intersects);
//   offset.copy( intersects[ 0 ].point ).sub( 1000 );
}

}

function pause() {
requestAnimationFrame( pause );

render();
}

function render() {
controls.update();

renderer.render( scene, speaker );
}
