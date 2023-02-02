const THREE = window.MINDAR.IMAGE.THREE;
import {loadGLTF, loadTexture, loadTextures, loadAudio,loadVideo} from "./libs/loader.js";
document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.querySelector("#container"),
      imageTargetSrc: './assets/targets/modelSound.mind',
      uiScanning: "#scanning",
      uiLoading: "no",
    });
    const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;


     const anchor = mindarThree.addAnchor(0);
   
    const raccoon = await loadGLTF('./assets/models/Ribs.glb');
    raccoon.scene.scale.set(0.1, 0.1, 0.1);
    raccoon.scene.position.set(0, -0.4, 0);

    anchor.group.add(raccoon.scene);

     const light = new THREE.HemisphereLight(0xffeeb1, 0x080820, 3);
    

     scene.add(light);


    
    const tonelight = new THREE.SpotLight(0xffa95c,2);
    tonelight.castShadow = true;
      scene.add(tonelight);
      
      tonelight.shadow.bias = -0.0001;
      tonelight.shadow.mapSize.width = 1024*4;
      tonelight.shadow.mapSize.height = 1024*4;
    const dirLight2 = new THREE.DirectionalLight(0xffcc99, 0.3);
    dirLight2.position.set(0, 0, 100);
   scene.add(dirLight2);

   const audioClip = await loadAudio('./assets/sounds/musicband-background.mp3');

   const listener = new THREE.AudioListener();
   camera.add(listener);

   const audio = new THREE.PositionalAudio(listener);
   anchor.group.add(audio);

   audio.setBuffer(audioClip);
   audio.setRefDistance(100);
   audio.setLoop(true);

   anchor.onTargetFound = () => {
     audio.play();
   }
   anchor.onTargetLost = () => {
     audio.pause();
   }


    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
