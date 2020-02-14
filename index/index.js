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
  camera.position.set(5, 0, 0);

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.minDistance = -5;
  controls.maxDistance = 5;
  controls.enablePan = false;



  // //======================================
  // //オブジェクトの作成
  // //======================================

  const clipPlanes = [ new THREE.Plane(new THREE.Vector3(0, 0, 1), 0) ];

  var group1 = new THREE.Group();
  //var group2 = new THREE.Group();
  // var group3 = new THREE.Group();
  // var group4 = new THREE.Group();

  //Duck
  // const loader = new THREE.GLTFLoader();
  // loader.load('./glTF/Duck.gltf', function(data){
  //   const Duck = data.scene;
  //   Duck.mesh = new THREE.Object3D(); 
  //   Duck.material = new THREE.MeshLambertMaterial({
  //     side: THREE.DoubleSide,
  //     clippingPlanes: [clipPlanes],
  //     clipIntersection: true
  //   });
  //   group1.add(Duck);
  //   console.log(Duck.material)
  // }); 


  const loader = new THREE.GLTFLoader();
  loader.load('./glTF/Duck.gltf', function(data){
    const Duck = data.scene;
    Duck.mesh = new THREE.Object3D(); 
    Duck.material = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      clippingPlanes: [clipPlanes],
      clipIntersection: true
    });
    group1.add(Duck);
    console.log(Duck.material)
  }); 


  //肺
  // const loader = new THREE.GLTFLoader();
  // loader.load('./model/lung/lung.gltf', function(data){
  //   const lung = data.scene;
  //   lung.material = new THREE.MeshLambertMaterial({
  //     side: THREE.DoubleSide,
  //     clippingPlanes: clipPlanes,
  //     clipIntersection: true
  //   });
  //   group1.add(lung);
  // }); 

  //胃
  // loader.load('./model/stomach/stomach.gltf', function(data){
  //   const stomach = data.scene;
  //   stomach.material = new THREE.MeshLambertMaterial({
  //     side: THREE.DoubleSide,
  //     clippingPlanes: clipPlanes,
  //     clipIntersection: true
  //   });
  //   group2.add(stomach);
  // });

  //腸
  // loader.load('./model/intestine/intestine.gltf', function(data){
  //   const intestine = data.scene;
  //   intestine.material = new THREE.MeshLambertMaterial({
  //     side: THREE.DoubleSide,
  //     clippingPlanes: clipPlanes,
  //     clipIntersection: true
  //   });
  //   group3.add(intestine);
  // });

  //肝臓
  // loader.load('./model/liver/liver.gltf', function(data){
  //   const liver = data.scene;
  //   liver.material = new THREE.MeshLambertMaterial({
  //     side: THREE.DoubleSide,
  //     clippingPlanes: clipPlanes,
  //     clipIntersection: true
  //   });
  //   group4.add(liver);
  // });

  //const Geome1 = new THREE.BoxGeometry(300, 300, 300);
  // const Geome2 = new THREE.BoxGeometry(2, 5, 2);
  // const Geome3 = new THREE.TorusGeometry(2, 3, 3, 3);

  // const sphere1 = new THREE.MeshLambertMaterial( {
  //   color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5),
  //   side: THREE.DoubleSide,
  //   clippingPlanes: clipPlanes,
  //   clipIntersection: true
  // });

  // const material2 = new THREE.MeshLambertMaterial( {
  //   color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5),
  //   side: THREE.DoubleSide,
  //   clippingPlanes: clipPlanes,
  //   clipIntersection: true
  // });

  // const material3 = new THREE.MeshLambertMaterial( {
  //   color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5),
  //   side: THREE.DoubleSide,
  //   clippingPlanes: clipPlanes,
  //   clipIntersection: true
  // });

  //group1.add( new THREE.Mesh(Geome2, sphere2) );
  // group2.add( new THREE.Mesh(Geome2, material2) );
  // group3.add( new THREE.Mesh(Geome3, material3) );
  
  const clipHelpers = new THREE.PlaneHelper(clipPlanes[0], 5, 0xff0000);
  scene.add( clipHelpers );
  scene.add( group1 );



  //======================================
  //オブジェクトの切り替え
  //======================================

  document.getElementById("1-btn").onclick = function() {
    scene.remove(group2);
    scene.remove(group3);
    scene.remove(group4);
    scene.add(group1);
  };

  // document.getElementById("2-btn").onclick = function() {
  //   scene.remove(group1);
  //   scene.remove(group3);
  //   scene.remove(group4);
  //   scene.add(group2);
  // };

  // document.getElementById("3-btn").onclick = function() {
  //   scene.remove(group1);
  //   scene.remove(group2);
  //   scene.remove(group4);
  //   scene.add(group3);
  // };

  // document.getElementById("4-btn").onclick = function() {
  //   scene.remove(group1);
  //   scene.remove(group2);
  //   scene.remove(group3);
  //   scene.add(group4);
  // };

  //======================================
  //dat.GUI
  //======================================
 
  var gui = new dat.GUI();

  var params = {
    planeConstant: 0,
    showHelpers: false
  };


  gui.add( params, 'planeConstant', - 2, 2 ).step( 0.1 ).name( 'plane constant' ).onChange( function ( value ) {

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