window.addEventListener('load', init);

function init() {
  // サイズを指定
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas'),
    antialias: true
  });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(width, height);
  renderer.localClippingEnabled = true;
  renderer.setClearColor(0xFFFFE5);

  // シーンを作成
  const scene = new THREE.Scene();
  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  // カメラの初期座標を設定
  camera.position.set(0, 0, 1000);
  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls( camera, renderer.domElement);
  controls.addEventListener( 'change', render ); 
  controls.minDistance = 1;
  controls.maxDistance = 10;
  controls.enablePan = false;

  var group1 = new THREE.Group();
  var group2 = new THREE.Group();
  var group3 = new THREE.Group();

  var clipPlanes = [ new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 0 ) ]

  var material = new THREE.MeshNormalMaterial( {
    clippingPlane: clipPlanes
  } );
  
  scene.add( group1 );

  document.getElementById("seihou-btn").onclick = function() {
    scene.remove(group2);
    scene.remove(group3);
    scene.add(group1);
  };

  document.getElementById("tyouhou-btn").onclick = function() {
    scene.remove(group1);
    scene.remove(group3);
    scene.add(group2);
  };

  document.getElementById("maru-btn").onclick = function() {
    scene.remove(group1);
    scene.remove(group2);
    scene.add(group3);
  };


  for ( var i = 1; i <= 30; i += 2 ) {

    group1.add( new THREE.Mesh(
      new THREE.BoxGeometry(30, 30, 30),
      material )
    );

  }

  for ( var i = 1; i <= 30; i += 2 ) {

    group2.add( new THREE.Mesh(
      new THREE.BoxGeometry(20, 50, 20),
      material )
    );

  }

  for ( var i = 1; i <= 30; i += 2 ) {

    group3.add( new THREE.Mesh(
      new THREE.TorusGeometry(20, 8, 6, 80),
      material )
    );

  }


  var helpers = new THREE.Group();
  helpers.add( new THREE.PlaneHelper( clipPlanes[ 0 ], 2, 0xff0000 ) );
  scene.add( helpers );
  


  var gui = new dat.GUI();

  var params = {
    planeConstant: 0,
    showHelpers: false
  };

  gui.add( params, 'planeConstant', - 1, 1 ).step( 0.01 ).name( 'plane constant' ).onChange( function ( value ) {

    for ( var j = 0; j < clipPlanes.length; j ++ ) {

      clipPlanes[ j ].constant = value;

    }

    render();

  } );

  gui.add( params, 'showHelpers' ).name( 'show helpers' ).onChange( function ( value ) {

    helpers.visible = value;

    render();

  } );


  function render() {

    renderer.render( scene, camera );

  }

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}