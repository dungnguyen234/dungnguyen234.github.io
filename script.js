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
      let lat ;
      let long ;
      let model = document.createElement('a-entity');

      navigator.geolocation.getCurrentPosition((place) => {
        lat = place.coords.latitude;
        long = place.coords.longitude;
        console.log(place.coords.accuracy);
        model.setAttribute('gps-entity-place', `latitude: ${lat}; longitude: ${long};`);
        model.setAttribute('gltf-model', './assets/HP-glass-5.glb');
        model.setAttribute('rotation', '0 180 0');
        model.setAttribute('animation-mixer', '');
        model.setAttribute('scale', '0.2 0.2 0.2');
      });
  
     
      // model.setAttribute('position',model.position);
  
      model.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
      });
  
      scene.appendChild(model);
    });
  }