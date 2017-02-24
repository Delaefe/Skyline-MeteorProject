var comment = function(){
    $('.btn').click(function(){
        var post = $('.status-box').val();


        //Add to database for comments
        /*
        -User
        -Text
        -Comment
         */


        $('.status-box').val("");
        $('.counter').text("140");
        $('.btn').addClass('disabled');
    });


    $('.status-box').keyup(function(){

        var postLength = $(this).val().length;
        var charactersLeft = 140-postLength;
        $('.counter').text(charactersLeft);

        if(charactersLeft < 0){
            $('.btn').addClass('disabled');
        }
        else if(charactersLeft == 140){
            $('.btn').addClass('disabled');
        }
        else{
            $('.btn').removeClass('disabled');
        }
    });
    $('.btn').addClass('disabled');
};

$(document).ready(comment);