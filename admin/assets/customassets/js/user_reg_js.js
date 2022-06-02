var UserRegister = function () { 
        //START: add user
        r = function () {
        var e = $("#form_add_user"),
            r = $(".alert-danger", e),
            i = $(".alert-success", e);
        e.on("submit", function () {               

            if($("#form_add_user").valid()){

                //Start: now call insert function
                Swal.fire({
                    title: "Are you sure?",
                    text: "Proceed to add user to the database?",
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: true,
                    confirmButtonText: "Yes, Add user!",
                    confirmButtonClass: "btn-success",
                    confirmButtonColor: "#008000",
                    position: "center"
                }).then((result) => {
                    if (result.value) {
                        $(".modalspinner").show();
                        $.ajax({
                            url	:	"functions.php",
                            method:	"POST",
                            data	:$("#form_add_user").serialize(),
                            success	:function(data){
                                switch(data){
                                    case "insert_success":
                                    Swal.fire
                                    ({
                                        title: "User Added!",
                                        text: "User successfully added!",
                                        type: "success"
                                    }).then(() => {
                                        App.alert({
                                            container: "#userfeedback",
                                            place: "append",
                                            type: "success",
                                            message: "User successfully saved!",
                                            close: true,
                                            reset: true,
                                            focus: true,
                                            closeInSeconds: 10,
                                            icon: "check"
                                        }); 
                                    });                                        
                                    $(".modalspinner").hide();
                                    lu.init() //load users from dB
                                    $("#form_add_user")[0].reset() 
                                    break;
                                    default: 
                                    Swal.fire
                                    ({
                                        title: "Error!!!",
                                        text: "Error occured, Kindly contact the system developer for help!",
                                        type: "error"
                                    }).then(() => {
                                        App.alert({
                                            container: "#userfeedback",
                                            place: "append",
                                            type: "danger",
                                            message: data,
                                            close: true,
                                            reset: true,
                                            focus: true,
                                            closeInSeconds: 10,
                                            icon: "warning"
                                        });

                                    });                                         
                                    $(".modalspinner").hide();                         
                                    break;
        
                                }                      
                            }
                        })
                    }
                    else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire(
                            'Cancelled',
                            'You cancelled the action!',
                            'error'
                        );
                    }
                });                 
                //End: now call insert function  
            }
        }),
            e.validate({
                errorElement: "span",
                errorClass: "help-block help-block-error",
                focusInvalid: !1,
                ignore: "",
                rules: {
                    f_name: { minlength: 3, required: !0 },
                    l_name: { required: !0 },
                    admin_role_id: { required: !0 },
                    phone_no: { required: !0 },
                    email: { required: !0 },
                    password: {  required: !0 },
                    rpassword: { equalTo: "#password" }

                },
                errorPlacement: function (e, r) {
                    var i = $(r).parent(".input-icon").children("i");
                    i.removeClass("fa-check").addClass("fa-warning"),
                    i.attr("data-original-title", e.text()).tooltip({ container: "body" });
                
                    r.parents(".mt-radio-list").size() > 0 || r.parents(".mt-checkbox-list").size() > 0
                        ? (r.parents(".mt-radio-list").size() > 0 && e.appendTo(r.parents(".mt-radio-list")[0]), r.parents(".mt-checkbox-list").size() > 0 && e.appendTo(r.parents(".mt-checkbox-list")[0]))
                        : r.parents(".mt-radio-inline").size() > 0 || r.parents(".mt-checkbox-inline").size() > 0
                        ? (r.parents(".mt-radio-inline").size() > 0 && e.appendTo(r.parents(".mt-radio-inline")[0]), r.parents(".mt-checkbox-inline").size() > 0 && e.appendTo(r.parents(".mt-checkbox-inline")[0]))
                        : r.parent(".input-group").size() > 0
                        ? e.insertAfter(r.parent(".input-group"))
                        : r.attr("data-error-container")
                        ? e.appendTo(r.attr("data-error-container"))
                        : e.insertAfter(r);
                },
                invalidHandler: function (e, t) {
                    i.hide(), r.show(), App.scrollTo(r, -200);
                },
                highlight: function (e) {
                    $(e).closest(".form-group").addClass("has-error"); 
                },
                unhighlight: function (e,r) {
                    $(e).closest(".form-group").removeClass("has-error");
                    var i = $(r).parent(".input-icon").children("i");
                    $(r).closest(".form-group").removeClass("has-error").addClass("has-success"), 
                    i.removeClass("fa-warning").addClass("fa-check");
                },
                success: function (e,r) {
                    e.closest(".form-group").removeClass("has-error");
                    var i = $(r).parent(".input-icon").children("i");
                    $(r).closest(".form-group").removeClass("has-error").addClass("has-success"),
                    i.removeClass("fa-warning").addClass("fa-check");
                },
                submitHandler: function (e) {
                    i.show(), r.hide();
                },
            })
        };
        //END: Add user

        //START: EDit a user
        x = function () {
            var e = $("#form_edit_user"),
                r = $(".alert-danger", e),
                i = $(".alert-success", e);
            e.on("submit", function () {               
    
                if($("#form_edit_user").valid()){

                    //Start: now call insert function
                    Swal.fire({
                        title: "Are you sure?",
                        text: "Proceed to edit the user",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: true,
                        confirmButtonText: "Yes, Edit user!",
                        confirmButtonClass: "btn-success",
                        confirmButtonColor: "#008000",
                        position: "center"
                    }).then((result) => {
                        if (result.value) {
                            $(".modalspinner").show();
                            $.ajax({
                                url	:	"functions.php",
                                method:	"POST",
                                data	:$("#form_edit_user").serialize(),
                                success	:function(data){
                                    switch(data){
                                        case "insert_success":
                                        Swal.fire
                                        ({
                                            title: "User Edited!",
                                            text: "User successfully edited!",
                                            type: "success"
                                        }).then(() => {
                                            App.alert({
                                                container: "#userfeedback",
                                                place: "append",
                                                type: "success",
                                                message: "User successfully saved!",
                                                close: true,
                                                reset: true,
                                                focus: true,
                                                closeInSeconds: 10,
                                                icon: "check"
                                            }); 
                                        });                                        
                                        $(".modalspinner").hide();
                                        lu.init() //load users from dB
                                       // $("#form_edit_user")[0].reset() 
                                        break;
                                        default: 
                                        Swal.fire
                                        ({
                                            title: "Error!!!",
                                            text: "Error occured, Kindly contact the system developer for help!",
                                            type: "error"
                                        }).then(() => {
                                            App.alert({
                                                container: "#userfeedback",
                                                place: "append",
                                                type: "danger",
                                                message: data,
                                                close: true,
                                                reset: true,
                                                focus: true,
                                                closeInSeconds: 10,
                                                icon: "warning"
                                            });
    
                                        });                                         
                                        $(".modalspinner").hide();                         
                                        break;
            
                                    }                      
                                }
                            })
                        }
                        else if (result.dismiss === Swal.DismissReason.cancel) {
                            Swal.fire(
                                'Cancelled',
                                'You cancelled the action!',
                                'error'
                            );
                        }
                    });                 
                    //End: now call insert function  
                }
            }),
                e.validate({
                    errorElement: "span",
                    errorClass: "help-block help-block-error",
                    focusInvalid: !1,
                    ignore: "",
                    rules: {
                        e_f_name: { minlength: 3, required: !0 },
                        e_l_name: { required: !0 },
                        e_admin_role_id: { required: !0 },
                        e_phone_no: { required: !0 },
                        e_email: { required: !0 }    
                    },
                    errorPlacement: function (e, r) {
                        var i = $(r).parent(".input-icon").children("i");
                        i.removeClass("fa-check").addClass("fa-warning"),
                        i.attr("data-original-title", e.text()).tooltip({ container: "body" });
                    
                        r.parents(".mt-radio-list").size() > 0 || r.parents(".mt-checkbox-list").size() > 0
                            ? (r.parents(".mt-radio-list").size() > 0 && e.appendTo(r.parents(".mt-radio-list")[0]), r.parents(".mt-checkbox-list").size() > 0 && e.appendTo(r.parents(".mt-checkbox-list")[0]))
                            : r.parents(".mt-radio-inline").size() > 0 || r.parents(".mt-checkbox-inline").size() > 0
                            ? (r.parents(".mt-radio-inline").size() > 0 && e.appendTo(r.parents(".mt-radio-inline")[0]), r.parents(".mt-checkbox-inline").size() > 0 && e.appendTo(r.parents(".mt-checkbox-inline")[0]))
                            : r.parent(".input-group").size() > 0
                            ? e.insertAfter(r.parent(".input-group"))
                            : r.attr("data-error-container")
                            ? e.appendTo(r.attr("data-error-container"))
                            : e.insertAfter(r);
                    },
                    invalidHandler: function (e, t) {
                        i.hide(), r.show(), App.scrollTo(r, -200);
                    },
                    highlight: function (e) {
                        $(e).closest(".form-group").addClass("has-error"); 
                    },
                    unhighlight: function (e,r) {
                        $(e).closest(".form-group").removeClass("has-error");
                        var i = $(r).parent(".input-icon").children("i");
                        $(r).closest(".form-group").removeClass("has-error").addClass("has-success"), 
                        i.removeClass("fa-warning").addClass("fa-check");
                    },
                    success: function (e,r) {
                        e.closest(".form-group").removeClass("has-error");
                        var i = $(r).parent(".input-icon").children("i");
                        $(r).closest(".form-group").removeClass("has-error").addClass("has-success"),
                        i.removeClass("fa-warning").addClass("fa-check");
                    },
                    submitHandler: function (e) {
                        i.show(), r.hide();
                    },
                })
            };
        //END: EDit user

        //START: EDit a user Password
        h = function () {
            var e = $("#form_reset_password"),
                r = $(".alert-danger", e),
                i = $(".alert-success", e);
            e.on("submit", function () {               
    
                if($("#form_reset_password").valid()){

                    //Start: now call insert function
                    Swal.fire({
                        title: "Are you sure?",
                        text: "Proceed to edit the password",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: true,
                        confirmButtonText: "Yes, Reset Password!",
                        confirmButtonClass: "btn-success",
                        confirmButtonColor: "#008000",
                        position: "center"
                    }).then((result) => {
                        if (result.value) {
                            $(".modalspinner").show();
                            $.ajax({
                                url	:	"functions.php",
                                method:	"POST",
                                data	:$("#form_reset_password").serialize(),
                                success	:function(data){
                                    switch(data){
                                        case "insert_success":
                                        Swal.fire
                                        ({
                                            title: "Password Edited!",
                                            text: "Password successfully edited!",
                                            type: "success"
                                        }).then(() => {
                                            App.alert({
                                                container: "#userfeedback",
                                                place: "append",
                                                type: "success",
                                                message: "User Password saved!",
                                                close: true,
                                                reset: true,
                                                focus: true,
                                                closeInSeconds: 10,
                                                icon: "check"
                                            }); 
                                        });                                        
                                        $(".modalspinner").hide();
                                        $("#form_reset_password")[0].reset() 
                                        break;
                                        default: 
                                        Swal.fire
                                        ({
                                            title: "Error!!!",
                                            text: data,
                                            type: "error"
                                        }).then(() => {
                                            App.alert({
                                                container: "#userfeedback",
                                                place: "append",
                                                type: "danger",
                                                message: data,
                                                close: true,
                                                reset: true,
                                                focus: true,
                                                closeInSeconds: 10,
                                                icon: "warning"
                                            });
    
                                        });                                         
                                        $(".modalspinner").hide();                         
                                        break;
            
                                    }                      
                                }
                            })
                        }
                        else if (result.dismiss === Swal.DismissReason.cancel) {
                            Swal.fire(
                                'Cancelled',
                                'You cancelled the action!',
                                'error'
                            );
                        }
                    });                 
                    //End: now call insert function  
                }
            }),
                e.validate({
                    errorElement: "span",
                    errorClass: "help-block help-block-error",
                    focusInvalid: !1,
                    ignore: "",
                    rules: {
                        e_password: { minlength: 4, required: !0 },  
                        e_rpassword: { equalTo: "#e_password" }
                    },
                    errorPlacement: function (e, r) {
                        var i = $(r).parent(".input-icon").children("i");
                        i.removeClass("fa-check").addClass("fa-warning"),
                        i.attr("data-original-title", e.text()).tooltip({ container: "body" });
                    
                        r.parents(".mt-radio-list").size() > 0 || r.parents(".mt-checkbox-list").size() > 0
                            ? (r.parents(".mt-radio-list").size() > 0 && e.appendTo(r.parents(".mt-radio-list")[0]), r.parents(".mt-checkbox-list").size() > 0 && e.appendTo(r.parents(".mt-checkbox-list")[0]))
                            : r.parents(".mt-radio-inline").size() > 0 || r.parents(".mt-checkbox-inline").size() > 0
                            ? (r.parents(".mt-radio-inline").size() > 0 && e.appendTo(r.parents(".mt-radio-inline")[0]), r.parents(".mt-checkbox-inline").size() > 0 && e.appendTo(r.parents(".mt-checkbox-inline")[0]))
                            : r.parent(".input-group").size() > 0
                            ? e.insertAfter(r.parent(".input-group"))
                            : r.attr("data-error-container")
                            ? e.appendTo(r.attr("data-error-container"))
                            : e.insertAfter(r);
                    },
                    invalidHandler: function (e, t) {
                        i.hide(), r.show(), App.scrollTo(r, -200);
                    },
                    highlight: function (e) {
                        $(e).closest(".form-group").addClass("has-error"); 
                    },
                    unhighlight: function (e,r) {
                        $(e).closest(".form-group").removeClass("has-error");
                        var i = $(r).parent(".input-icon").children("i");
                        $(r).closest(".form-group").removeClass("has-error").addClass("has-success"), 
                        i.removeClass("fa-warning").addClass("fa-check");
                    },
                    success: function (e,r) {
                        e.closest(".form-group").removeClass("has-error");
                        var i = $(r).parent(".input-icon").children("i");
                        $(r).closest(".form-group").removeClass("has-error").addClass("has-success"),
                        i.removeClass("fa-warning").addClass("fa-check");
                    },
                    submitHandler: function (e) {
                        i.show(), r.hide();
                    },
                })
            };
        //END: EDit user password

    return {
        init: function () {
            r(),x(), h();
        }
    }
}();

