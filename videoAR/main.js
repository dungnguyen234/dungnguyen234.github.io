import {loadGLTF, loadVideo } from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../../assets/targets/sintel.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    const video = await loadVideo("../../assets/videos/sintel/sintel.mp4");
    const texture = new THREE.VideoTexture(video);

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
    //------------------ decalre question item------------------------
    const [
      cardTexture,
      emailTexture,
      locationTexture,
      webTexture,
      profileTexture,
    ] = await loadTextures([
      '../../assets/targets/card.png',
      '../../assets/portfolio/icons/email.png',
      '../../assets/portfolio/icons/location.png',
      '../../assets/portfolio/icons/web.png',
      '../../assets/portfolio/icons/profile.png',
    ])
    const planeGeometry = new THREE.PlaneGeometry(1, 0.552);
    const cardMaterial = new THREE.MeshBasicMaterial({map: cardTexture});
    const card = new THREE.Mesh(planeGeometry, cardMaterial);

    const iconGeometry = new THREE.CircleGeometry(0.075, 32);
    const emailMaterial = new THREE.MeshBasicMaterial({map: emailTexture});
    const webMaterial = new THREE.MeshBasicMaterial({map: webTexture});
    const profileMaterial = new THREE.MeshBasicMaterial({map: profileTexture});
    const locationMaterial = new THREE.MeshBasicMaterial({map: locationTexture});

    const emailIcon = new THREE.Mesh(iconGeometry, emailMaterial);
    const webIcon = new THREE.Mesh(iconGeometry, webMaterial);
    const profileIcon = new THREE.Mesh(iconGeometry, profileMaterial);
    const locationIcon = new THREE.Mesh(iconGeometry, locationMaterial);

    profileIcon.position.set(-0.42, -0.5, 0);
    webIcon.position.set(-0.14, -0.5, 0);
    emailIcon.position.set(0.14, -0.5, 0);
    locationIcon.position.set(0.42, -0.5, 0);
    
    anchor.group.add(card);
    anchor.group.add(emailIcon);
    anchor.group.add(webIcon);
    anchor.group.add(profileIcon);
    anchor.group.add(locationIcon);
    card.visible = false;
    emailIcon.visible = false;
    webIcon.visible = false;
    profileIcon.visible = false;
    locationIcon.visible = false;
    video.addEventListener('ended', (event) => {
      
      
      card.visible = true;
      emailIcon.visible = true;
      webIcon.visible = true;
      profileIcon.visible = true;
      locationIcon.visible = true;
            
        
    });
    





    
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
