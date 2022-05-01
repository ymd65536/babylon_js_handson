function main() {
  const canvas = document.getElementById('renderCanvas');
  const engine = new BABYLON.Engine(canvas);
  function createScene() {
    const scene = new BABYLON.Scene(engine);
    /**** Set camera and light *****/
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    const ground = buildGround();
    const box = buildBox();
    const roof = buildRoof();

    // const house = BABYLON.Mesh.MergeMeshes([box, roof], true, false, null, false, true);
    const house = BABYLON.Mesh.MergeMeshes([box, roof], false, false, null, false, true);

    return scene;
  }


  /******Build Functions***********/
  const buildGround = () => {
    //color
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);

    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 });
    ground.material = groundMat;
  }


  const buildBox = () => {
    //texture
    const boxMat = new BABYLON.StandardMaterial("roofMat");
    boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png")


    //options parameter to set different images on each side
    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
    // top 4 and bottom 5 not seen so not set


    /**** World Objects *****/
    const box = BABYLON.MeshBuilder.CreateBox("box", { faceUV: faceUV, wrap: true });
    box.material = boxMat;
    box.position.y = 0.5;

    return box;
  }

  const buildRoof = () => {
    //texture
    const roofMat = new BABYLON.StandardMaterial("roofMat");
    roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");

    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", { diameter: 1.3, height: 1.2, tessellation: 3 });
    roof.material = roofMat;
    roof.scaling.x = 0.75;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;

    return roof;
  }

  const scene = createScene();

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener('resize', () => {
    engine.resize();
  });
}
window.addEventListener('DOMContentLoaded', main);