function initMap() {
  const mapOptions = {
    center: { lat: -26.157, lng: 28.0227 }, // Center: Greenside
    zoom: 12,
  };

  const map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // Location data
  const locations = [
    {
      lat: -26.139271271372834,
      lng: 27.991576506986824,
      name: "Arthur Bales, Linden",
      address: "62 4th Ave, Linden, Randburg, 2104",
    },
    {
      lat: -26.157,
      lng: 28.0227,
      name: "Greenside Embroidery Circle",
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