//START: list users
var lu = function () {
    b = function() {
        var tl = $("#tbl_users_list"),
            l = tl.dataTable({
                lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
                pageLength: 5,
                language: { lengthMenu: " _MENU_ records" },
                columnDefs: [
                    {
                        orderable: !0,
                        defaultContent: "-",
                        targets: "_all"
                    },
                    {
                        searchable: !0,
                        targets: "_all"
                    }
                ],
                order: [
                    [0, "asc"]
                ],
                bDestroy: true,
                info: false,
                processing: true,
                retrieve: true
            });

            $.ajaxSetup({
                global: false,
                type: "POST",
                url: "functions.php",
                beforeSend: function () {
                    $(".modalspinner").show();
                },
                complete: function () {
                    $(".modalspinner").hide();
                }
            });

            $.ajax({
               data: {getallusers:1 },
               async:true,
            }).done(function(json) {
                //parse string to JSON                
                var newarr = JSON.parse(json); 
                console.log(newarr)
                l.fnClearTable();
                for (var i = 0; i < newarr.length; i++) {
                    l.fnAddData([                       
                        newarr[i].adm_id,
                        '<img class="imgresize img-responsive" oneerror="image_error();" src="/zicco/product_images/'+newarr[i].adm_id+'/'+newarr[i].user_img+'" alt="user-img" />',
                        newarr[i].first_name+" "+newarr[i].last_name,
                        newarr[i].email,
                        newarr[i].phone_number,
                        newarr[i].user_role,
                        '<a class="edit_user_0" href=""><i class="fas fa-edit"></i>&nbspEdit User</a>',
                        '<a class="edit_user_image" href=""><i class="fas fa-edit"></i>&nbsp;Edit Image</a>',
                        '<a class="edit_user_password" href=""><i class="fas fa-edit"></i>&nbspEdit Password</a>',
                        '<a class="delete_user" href=""><i class="fas fa-trash"></i>&nbspDelete User</a>'
                    ]);                    
                }
            });

            tl.on("click",
            ".delete_user",
            function (tl) {
                tl.preventDefault();
                var b = $(this).parents("tr")[0];
                //global loader spinner;
                $.ajaxSetup({
                    global: false,
                    type: "POST",
                    url: "functions.php",
                    beforeSend: function () {
                        $(".modalspinner").show();
                    },
                    complete: function () {
                        $(".modalspinner").hide();
                    }
                });
                var delterank = $('#user_rank').val().trim();
                //async call delete:
                Swal.fire({
                    title: "Are you sure?",
                    text: "Proceed to delete "+b.cells[2].innerHTML+"?",
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: true,
                    confirmButtonText: "Yes, go delete!",
                    confirmButtonClass: "btn-success",
                    confirmButtonColor: "rgb(0,128,0)",
                    position: "center"
                }).then((result) => {
                    if (result.value) {
                    //start ajax call
                    $.ajax({
                        data:  {deleteuser:1, userid:b.cells[0].innerHTML, delete_rights:delterank},
                        async: true
                    }).done(function (data) {
                        switch(data){
                            case "delete_success":
                            Swal.fire
                            ({
                                title: "User Deleted!",
                                text: "User removed successfully!",
                                type: "success"
                            }).then(() => {
                                App.alert({
                                    container: "#generalfeedback",
                                    place: "append",
                                    type: "success",
                                    message: "User removed successfully!",
                                    close: true,
                                    reset: true,
                                    focus: true,
                                    closeInSeconds: 6,
                                    icon: "check"
                                }); 
                            });                                        
                        $(".modalspinner").hide();
                       //call ajax to populate table here.....
                       fd.init();
                        break;
                        default:                                        
                            Swal.fire
                            ({
                                title: "Error!!!",
                                text: data,
                                type: "error"
                            }).then(() => {
                                App.alert({
                                    container: "#generalfeedback",
                                    place: "append",
                                    type: "danger",
                                    message: data,
                                    close: true,
                                    reset: true,
                                    focus: true,
                                    closeInSeconds: 10,
                                    icon: "warning"
                                });

                            });                                         
                            $(".modalspinner").hide();                         
                            break;
                        }                      
                        
                    });
                ////end ajax call here
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(
                        'Cancelled',
                        'You cancelled the action!',
                        'error'
                    );
                }
                })              
            });

            //edit user: code here
            tl.on("click",
            ".edit_user_0",
            function (tl) {
                tl.preventDefault();
                var i = $(this).parents("tr")[0];             

                //async call delete:
                Swal.fire({
                    title: "Are you sure?",
                    text: "Proceed to edit "+i.cells[2].innerHTML+"?",
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: true,
                    confirmButtonText: "Yes, go edit!",
                    confirmButtonClass: "btn-success",
                    confirmButtonColor: "#008000",
                    position: "center"
                }).then((result) => {
                    if (result.value) {
                    //global loader spinner;
                    $.ajaxSetup({
                        global: false,
                        type: "POST",
                        url: "functions.php",
                        beforeSend: function () {
                            $(".modalspinner").show();
                        },
                        complete: function () {
                            $(".modalspinner").hide();
                        }
                    });

                    //start ajax call
                    $.ajax({
                        data:  {getspecificuser:1, userid:i.cells[0].innerHTML},
                        async: true
                    }).done(function (data) {
                        //switch divs
                        $('#add_user_div').css("display", "none");
                        $('#edit_user_div').css("display", "block");                    
                        //parse string to JSON                
                        var newarr = JSON.parse(data); 
                        console.log(newarr)
                        for (var i = 0; i < newarr.length; i++) {
                            //populate the textfields                        
                            $('#e_user_id').val( newarr[i].adm_id )
                            $('#e_f_name').val( newarr[i].first_name )
                            $('#e_l_name').val( newarr[i].last_name )
                            $('#e_phone_no').val( newarr[i].phone_number )
                            $('#e_email').val( newarr[i].email )    
                            $('#e_admin_role_id').val(newarr[i].user_role).change()                  
                        }
                    });
                    ////end ajax call here
                    }
                    else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire(
                            'Cancelled',
                            'You cancelled the action!',
                            'error'
                        );
                    }
                    })              
            });
            //end: edit user: code here
            
            //edit user image: code here
            tl.on("click",
            ".edit_user_image",
            function (tl) {
                tl.preventDefault();
                var i = $(this).parents("tr")[0];             

                //async call delete:
                Swal.fire({
                    title: "Are you sure?",
                    text: "Proceed to edit "+i.cells[2].innerHTML+" image ?",
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: true,
                    confirmButtonText: "Yes, go edit!",
                    confirmButtonClass: "btn-success",
                    confirmButtonColor: "#008000",
                    position: "center"
                }).then((result) => {
                    if (result.value) {
                    //global loader spinner;
                    $.ajaxSetup({
                        global: false,
                        type: "POST",
                        url: "functions.php",
                        beforeSend: function () {
                            $(".modalspinner").show();
                        },
                        complete: function () {
                            $(".modalspinner").hide();
                        }
                    });

                    //start ajax call
                    $.ajax({
                        data:  {getspecificuser:1, userid:i.cells[0].innerHTML},
                        async: true
                    }).done(function (data) {
                        //switch divs
                        $('#add_user_div').css("display", "none");
                        $('#change_image').css("display", "block");                    
                        //parse string to JSON                
                        var newarr = JSON.parse(data); 
                        console.log(newarr)
                        for (var i = 0; i < newarr.length; i++) {                            
                            $('#i_user_id').val(newarr[i].adm_id)
                            $('#spec_image_name').text(newarr[i].first_name+" "+newarr[i].last_name)                            
                            $('#user_img_id').attr("src", "/zicco/product_images/"+newarr[i].adm_id+"/"+newarr[i].user_img);                                      
                                                                
                        }
                    });
                    //end ajax call here
                    }
                    else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire(
                            'Cancelled',
                            'You cancelled the action!',
                            'error'
                        );
                    }
                    })              
            });
             //end: edit user image: code here   
             
              //edit password: code here
            tl.on("click",
            ".edit_user_password",
            function (tl) {
                tl.preventDefault();
                var i = $(this).parents("tr")[0];             

                //async call delete:
                Swal.fire({
                    title: "Are you sure?",
                    text: "Proceed to edit "+i.cells[2].innerHTML+"'s password?",
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: true,
                    confirmButtonText: "Yes, go edit password!",
                    confirmButtonClass: "btn-success",
                    confirmButtonColor: "#008000",
                    position: "center"
                }).then((result) => {
                    if (result.value) {
                    //global loader spinner;
                    $.ajaxSetup({
                        global: false,
                        type: "POST",
                        url: "functions.php",
                        beforeSend: function () {
                            $(".modalspinner").show();
                        },
                        complete: function () {
                            $(".modalspinner").hide();
                        }
                    });

                    //start ajax call
                    $.ajax({
                        data:  {getspecificuser:1, userid:i.cells[0].innerHTML},
                        async: true
                    }).done(function (data) {
                        //switch divs
                        $('#add_user_div').css("display", "none");
                        $('#change_password').css("display", "block");                    
                        //parse string to JSON                
                        var newarr = JSON.parse(data); 
                        console.log(newarr)
                        for (var i = 0; i < newarr.length; i++) {                            
                            //populate the textfields
                            $('#p_user_id').val(newarr[i].adm_id)                 
                            $('#spec_user_name').text( newarr[i].first_name +" " +newarr[i].last_name )                 
                        }
                    });
                    ////end ajax call here
                    }
                    else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire(
                            'Cancelled',
                            'You cancelled the action!',
                            'error'
                        );
                    }
                    })              
            });
            //end: editpassword: code here
    };
    return {
        init: function () {
            b();
        }
    }
}();

