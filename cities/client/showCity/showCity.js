 if (Meteor.isClient) {
   Meteor.startup(function() {
    GoogleMaps.load();
    });
  };

  Template.city.helpers({
    city_map_option: function() {

      // Make sure the maps API has loaded
      if (GoogleMaps.loaded() && this.coordinates) {
         var long = this.coordinates.long;
         var lat = this.coordinates.lat;

        // Map initialization options
          return {
              center: new google.maps.LatLng(lat, long),
              scrollwheel: false,
              minZoom : 4,
              zoom: 8
          };
      }
   }
  });