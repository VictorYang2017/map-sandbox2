$(function () {
    var shopDropdownEl = $('#shop-dropdown'),
        defaultLocation = {
            lat: -43.525650,
            lng: 172.639847
        }
        mapMgr = new MapManager();

    

    // Regular function
    function getShoppingLocations(type){
        var apiUrlLink = `https://maps.googleapis.com/maps/api/place/search/json?location=${defaultLocation.lat},${defaultLocation.lng}&radius=50000&sensor=true&key=AIzaSyAMxVgoB0yI2L1rAOCKT4vByekE8mSrs2Y&types=shopping_mall||supermarket`
        console.log(apiUrlLink);

    }
    //set up map
    var config = {
        mapOptions: {
            center: defaultLocation,
            zoom: 12
        },
        geolocation: false
    };
    google.maps.event.addDomListener(window, 'load', function () {
        mapMgr.init('mapCanvas', config);

       // var schools = getSchools();
        //set up UI
        shopDropdownEl.on('change', function () {
            var locations = getShoppingLocations(this.value);
            mapMgr.showLocations(locations);
        });
    });
});