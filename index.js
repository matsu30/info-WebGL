window.addEventListener('load', init);

function init() {

  // サイズを指定
  const width = 860;
  const height = 540;

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
  const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
  const directionalLight = new THREE.DirectionalLight(0xdfebff, 1.0);
  directionalLight.position.set(400, 200, 300);
  scene.add(ambientLight);
  scene.add(directionalLight);

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  

  // カメラの初期座標を設定
  camera.position.set(0, 0, -3.7);

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.minDistance = -5;
  controls.maxDistance = 10;
  controls.enablePan = false;



  // //======================================
  // //オブジェクトの作成
  // //======================================

  const clipPlanes = [ new THREE.Plane(new THREE.Vector3(0, 0, 1)) ];

  var group1 = new THREE.Group();
  var group2 = new THREE.Group();
  var group3 = new THREE.Group();
  var group4 = new THREE.Group();

  const loader = new THREE.GLTFLoader();

  //肺
  loader.load('./model/lung/lung.gltf', function(data){
    const lung = data.scene;
    lung.children[0].children[2].material.side = THREE.FrontSide;
    lung.children[0].children[0].material.clippingPlanes = clipPlanes;
    lung.children[0].children[1].material.clippingPlanes = clipPlanes;
    lung.children[0].children[2].material.clippingPlanes = clipPlanes;
    lung.children[0].children[0].material.clipIntersection = true;
    lung.children[0].children[1].material.clipIntersection = true;
    lung.children[0].children[2].material.clipIntersection = true;
    group1.add(lung);
  }); 

  //胃
  loader.load('./model/stomach/stomach.gltf', function(data){
    const stomach = data.scene;
    stomach.children[0].children[1].material.side = THREE.FrontSide;
    stomach.children[0].children[0].material.clippingPlanes = clipPlanes;
    stomach.children[0].children[1].material.clippingPlanes = clipPlanes;
    stomach.children[0].children[0].material.clipIntersection = true;
    stomach.children[0].children[1].material.clipIntersection = true;
    group2.add(stomach);
  });

  //腸
  loader.load('./model/intestine/intestine.gltf', function(data){
    const intestine = data.scene;
    intestine.children[0].children[1].material.side = THREE.FrontSide;
    intestine.children[0].children[0].material.clippingPlanes = clipPlanes;
    intestine.children[0].children[1].material.clippingPlanes = clipPlanes;
    intestine.children[0].children[0].material.clipIntersection = true;
    intestine.children[0].children[1].material.clipIntersection = true;
    group3.add(intestine);
  });

  //肝臓
  loader.load('./model/liver/liver.gltf', function(data){
    const liver = data.scene;
    liver.children[0].children[1].material.side = THREE.FrontSide;
    liver.children[0].children[0].material.clippingPlanes = clipPlanes;
    liver.children[0].children[1].material.clippingPlanes = clipPlanes;
    liver.children[0].children[0].material.clipIntersection = true;
    liver.children[0].children[1].material.clipIntersection = true;
    group4.add(liver);
  });

 
  const clipHelpers = new THREE.PlaneHelper(clipPlanes[0], 5, 0xff0000);
  scene.add( clipHelpers );
  scene.add( group1 );



  //======================================
  //オブジェクトの切り替え
  //======================================

  function reset1(){
    clipPlanes[0].constant = 0;
    group1.parent.rotation.x = 0;
    group1.parent.rotation.y = 0;
  }

  function reset2(){
    clipPlanes[0].constant = 1;
    group2.parent.rotation.x = 0;
    group2.parent.rotation.y = 0;
  }

  function reset3(){
    clipPlanes[0].constant = 1;
    group3.parent.rotation.x = 0;
    group3.parent.rotation.y = 0;
  }

  function reset4(){
    clipPlanes[0].constant = 1;
    group4.parent.rotation.x = 0;
    group4.parent.rotation.y = 0;
  }

  document.getElementById("1-btn").onclick = function() {
    scene.remove(group2);
    scene.remove(group3);
    scene.remove(group4);
    scene.add(group1);
    reset1();
  };

  document.getElementById("2-btn").onclick = function() {
    scene.remove(group1);
    scene.remove(group3);
    scene.remove(group4);
    scene.add(group2);
    reset2();
  };

  document.getElementById("3-btn").onclick = function() {
    scene.remove(group1);
    scene.remove(group2);
    scene.remove(group4);
    scene.add(group3);
    reset3();
  };

  document.getElementById("4-btn").onclick = function() {
    scene.remove(group1);
    scene.remove(group2);
    scene.remove(group3);
    scene.add(group4);
    reset4();
  };


  
  //======================================
  //dat.GUI
  //======================================
 
  var gui = new dat.GUI();

  var params = {
    planeConstant: 0,
    planeRotationX: 0,
    planeRotationY: 0,
    showHelpers: false
  };


  gui.add( params, 'planeConstant', - 2, 2 ).step( 0.1 ).name( 'plane constant' ).onChange( function ( value ) {

    for ( var j = 0; j < clipPlanes.length; j ++ ) {

      clipPlanes[ j ].constant = value;

    }

    render();

  } );

  gui.add( params, 'planeRotationX', 0, 360 ).step( 5 ).name( 'plane rotationX' ).onChange( function ( value ) {

    if( scene.children[3].id == 12 ){
      group1.parent.rotation.x = value / 180 * Math.PI;
    } else  if( scene.children[3].id == 13 ){
      group2.parent.rotation.x = value / 180 * Math.PI;
    } else  if( scene.children[3].id == 14 ){
      group3.parent.rotation.x = value / 180 * Math.PI;
    } else {
      group4.parent.rotation.x = value / 180 * Math.PI;
    }
  
    render();
  
  } );

  gui.add( params, 'planeRotationY', 0, 360 ).step( 5 ).name( 'plane rotationY' ).onChange( function ( value ) {

    if( scene.children[3].id == 12 ){
      group1.parent.rotation.y = value / 180 * Math.PI;
    } else  if( scene.children[3].id == 13 ){
      group2.parent.rotation.y = value / 180 * Math.PI;
    } else  if( scene.children[3].id == 14 ){
      group3.parent.rotation.y = value / 180 * Math.PI;
    } else {
      group4.parent.rotation.y = value / 180 * Math.PI;
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

	// 初期化のために実行
	onResize();
	// リサイズイベント発生時に実行
	window.addEventListener('resize', onResize);
	function onResize() {
		// サイズを取得
		const width = window.innerWidth;
		const height = window.innerHeight;
		// レンダラーのサイズを調整する
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(width/1.2, height/1.2);
		// カメラのアスペクト比を正す
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	}

  function render() {
    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();

}