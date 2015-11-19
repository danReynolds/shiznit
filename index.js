var container;
var camera, controls, scene, renderer;
var objects = [], plane;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(),
    offset = new THREE.Vector3(),
    INTERSECTED, SELECTED;

init();
animate();

var flagVariable = false;
window.onload = function() {
    document.querySelector('button').addEventListener('click', function() {
        if (flagVariable) {
            window.location = "http://ericpemberton.com/birthday";
            return true;
        }
        objects = [];
        container.remove();
        counter = 0;
        alert('level 2');
        init();
        animate();
        flagVariable = true;
        document.querySelector('.message p ').innerHTML = "Okay, sorry, that was a bug that became a feature. So you're all good to go now";
        document.querySelector('.message').style.display = "none";
        return false;
    });
}

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;

  controls = new THREE.TrackballControls( camera );
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
  light.shadowCameraFar = camera.far;
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

  for ( var i = 0; i < 16; i ++ ) {
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

  plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry( 2000, 2000, 8, 8 ),
      new THREE.MeshBasicMaterial( { visible: false } )
  );
  scene.add( plane );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor( 0xf0f0f0 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.sortObjects = false;

  container.appendChild( renderer.domElement );

  renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
  renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
  renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
  event.preventDefault();

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );

  if ( SELECTED ) {

    var intersects = raycaster.intersectObject( plane );

    return;

  }

  var intersects = raycaster.intersectObjects( objects );

  if ( intersects.length > 0 ) {

    if ( INTERSECTED != intersects[ 0 ].object ) {

      if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

      INTERSECTED = intersects[ 0 ].object;
      INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

      plane.position.copy( INTERSECTED.position );
      plane.lookAt( camera.position );

    }

    container.style.cursor = 'pointer';

  } else {

    if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

    INTERSECTED = null;

    container.style.cursor = 'auto';

  }

}

function onDocumentMouseDown( event ) {

  event.preventDefault();

  raycaster.setFromCamera( mouse, camera );

  var intersects = raycaster.intersectObjects( objects );

  if ( intersects.length > 0 ) {

    controls.enabled = false;

    SELECTED = intersects[ 0 ].object;

    var intersects = raycaster.intersectObject( plane );

    if ( intersects.length > 0 ) {

      offset.copy( intersects[ 0 ].point ).sub( plane.position );

    }

    container.style.cursor = 'move';

  }

}
  var counter = 0;

function onDocumentMouseUp( event ) {


  event.preventDefault();

  controls.enabled = true;

  var intersects = raycaster.intersectObject( plane );
  if ( INTERSECTED ) {
      SELECTED.position.copy( intersects[ 0 ].point.sub( 0 ) );
    SELECTED = null;
    counter++;

  }

  if ( objects.length === counter ) {
      document.querySelector('.message').style.display = 'block';
  }


  container.style.cursor = 'auto';

  if ( intersects.length > 0 ) {
      console.log(intersects);
    //   offset.copy( intersects[ 0 ].point ).sub( 1000 );
  }

}

function animate() {
  requestAnimationFrame( animate );

  render();
}

function render() {
  controls.update();

  renderer.render( scene, camera );
}
