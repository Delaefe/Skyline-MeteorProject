Template.showActivity.events({

    'click .commentArea': function () {
        $('.btn').click(function () {
            $('.counter').text("140");
            $('.btn').addClass('disabled');
        });


        $('.status-box').keyup(function () {
            var postLength = $(this).val().length;
            var charactersLeft = 140 - postLength;
            $('.counter').text(charactersLeft);

            if (charactersLeft < 0) {
                $('.btn').addClass('disabled');
            }
            else if (charactersLeft == 140) {
                $('.btn').addClass('disabled');
            }
            else {
                $('.btn').removeClass('disabled');
            }
        });

    },


    'click .btn': function (event) {
        // event code goes here
        event.preventDefault();
        var commentTextVar = $('.status-box').val();


        if (commentTextVar != null && commentTextVar != false) {
            //Values for the comment that we want to add to the Database
            var addPost = {
                user: {
                    _id: Meteor.userId(),
                    email: Meteor.user().emails[0].address
                },
                date: new Date(),
                text: commentTextVar
            };

            console.log("POST" + addPost);

            Activities.update(
                {_id: this._id},
                {$push: {"comments": addPost}});
            $('.status-box').val("");
        }

    },

    'click .like' : function(){
        for(var i = 0; i < this.likers.length ; i++){
            if(this.likers[i] == Meteor.userId()){
                Activities.update({_id: this._id},{$pull: {"likers": Meteor.userId()}});
                return ;
            } 
        }
            Activities.update({_id: this._id},{$push: {"likers": Meteor.userId()}});
        }

    });


Template.showActivity.helpers({
    likersCount: function(){
        return this.likers.length;
    },
    imgHeart: function(){
        for(var i = 0; i < this.likers.length ; i++){
            if(this.likers[i]==Meteor.userId())
                return "heart";

        }   
        return "heart-o";

    },
    buttonLike: function() {
        for(var i = 0; i < this.likers.length ; i++){
            if(this.likers[i]==Meteor.userId())
                return "Click here to unlike";

        }   
        return "Click here to like this activity!";            
    }
});


Template.addPicture.events({

    'click .open': function (event) {
        event.preventDefault();

        $("input[type='.open']").hide();
        $('.uploadPanel').fadeToggle();



        Meteor.call("addPicturesServer", this);


    }

});