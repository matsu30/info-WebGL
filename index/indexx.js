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
  renderer.setSize(width, height);
  renderer.setClearColor(0xFFFFE5);

  // シーンを作成
  const scene = new THREE.Scene();
  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  // カメラの初期座標を設定
  camera.position.set(0, 0, 1000);
  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls( camera );


  var mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(300, 300, 300),
    new THREE.MeshNormalMaterial()
  );

  var mesh2 = new THREE.Mesh(
    new THREE.BoxGeometry(200, 500, 200),
    new THREE.MeshNormalMaterial()
  );

  var mesh3 = new THREE.Mesh(
    new THREE.TorusGeometry(200, 80, 64, 80),
    new THREE.MeshNormalMaterial()
  );
  
  scene.add( mesh1 );

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


  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}