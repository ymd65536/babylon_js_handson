var createScene = function () {
  const scene = new BABYLON.Scene(engine);
  // ↓ここでモデルのロード
  //BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "box.babylon");

  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, true);
  // const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(5, 1, 0));

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

  // ボックス
  const box = BABYLON.MeshBuilder.CreateBox("box", {});
  box.position.y = 0.5;

  const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});

  const sound = new BABYLON.Sound("name", "url to sound file", scene, null, { loop: true, autoplay: true });
  sound.play();

  return scene;
};