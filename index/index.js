window.addEventListener('load', init);

function init() {

  // サイズを指定
  const width = window.innerWidth;
  const height = window.innerWidth;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas'),
    antialias: true
  });
  renderer.setSize(width, height);
  renderer.setClearColor(0xFFFFE5);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.localClippingEnabled = true;

  // シーンを作成
  const scene = new THREE.Scene();

  //　光源を作成
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  const directionalLight = new THREE.DirectionalLight(0xdfebff, 1.0);
  directionalLight.position.set(400, 200, 300);
  scene.add(ambientLight);
  scene.add(directionalLight);

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  

  // カメラの初期座標を設定
  camera.position.set(0, 0, 1000);

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render);
  controls.minDistance = 800;
  controls.maxDistance = 1500;
  controls.enablePan = false;



  //======================================
  //オブジェクトの作成
  //======================================

  var group1 = new THREE.Group();
  var group2 = new THREE.Group();
  var group3 = new THREE.Group();
  
  const clipPlanes = [ new THREE.Plane(new THREE.Vector3(1, 0, 0), 0) ];

  const Geome1 = new THREE.BoxGeometry(300, 300, 300);
  const Geome2 = new THREE.BoxGeometry(200, 500, 200);
  const Geome3 = new THREE.TorusGeometry(200, 80, 64, 80);

  const sphere1 = new THREE.MeshLambertMaterial( {
    color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5),
    side: THREE.DoubleSide,
    clippingPlanes: clipPlanes,
    clipIntersection: true
  });

  const sphere2 = new THREE.MeshLambertMaterial( {
    color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5),
    side: THREE.DoubleSide,
    clippingPlanes: clipPlanes,
    clipIntersection: true
  });

  const sphere3 = new THREE.MeshLambertMaterial( {
    color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5),
    side: THREE.DoubleSide,
    clippingPlanes: clipPlanes,
    clipIntersection: true
  });

  const mesh1 = new THREE.Mesh(Geome1, sphere1);
  const mesh2 = new THREE.Mesh(Geome2, sphere2);
  const mesh3 = new THREE.Mesh(Geome3, sphere3);
  

  const clipHelpers = new THREE.PlaneHelper(clipPlanes[0], 600, 0xff0000);
  scene.add(clipHelpers);
  scene.add( mesh1 );



  //======================================
  //オブジェクトの切り替え
  //======================================

  document.getElementById("seihou-btn").onclick = function() {
    scene.remove(mesh2);
    scene.remove(mesh3);
    scene.add(mesh1);
  };

  document.getElementById("tyouhou-btn").onclick = function() {
    scene.remove(mesh1);
    scene.remove(mesh3);
    scene.add(mesh2);
  };

  document.getElementById("maru-btn").onclick = function() {
    scene.remove(mesh1);
    scene.remove(mesh2);
    scene.add(mesh3);
  };



  //======================================
  //dat.GUI
  //======================================
 
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

    clipHelpers.visible = value;

    render();

  } );

  //======================================
  //リサイズ云々
  //======================================

  window.addEventListener('resize', onWindowResize, false);
  render();
  tick();

  function onWindowResize() {
    renderer.setSize(window.innerWidth, 540);
    render();
  }

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  function tick() {
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }


  
}