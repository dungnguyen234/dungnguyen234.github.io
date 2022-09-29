import { CSS3DObject } from './libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js';
import {loadGLTF, loadTexture, loadTextures, loadVideo} from './libs/loader.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {

    // initialize MindAR 
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../../assets/targets/sintel.mind',
    });
    const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;

    const video = await loadVideo("../../assets/videos/sintel/sintel.mp4");
    const texture = new THREE.VideoTexture(video);
    //=----------video part
    const geometry = new THREE.PlaneGeometry(1, 204/480);
    const material = new THREE.MeshBasicMaterial({map: texture});
    const plane = new THREE.Mesh(geometry, material);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    anchor.onTargetFound = () => {
      video.play();
    }
    anchor.onTargetLost = () => {
      video.pause();
    }
    video.addEventListener( 'play', () => {
      video.currentTime = 6;
      
    });

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const [
      QuestionTexture,
      ans1Texture,
      ans2Texture,
      ans3Texture,
      ans4Texture,
    ] = await loadTextures([
      '../../assets/targets/card.png',
      '../../assets/portfolio/icons/email.png',
      '../../assets/portfolio/icons/location.png',
      '../../assets/portfolio/icons/web.png',
      '../../assets/portfolio/icons/profile.png',
    ]);
    const PlaneGeometry = new THREE.PlaneGeometry(1, 0.552);
    const QuestionMaterial = new THREE.MeshBasicMaterial({map: QuestionTexture});
    const Question = new THREE.Mesh(PlaneGeometry, QuestionMaterial);




    //------------ decalre for question content


    const AnswerGeometry = new THREE.CircleGeometry(0.075, 32);
    const ans1Material = new THREE.MeshBasicMaterial({map: ans1Texture});
    const ans2Material = new THREE.MeshBasicMaterial({map: ans2Texture});
    const ans3Material = new THREE.MeshBasicMaterial({map: ans3Texture});
    const ans4Material = new THREE.MeshBasicMaterial({map: ans4Texture});

    const ans1Icon = new THREE.Mesh(AnswerGeometry, ans1Material);
    const ans2Icon = new THREE.Mesh(AnswerGeometry, ans2Material);
    const ans3Icon = new THREE.Mesh(AnswerGeometry, ans3Material);
    const ans4Icon = new THREE.Mesh(AnswerGeometry, ans4Material);

    ans1Icon.position.set(-0.42, -0.5, 0);
    ans2Icon.position.set(-0.14, -0.5, 0);
    ans3Icon.position.set(0.14, -0.5, 0);
    ans4Icon.position.set(0.42, -0.5, 0);
    
    anchor.group.add(Question);
    anchor.group.add(ans1Icon);
    anchor.group.add(ans2Icon);
    anchor.group.add(ans3Icon);
    anchor.group.add(ans4Icon);

    ans1Icon.userData.clickable = true;
    ans2Icon.userData.clickable = true;
    ans3Icon.userData.clickable = true;
    ans4Icon.userData.clickable = true;

    //--------------------hide icon at start--------------
    Question.visible = false;
    ans1Icon.visible = false;
    ans2Icon.visible = false;
    ans3Icon.visible = false;
    ans4Icon.visible = false;

    //---------detect when end video
    video.addEventListener('ended', (event) => {
      
      video.visible = false;
      Question.visible = true;
      ans1Icon.visible = true;
      ans2Icon.visible = true;
      ans3Icon.visible = true;
      ans4Icon.visible = true;
            
        
    });


    //----------- declare for answer
  
    
    const textElement = document.createElement("div");
    const textObj = new CSS3DObject(textElement);
    textObj.position.set(0, -700, 0);
    textObj.visible = false;
    textElement.style.background = "#FFFFFF";
    textElement.style.padding = "30px";
    textElement.style.fontSize = "60px";

    const cssAnchor = mindarThree.addCSSAnchor(0);
    cssAnchor.group.add(textObj);

    // handle buttons
   
    ans1Icon.userData.clickable = true;
    ans2Icon.userData.clickable = true;
    ans3Icon.userData.clickable = true;
    ans4Icon.userData.clickable = true;

   

    document.body.addEventListener('click', (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
	let o = intersects[0].object; 
	while (o.parent && !o.userData.clickable) {
	  o = o.parent;
	}
	if (o.userData.clickable) {
	   if (o === ans1Icon) {
	    textObj.visible = true;
	    textElement.innerHTML = "https://github.com/hiukim/mind-ar-js";
	  } else if (o === ans2Icon) {
	    textObj.visible = true;
	    textElement.innerHTML = "hiukim528 [at] gmail";
	  } else if (o === ans3Icon) {
	    textObj.visible = true;
	    textElement.innerHTML = "https://hiukim.com";
	  } else if (o === ans4Icon) {
	    textObj.visible = true;
	    textElement.innerHTML = "Vancouver, Canada";
	  }
	}
      }
    });

    const clock = new THREE.Clock();
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const iconScale = 1 + 0.2 * Math.sin(elapsed*5);
      [ans1Icon, ans2Icon, ans3Icon, ans4Icon].forEach((icon) => {
	icon.scale.set(iconScale, iconScale, iconScale);
      });

     

      renderer.render(scene, camera);
      cssRenderer.render(cssScene, camera);
    });
  }
  start();
});
