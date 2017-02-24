/////////////  RESET DATABASE //////////////////
Template.home.events({
    'click .test': function (e) {
        Meteor.call("reset"), function (err, res) {
            if (err == true) {
                console.log(err);
            }
        }
    },


});
/////////////////////////////////////////////////


Template.listCities.helpers({
    cities: function () {
        return Cities.find({});
    },

    mycities: function (city) {
        return city.createdBy === Meteor.userId();
    },

    deleteBy: function (city) {
        return city.createdBy === Meteor.userId();
    }
});

Template.listCities.events({
    'click .delete_city': function (e) {
        console.log(e.target.id);
        Cities.remove({_id: e.target.id});
    }
});

Template.home.helpers({
    cities: function () {
        return Cities.find({});
    }
});

Template.myAccount.events({
    'click .delete_city': function (e) {
        console.log(e.target.id);
        Cities.remove({_id: e.target.id});
    }
});

Template.myAccount.helpers({
    mycities: function (city) {
        return city.createdBy === Meteor.userId();
    },

    cities: function () {
        return Cities.find({});
    },


    deleteBy: function (city) {
        return city.createdBy === Meteor.userId();
    }
});


Template.addCity.events({
    'keyup form': function (event) {
        event.preventDefault();
        var typedName = $('#cityName').val();
        var getCity = Cities.findOne({name: typedName});

        if (getCity == null) {
            document.getElementById('cityName').style.color = 'black';
            $('.btn-submit').show();


        } else {
            document.getElementById('cityName').style.color = 'red';
            $('.btn-submit').hide();

        }


    },

    'submit form': function (event) {
        event.preventDefault();
        //Current user of the session

        //TODO: Convert to an object!
        var currentUserId = Meteor.userId();


        //Values for the city that we want to add to the Database
        var cityNameVar = event.target.cityName.value;
        var cityCountryVar = event.target.cityCountry.value;
        var cityRegionVar = event.target.cityRegion.value;
        var cityLongVar = event.target.cityLong.value;
        var cityLatVar = event.target.cityLat.value;
        var cityCoordinatesVar = {'long': cityLongVar, 'lat': cityLatVar};
        var citySizeVar = event.target.citySize.value;
        var cityPopulationVar = event.target.cityPopulation.value;
        var cityDescriptionVar = event.target.cityDescription.value;
        var cityActivities = [];

        var city = {
            name: cityNameVar,
            createdBy: currentUserId,
            country: cityCountryVar,
            region: cityRegionVar,
            coordinates: cityCoordinatesVar,
            size: citySizeVar,
            population: cityPopulationVar,
            description: cityDescriptionVar,
            activities: cityActivities
        };

        var getCity = Cities.findOne({name: city.name});

        if (getCity == null) {
            console.log("INSERTED CITY" + city);
            $('.uploadPanel').fadeToggle();
            $("input[type='submit']").hide();


            Meteor.call("initUploadServerForCity", city);


        }


    }

});


Template.updateCity.events({

    'submit form': function (event) {
        event.preventDefault();
        //Current user of the session
        var currentUserId = Meteor.userId();

        $('.uploadPanel').fadeToggle();
        $("input[type='submit']").hide();


        //Values for the city that we want to add to the Database
        var cityCountryVar = event.target.cityCountry.value;
        var cityRegionVar = event.target.cityRegion.value;
        var cityLongVar = event.target.cityLong.value;
        var cityLatVar = event.target.cityLat.value;
        var cityCoordinatesVar = {'long': cityLongVar, 'lat': cityLatVar};
        var citySizeVar = event.target.citySize.value;
        var cityPopulationVar = event.target.cityPopulation.value;
        var cityDescriptionVar = event.target.cityDescription.value;

        var city = {
            country: cityCountryVar,
            region: cityRegionVar,
            coordinates: cityCoordinatesVar,
            size: citySizeVar,
            population: cityPopulationVar,
            description: cityDescriptionVar
        };

        console.log(city);


        Meteor.call("updateCity", city, this);


    }


});