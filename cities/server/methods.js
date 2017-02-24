Meteor.methods({
    initUploadServerForCity: function (city) {
        UploadServer.init({
            tmpDir: process.cwd() + '/../../../../../.uploads/tmp',
            uploadDir: process.cwd() + '/../../../../../public/images/' + city.name,
            checkCreateDirectories: true, //create the directories for you
            finished: function (req) {
                var fileName = "/images/" + city.name + "/" + req.name;
                // Insert the new city in the collection here
                city.picture = fileName;
                var getCity = Cities.findOne({name: city.name});

                if (getCity == null)
                    Cities.insert(city);
            }
        });
    },


    'initUploadServerForActivity': function (city, activityFull, activityPreview) {

        var dirName = city.name;
        console.log(dirName);
        UploadServer.init({
            tmpDir: process.cwd() + '/../../../../../.uploads/tmp',
            uploadDir: process.cwd() + '/../../../../../public/images/' + dirName,
            checkCreateDirectories: true, //create the directories for you
            finished: function (req) {
                console.log(req.name);
                var fileName = "/images/" + dirName + "/" + req.name;


                activityFull.pictures.push(fileName);
                activityPreview.picture = fileName;

                if (activityFull.pictures.length == 1) {

                    Cities.update(
                        {_id: city._id},
                        {$push: {"activities": activityPreview}});
                }

                Activities.update(
                    {_id: activityFull._id},
                    {$push: {"pictures": fileName}});


                // add fileName in the array of pictures of the activity
                // Test whether this is the first picture in the array
                // If this is the first picture, you have update the city document by adding to its field 'activities'
                // an object with the id, the name, the nature and the picture filename(this first one)
                // You have also tu update the activity document by adding the filename to the array 'pictures'
            }
        });
    },

    'addPicturesServer': function (activity, cityID) {


        var city = Cities.findOne({_id: activity.cityID});

        var dirName = city.name;
        console.log(dirName);
        UploadServer.init({
            tmpDir: process.cwd() + '/../../../../../.uploads/tmp',
            uploadDir: process.cwd() + '/../../../../../public/images/' + dirName,
            checkCreateDirectories: true,
            finished: function (req) {
                console.log(req.name);
                var fileName = "/images/" + dirName + "/" + req.name;


                Activities.update(
                    {_id: activity._id},
                    {$push: {"pictures": fileName}});

            }
        });

    },
    'updateCity': function (city) {
        UploadServer.init({
            tmpDir: process.cwd() + '/../../../../../.uploads/tmp',
            uploadDir: process.cwd() + '/../../../../../public/images/' + cityID.name,
            checkCreateDirectories: true,
            overwrite: true,//create the directories for you

            finished: function (req) {
                var fileName = "/images/" + cityID.name + "/" + req.name;
                // Insert the new city in the collection here

                city.picture = fileName;
                Cities.update({_id: cityID._id}, {
                    $set: {
                        country: city.country,
                        region: city.region,
                        long: city.long,
                        lat: city.lat,
                        coordinates: city.coordinates,
                        size: city.size,
                        population: city.population,
                        description: city.description,
                        picture: fileName
                    }
                });


            }


        });
    },

    activityPictures: function () {
        return Activities.aggregate([{
            $project: {
                name: 1,
                nb: {
                    $size: "$pictures"
                }
            }
        }]);
    },
    activityLike: function () {
        return Activities.aggregate([{
            $project: {
                name: 1,
                nb: {
                    $size: "$likers"
                }
            }
        }]);
    }


});