// createScene に好きなモデルを書く
const createScene = function (canvas,engine) {

  // エンジンをかける
  const scene = new BABYLON.Scene(engine);

  // カメラを設置する
  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, true);

  // ライトを設置
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

  // ここにモデルを定義する - box1 box2 box3 の Mesh
  const box1 = BABYLON.MeshBuilder.CreateBox("box1", {width: 2, height: 1.5, depth: 3});
  box1.position.y = 0.75;

  const box2 = BABYLON.MeshBuilder.CreateBox("box2", {});
  box2.scaling.x = 2;
  box2.scaling.y = 1.5;
  box2.scaling.z = 3;
  box2.position = new BABYLON.Vector3(-3, 0.75, 0);

  const box3 = BABYLON.MeshBuilder.CreateBox("box3", {});
  box3.scaling = new BABYLON.Vector3(2, 1.5, 3);
  box3.position.x  = 3;
  box3.position.y  = 0.75;
  box3.position.z  = 0;

  // box1を回転させる
  box1.rotation.y = Math.PI / 4;
  box1.rotation.y = BABYLON.Tools.ToRadians(45);  

  // box を置くための地面を作る
  const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 });

  return scene;
};

function main() {

  // canvas 要素を取得
  const canvas = document.getElementById('renderCanvas');

  // BABYLON 3D エンジンを作成
  const engine = new BABYLON.Engine(canvas);

  // createScene を呼ぶ
  const scene = createScene(canvas,engine);

  // シーンを継続的にレンダリングするためにレンダーループに登録する
  engine.runRenderLoop(function () {
    scene.render();
  });

  // ブラウザーのリサイズイベントを監視する
  window.addEventListener("resize", function () {
    engine.resize();
  });
};

window.addEventListener('DOMContentLoaded', main);