function initMap() {
  const mapOptions = {
    center: { lat: -25.98953, lng: 28.12843 }, // Center: Midrand
    zoom: 10,
  };

  const map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // Location data
  const locations = [
    {
      lat: -25.8889,
      lng: 28.1817,
      name: "Centurion Branch",
      address: "202 Hendrik Verwoerd Dr, Eldoraigne, Centurion, 0149",
    },
    {
      lat: -26.157,
      lng: 28.0227,
      name: "Greenside Branch",
      address: "53 Troon Road, Greenside",
    },
  ];

  // Create markers
  locations.forEach((location) => {
    const marker = new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.name,
    });

    // Add info windows
    const infoWindow = new google.maps.InfoWindow({
      content: `<h3>${location.name}</h3><p>${location.address}</p>`,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });

    // Add directions functionality
    marker.addListener("click", function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          const directionsService = new google.maps.DirectionsService();
          const directionsRenderer = new google.maps.DirectionsRenderer();
          directionsRenderer.setMap(map);

          const request = {
            origin: new google.maps.LatLng(userLat, userLng),
            destination: location.address,
            travelMode: google.maps.TravelMode.DRIVING,
          };

          directionsService.route(request, function (result, status) {
            if (status === "OK") {
              directionsRenderer.setDirections(result);
            } else {
              console.log("Directions request failed due to " + status);
            }
          });
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    });
  });
}
