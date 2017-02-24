Template.listActivities.helpers({

    'selectedNature': function () {

        var playerId = this._id;
        var selectedPlayer = Session.get('selectedPlayer');
        if (playerId == selectedPlayer) {
            return "selected";
        }
    },

    'naturePlace': function (activity) {
        return activity.nature == 'place';
    },

    'natureEvents': function (activity) {
        return activity.nature == 'event';
    },

    'delAcBy': function (activity) {
        console.log()
        return activity.createdBy === Meteor.userId();
    }
});

Template.listActivities.events({
    // 'click .nature': function(){
    //     var
    // },
    'click .delete_activity': function (e) {
        var target = e.target.id;
        console.log(target);
        Activities.remove({_id: target});
        console.log(this._id);
        Cities.update({_id: this._id}, {$pull: {activities: {_id: target}}});
    }
});


Template.addActivity.events({

    'keyup form': function (event) {
        event.preventDefault();
        var typedName = $('#activityName').val();
        var getActivity = Cities.findOne({_id: this._id, "activities.name": typedName});

        if (getActivity == null) {
            document.getElementById('activityName').style.color = 'black';
            $('.btn-submit').show();


        } else {
            document.getElementById('activityName').style.color = 'red';
            $('.btn-submit').hide();

        }


    },

    'click select': function () {
        var selectedNature = $('select').val();

        if (selectedNature == "event") {
            $('.chooseDate').fadeIn();

            $("input[type='.chooseDate']").show();

        }
        else {
            $('.chooseDate').fadeOut();

            $("input[type='.chooseDate']").hide();

        }


    },

    'submit form': function (event) {
        // event code goes here
        event.preventDefault();

        //Values for the activity that we want to add to the Database

        //Author and current city
        var activityEditor = Meteor.userId();


        //City information
        var cityIDVar = this._id;
        var activityNameVar = event.target.activityName.value;
        var activityNatureVar = event.target.activityNature.value;
        var activityURLVar = event.target.activityURL.value;
        var activityDescriptionVar = event.target.activityDescription.value;
        var activityStartVar = event.target.activityStart.value;
        var activityEndVar = event.target.activityEnd.value;
        var activityComments = [];
        var activityPictures = [];

        var newActivityFull = {
            cityID: cityIDVar,
            createdBy: activityEditor,
            name: activityNameVar,
            nature: activityNatureVar,
            url: activityURLVar,
            description: activityDescriptionVar,
            startDate: activityStartVar,
            endDate: activityEndVar,
            comments: activityComments,
            pictures: activityPictures,
            likers: []
        };

        var newActivityPreview = {
            createdBy: activityEditor,
            name: activityNameVar,
            nature: activityNatureVar,
        };


        var getActivity = Cities.findOne({"_id": this._id, "activities.name": newActivityFull.name});

        console.log(getActivity);

        if (getActivity == null) {
            $('.uploadPanel').fadeToggle();
            $("input[type='submit']").hide();

            var city = this;
            Activities.insert(newActivityFull, function (err, objectId) {
                newActivityFull._id = objectId;
                newActivityPreview._id = objectId;
                Meteor.call("initUploadServerForActivity", city, newActivityFull, newActivityPreview);
            });

        }


    }

});