//START: add user image
$('.btn_upload_user_img').click(function (e) {
    //To prevent form submit after ajax call
    e.preventDefault();
    //reset to empty
    $("#imgfeedback").html("");   
    var userid = $("#i_user_id").val().trim();
    var browsedDoc = document.getElementById('inputimg_selector').files[0];    
    var imgurl = URL.createObjectURL(browsedDoc)
    var formDt = new FormData();
    formDt.append("iuserid", userid);
    formDt.append("ibrowsedfile_img", browsedDoc);
    formDt.append("edit_user_photo", 1);
    
    Swal.fire({
        title: "Upload Image?",
        text: "Proceed to upload the selected image!",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: true,
        confirmButtonText: "Yes, Upload Image!",
        confirmButtonClass: "btn-success",
        confirmButtonColor: "#008000",
        position: "center"
    }).then((result) => {
        if (result.value) {
            $.ajax({
                xhr: function () {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = ((evt.loaded / evt.total) * 100);
                            $(".progress-bar").width(percentComplete + '%');
                            $(".progress-bar").html(percentComplete + '%');
                        }
                    }, false);
                    return xhr;
                },
                type: 'POST',
                url: 'fileuploads.php',                                                       
                data: formDt,
                contentType: false,
                dataType: 'json',
                cache: false,
                processData: false,
                beforeSend: function () {
                    $(".progress-bar").width('0%');                       
                },
                error: function () {
                    $(".progress-bar-success").css("background-color", "red");
                    $(".progress-bar").html(0 + '%');
                    App.alert({
                        container: "#imgfeedback",
                        place: "append",
                        type: "danger",
                        message: "Unknown error happened!",
                        close: true,
                        reset: true,
                        focus: true,
                        closeInSeconds: 5,
                        icon: "warning"
                    });
                },
                success: function (response) {
                    switch (response.status) {
                    case 1:
                        Swal.fire
                        ({
                            title: "Image Uploaded!",
                            text: "Image Uploaded Success!",
                            type: "success"
                        }).then(() => {
                            App.alert({
                                container: "#imgfeedback",
                                place: "append",
                                type: "success",
                                message: response.message,
                                close: true,
                                reset: true,
                                focus: true,
                                closeInSeconds: 5,
                                icon: "check"
                            });
                            $('#user_img_id').attr("src",  imgurl);                                     
              
                        });
                        break;
                    default:
                        Swal.fire
                        ({
                            title: "Error!!!",
                            text: response.message,
                            type: "error"
                        }).then(() => {
                            App.alert({
                                container: "#imgfeedback",
                                place: "append",
                                type: "danger",
                                message: response.message,
                                close: true,
                                reset: true,
                                focus: true,
                                closeInSeconds: 5,
                                icon: "warning"
                            });
                            $("#inputFileselector_image").focus();
                            $("#inputFileselector_image").css("border", "solid 1px red");
                            
                            $(".progress-bar-success").css("background-color", "red");
                            $(".progress-bar").html(0 + '%');

                        });
                        break;
                    }
                }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'You cancelled upload!',
                'error'
            );
        }
    });
});
//START: add user image 

//start :go back
$(".btn_back_2h").click(function () {
    //START: reload table not page ...page reload   
    location.reload();
    $('#add_user_div').css("display", "block");
    $('#edit_user_div').css("display", "none"); 
    $('#change_image').css("display", "none"); 
    $('#change_password').css("display", "none");    
    //END: reload table not page    
});
//end: go back

//start: load image uploaded on image div
var loadImageFile = function(event) {
	var image = document.getElementById('user_img_id');
    image.src = URL.createObjectURL(event.target.files[0]);
} 
//end: load image uploaded on image div

jQuery(document).ready(function () {
    UserRegister.init(), lu.init();
});