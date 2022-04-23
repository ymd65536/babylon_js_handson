// createScene に好きなモデルを書く
const createScene = function (canvas, engine) {

  // エンジンをかける
  const scene = new BABYLON.Scene(engine);

  // カメラを設置する
  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, true);

  // ライトを設置
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

  // ここにモデルを定義する - box1 box2 box3 の Mesh
  const faceUV = [];
  faceUV[0] = new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0); //rear face
  faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0); //front face
  faceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //right side
  faceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //left side

  const box = BABYLON.MeshBuilder.CreateBox("box", {width: 2, faceUV: faceUV, wrap: true});

  // 外壁をデザイン
  const boxMat = new BABYLON.StandardMaterial("boxMat");
  boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/semihouse.png")
  box.material = boxMat;
  box.position.y = 0.5;

  // 家を建築する(box に屋根をつける)
  const roof = BABYLON.MeshBuilder.CreateCylinder(
    "roof",
    {diameter: 1.3, height: 1.2, tessellation: 3}
  );

  // 屋根に色をつける
  const roofMat = new BABYLON.StandardMaterial("roofMat");
  roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");
  roof.material = roofMat;
  roof.scaling.x = 0.75;
  roof.scaling.y = 2;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 1.22;

  // box を置くための地面を作る
  const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 });

  // 草
  const groundMat = new BABYLON.StandardMaterial("groundMat");
  groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0)
  ground.material = groundMat;

  return scene;
};

function main() {

  // canvas 要素を取得
  const canvas = document.getElementById('renderCanvas');

  // BABYLON 3D エンジンを作成
  const engine = new BABYLON.Engine(canvas);

  // createScene を呼ぶ
  const scene = createScene(canvas, engine);

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