function MapManager() {
    //properties
    this.map;
    this.mapCanvas;
    this.currentLocation;
    this.currentMarkers = [];

    // make this object accessable within callbacks
    var self = this;

    //methods

    this.init = function (mapId, config) {
        this.mapCanvas = document.querySelector('#' + mapId);
        this.map = new google.maps.Map(this.mapCanvas, config.mapOptions);
        if (config.geolocation) {
            this.doGeolocation();
        }
        if (config.locations) {
            this.showLocations(config.locations);
        }
    }

    this.showLocations = function (locations) {
        if(this.currentMarkers.length > 0){
            this.clearsMarkers();
        }
        for (var i = 0; i < locations.length; i++) {
            var location = locations[i];
            var marker = new google.maps.Marker({
                position: {
                    lat: location.position.lat,
                    lng: location.position.lng
                },
                title: location.title
            });
            marker.setMap(self.map);
            this.currentMarkers.push(marker);
        }
    }

    this.clearsMarkers = function () {
        for (var i = 0; i < this.currentMarkers.length; i++) {
            var marker = this.currentMarkers[i];
            marker.setMap(null);
        }
        this.currentMarkers = [];
    }

    //geolocation

    this.doGeolocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showCurrentLocation, this.showGeolocationError);
        } else {
            this.mapCanvas.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    this.showCurrentLocation = function (position) {
        this.currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        self.map.setCenter(currentLocation);
        var marker = new google.maps.Marker({
            position: { lat: position.coords.latitude, lng: position.coords.longitude },
            map: self.map,
            title: 'Hello World!'
        });
    }

    this.showGeolocationError = function () {
        console.log('Geolocation error');
    }

    //end geolocation

}