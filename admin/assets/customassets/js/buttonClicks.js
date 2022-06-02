'use-strict';
$(document).ready(function () {
    
    $(".btn_add_size").click(function () {
        $('#addsizes').css("display", "block");
        $('#addstock').css("display", "none");
        $('#addclass').css("display", "none");
        $('#addcategory').css("display", "none");
        $('#addbrands').css("display", "none");
        $('#editstock').css("display", "none");
        $('#addprfeatures').css("display", "none");
        $('#addphotos').css("display", "none");

    });
    $(".btn_add_brand").click(function () {
        $('#addbrands').css("display", "block");
        $('#addsizes').css("display", "none");
        $('#addstock').css("display", "none");
        $('#addclass').css("display", "none");
        $('#addcategory').css("display", "none");
        $('#editstock').css("display", "none");
        $('#addprfeatures').css("display", "none");
        $('#addphotos').css("display", "none");

    });
    $(".btn_add_category").click(function () {
        $('#addcategory').css("display", "block");
        $('#addsizes').css("display", "none");
        $('#addstock').css("display", "none");      
        $('#addbrands').css("display", "none");
        $('#editstock').css("display", "none");
        $('#addprfeatures').css("display", "none");
        $('#addphotos').css("display", "none");
    });  

    $(".btn_add_features").click(function () {
        $('#addprfeatures').css("display", "block");       
        $('#addsizes').css("display", "none");
        $('#addstock').css("display", "none");
        $('#addcategory').css("display", "none");
        $('#addbrands').css("display", "none");
        $('#editstock').css("display", "none");       
        $('#addphotos').css("display", "none");
    });
    
    $('#product_feature').bind("cut copy paste", function (e) {
		e.preventDefault();
		Swal.fire
		({
			title: "Oops!!",
			text: "No copy pasting!",
			type: "error"
		}).then(() => {
			$("#lblfeaturepastingerror").css("color", "red");
			$('#product_feature').css('border', "solid 2px red");
			$("#lblfeaturepastingerror").html("You cannot paste into this textarea, sorry, you gonna have to type!");
		});

		$('#product_feature').bind("contextmenu", function (e) {
			e.preventDefault();
		});
    });  

// File type validation
$("#inputFileselector_image").change(function() {
    var file = this.files[0];
    var fileType = file.type;
    var match = ['image/jpeg', 'image/png', 'image/jpg'];
    if(!((fileType == match[0]) || (fileType == match[1]) || (fileType == match[2]))){
          Swal.fire
                ({
                    title: "Error!!",
                    text: "Image Format Error!",
                    type: "error"
                }).then(() => {
                    App.alert({
                        container: "#uploads_alert",
                        place: "append",
                        type: "danger",
                        message: "Only JPG, JPEG, & PNG file formats are allowed to upload here!",
                        close: true,
                        reset: true,
                        focus: true,
                        closeInSeconds: 5,
                        icon: "warning"
                    });
                });              
        $("#inputFileselector_image").val('');
        return false;
    }
});

$(".loadpage_data").click(function () {
    var pgn = $('.pghref').attr('attr_page');
    alert('clicked page: '+pgn)
});

$(".btnlink_add_users").click(function () {   
    var userrank = $('#user_rank').val().trim();    
    switch(userrank){
        case 'super_admin':
            window.location = "add_user_form.php";
        break;
        case 'admin':
            window.location = "add_user_form.php";
        break;
        default:
            App.alert({
                container: "#generalfeedback",
                place: "append",
                type: "danger",
                message: "You are not allowed to load that page, only Super level admins can go there, chill!",
                close: true,
                reset: true,
                focus: true,
                closeInSeconds: 10,
                icon: "warning"
            }); 
        break;
    }
});

//fancy box for Images preview
jQuery(".fancybox-button").each(function () {
    $(this).attr("href", $(this).find("img").attr("src"))
}).fancybox({});

});

