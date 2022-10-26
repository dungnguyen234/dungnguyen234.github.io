import { CSS3DObject } from './libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js';
import {loadGLTF, loadTexture, loadTextures, loadVideo} from './libs/loader.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {

    // initialize MindAR 
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/targets.mind',
      uiScanning: "#scanning",
      uiLoading: "no",
    });
    const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;

    const video = await loadVideo("./assets/QuestionAR/Video.mp4");
    const texture = new THREE.VideoTexture(video);
    //=----------video part
    const geometry = new THREE.PlaneGeometry(1, 1080/1920);
    const material = new THREE.MeshBasicMaterial({map: texture});
    const plane = new THREE.Mesh(geometry, material);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

   
    video.addEventListener( 'play', () => {

      // video.currentTime = 10;
      
    });

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const [
      
      playTexture,
    ] = await loadTextures([
      
      './assets/VideoAR/play.png',

    ]);
    const PlaneGeometry = new THREE.PlaneGeometry(1, 0.552);
    



    

    const iconGeometry = new THREE.CircleGeometry(0.075, 32);


     
    const playbtnMaterial = new THREE.MeshBasicMaterial({map: playTexture});


    
    const playbutton =  new THREE.Mesh(iconGeometry, playbtnMaterial);


    
    playbutton.position.set(0,0,0.1);

    
    anchor.group.add(playbutton);

   
    playbutton.userData.clickable = true;

   

    
    anchor.onTargetFound = () => {
     // video.play();
    }
    anchor.onTargetLost = () => {
      video.pause();
      playbutton.visible = true;
    }

    //----------- declare for answer
  
    
    

    



    document.body.addEventListener('click', (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      let correct = false;
      if (intersects.length > 0) {
	let o = intersects[0].object; 
	while (o.parent && !o.userData.clickable) {
	  o = o.parent;
	}
	if (o.userData.clickable) {
	 
     if(o === playbutton)
    {
      playbutton.visible = false;
      if (video.paused) {
	      video.play();
	    } else {
	      video.pause();
	    }
    }
	}
      }
    });

    const clock = new THREE.Clock();

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
    
     

      renderer.render(scene, camera);
      cssRenderer.render(cssScene, camera);
    });
  }
  
 start();
});
