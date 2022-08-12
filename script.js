window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
  };
  
  function staticLoadPlaces() {
    return [
      {
        name: 'Magnemite',
        location: {
          lat: 24.488303,
          lng: 117.955103,
        }
      },
    ];
  }
  
  function renderPlaces(places) {
    let scene = document.querySelector('a-scene');
   
    places.forEach((place) => {
    //   let latitude = place.coords.latitude;
    //   let longitude = place.coords.longitude;
    navigator.geolocation.getCurrentPosition((position) => {
        doSomething(position.coords.latitude, position.coords.longitude);
      });
      let model = document.createElement('a-entity');
      model.setAttribute('gps-entity-place', `latitude: position.coords.latitude; longitude: osition.coords.longitude;`);
      model.setAttribute('gltf-model', './assets/magnemite/scene.gltf');
      model.setAttribute('rotation', '0 180 0');
      model.setAttribute('animation-mixer', '');
      model.setAttribute('scale', '0.2 0.2 0.2');
  
      model.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
      });
  
      scene.appendChild(model);
    });
  }
 
  