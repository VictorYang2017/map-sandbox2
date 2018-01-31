$(function () {
    var schoolsEl = $('#schools-dropdown'),
        mapMgr = new MapManager(),
        schoolsData = getSchools();

    function getSchools() {
        //TODO: get from JSON file
        return {
            schools: [
                {
                    title: 'Papanui High School',
                    position: {
                        lat: -43.491189,
                        lng: 172.607072
                    },
                    type: 'high-schools'
                },
                {
                    title: 'Cobham Intermediate',
                    position: {
                        lat: -43.511118,
                        lng: 172.585183
                    },
                    type: 'intermediates'
                },
            ]
        };
    }

    

    // Regular function
    function getLocations(type){
        var filteredLocation = [];
        for(var i = 0; i < schoolsData.schools.length; i++){
            var location = schoolsData.schools[i];
            if(location.type === type){
                filteredLocation.push(location);
            }  
        }
        return filteredLocation;
    }
    //set up map
    var config = {
        mapOptions: {
            center: { lat: -43.525650, lng: 172.639847 },
            zoom: 12
        },
        geolocation: false, 
        locations: schoolsData.schools
    };
    google.maps.event.addDomListener(window, 'load', function () {
        mapMgr.init('mapCanvas', config);

       // var schools = getSchools();
        //set up UI
        schoolsEl.on('change', function () {
            var locations = getLocations(this.value);
            mapMgr.showLocations(locations);
        });
    });
});