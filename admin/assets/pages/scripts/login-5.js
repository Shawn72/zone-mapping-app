var Login = (function () {
    
    var r = function () {
        $(".login-form").validate({
            errorElement: "span",
            errorClass: "help-block",
            focusInvalid: !1,
            rules: { email: { required: !0 }, password: { required: !0 }, remember: { required: !1 } },
            messages: { email: { required: "Username is required." }, password: { required: "Password is required." } },
            invalidHandler: function (r, e) {
                $(".alert-danger", $(".login-form")).show();
            },
            highlight: function (r) {
                $(r).closest(".form-group").addClass("has-error");
            },
            success: function (r) {
                r.closest(".form-group").removeClass("has-error"), r.remove();
                //login code here 
                //e.preventDefault() 
                $(".modalspinner").show();
                document.getElementById("btnLogin").disabled = true;

                $.ajax({
                    url	:	"functions.php",
                    method:	"POST",
                    data	:$("#logsadmin").serialize(),

                    success	:function(data){
                        //console.log(data);
                        switch(data){
                            case "login_success_super":
                                window.location.href = "index.php";
                            break;

                            case "login_success_admin":
                               window.location.href = "index.php";
                            break;

                            default: 
                                App.alert({
                                        container: "#loginMsg",
                                        place: "append",
                                        type: "danger",
                                        message:data,
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "warning"
                                    });
                               
                                $(".modalspinner").hide();
                                document.getElementById("btnLogin").disabled = false;  

                            break;

                        }                      
                    }
                })

            },
            errorPlacement: function (r, e) {
                r.insertAfter(e.closest(".input-icon"));
            },
            submitHandler: function (r) {               
                r.submit();
            }
        }), 

        // $(".login-form input").keypress(function (r) {
        //     if (13 == r.which) return false;
        // }),
        // $(".forget-form input").keypress(function (r) {
        //     if (13 == r.which) return false;
        // }),

        $("#forget-password").click(function () {
            $(".login-form").hide(), $(".forget-form").show();
        }),
        $("#back-btn").click(function () {
            $(".login-form").show(), $(".forget-form").hide();
        });            
            
    };
    return {
        init: function () {
            r(), $(".login-bg").backstretch([
            "./../assets/pages/img/login/bg1.jpg",
             "./../assets/pages/img/login/bg2.jpg", 
             "./../assets/pages/img/login/bg3.jpg"
            ],{ fade: 1e3, duration: 8e3 }), $(".forget-form").hide();
        },
    };
})();
jQuery(document).ready(function () {
    Login.init();  
});
