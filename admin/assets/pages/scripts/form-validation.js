var FormValidation = (function () {
    var e = function () {
            var e = $("#form_sample_1"),
                r = $(".alert-danger", e),
                i = $(".alert-success", e);
            e.validate({
                errorElement: "span",
                errorClass: "help-block help-block-error",
                focusInvalid: !1,
                ignore: "",
                messages: { select_multi: { maxlength: jQuery.validator.format("Max {0} items allowed for selection"), minlength: jQuery.validator.format("At least {0} items must be selected") } },
                rules: {
                    name: { minlength: 2, required: !0 },
                    input_group: { email: !0, required: !0 },
                    email: { required: !0, email: !0 },
                    url: { required: !0, url: !0 },
                    number: { required: !0, number: !0 },
                    digits: { required: !0, digits: !0 },
                    creditcard: { required: !0, creditcard: !0 },
                    occupation: { minlength: 5 },
                    select: { required: !0 },
                    select_multi: { required: !0, minlength: 1, maxlength: 3 },
                },
                invalidHandler: function (e, t) {
                    i.hide(), r.show(), App.scrollTo(r, -200);
                },
                errorPlacement: function (e, r) {
                    var i = $(r).parent(".input-group");
                    i.size() > 0 ? i.after(e) : r.after(e);
                },
                highlight: function (e) {
                    $(e).closest(".form-group").addClass("has-error");
                },
                unhighlight: function (e) {
                    $(e).closest(".form-group").removeClass("has-error");
                },
                success: function (e) {
                    e.closest(".form-group").removeClass("has-error");
                },
                submitHandler: function (e) {
                    i.show(), r.hide();
                },
            });
        },        
        r = function () {
            var e = $("#form_sample_2"),
                r = $(".alert-danger", e),
                i = $(".alert-success", e);
            e.validate({
                errorElement: "span",
                errorClass: "help-block help-block-error",
                focusInvalid: !1,
                ignore: "",
                rules: {
                    name: { minlength: 2, required: !0 },
                    email: { required: !0, email: !0 },
                    email: { required: !0, email: !0 },
                    url: { required: !0, url: !0 },
                    number: { required: !0, number: !0 },
                    digits: { required: !0, digits: !0 },
                    creditcard: { required: !0, creditcard: !0 },
                },
                invalidHandler: function (e, t) {
                    i.hide(), r.show(), App.scrollTo(r, -200);
                },
                errorPlacement: function (e, r) {
                    var i = $(r).parent(".input-icon").children("i");
                    i.removeClass("fa-check").addClass("fa-warning"), i.attr("data-original-title", e.text()).tooltip({ container: "body" });
                },
                highlight: function (e) {
                    $(e).closest(".form-group").removeClass("has-success").addClass("has-error");
                },
                unhighlight: function (e) {},
                success: function (e, r) {
                    var i = $(r).parent(".input-icon").children("i");
                    $(r).closest(".form-group").removeClass("has-error").addClass("has-success"), i.removeClass("fa-warning").addClass("fa-check");
                },
                submitHandler: function (e) {
                    i.show(), r.hide(), e[0].submit();
                },
            });
        },
        ///<============ CUSTOMIZATIONS STARTS HERE===============>

        //START: add product
        i = function () {
            var e = $("#form_sample_3"),
                r = $(".alert-danger", e),
                i = $(".alert-success", e);
            e.on("submit", function () {
                for (var e in CKEDITOR.instances) CKEDITOR.instances[e].updateElement();

                if($("#form_sample_3").valid()){

                    //Start: now call insert function
                    Swal.fire({
                        title: "Are you sure?",
                        text: "Proceed to add product to the database?",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: true,
                        confirmButtonText: "Yes, Add the product!",
                        confirmButtonClass: "btn-success",
                        confirmButtonColor: "#008000",
                        position: "center"
                    }).then((result) => {
                        if (result.value) {
                            $(".modalspinner").show();
                            $.ajax({
                                url	:	"functions.php",
                                method:	"POST",
                                data	:$("#form_sample_3").serialize(),
                                success	:function(data){
                                   // console.log(data)
                                    switch(data){
                                        case "insert_success":
                                        Swal.fire
                                        ({
                                            title: "Product Added!",
                                            text: "Product successfully added!",
                                            type: "success"
                                        }).then(() => {
                                            App.alert({
                                                container: "#generalfeedback",
                                                place: "append",
                                                type: "success",
                                                message: "Product successfully saved!",
                                                close: true,
                                                reset: true,
                                                focus: true,
                                                closeInSeconds: 10,
                                                icon: "check"
                                            }); 
                                        });                                        
                                     $(".modalspinner").hide();
                                     Ld.init(); //call product refresh function
                                     $("#form_sample_3")[0].reset() 
                                        break;
                                        default: 
                                        Swal.fire
                                        ({
                                            title: "Error!!!",
                                            text: "Error occured, Kindly contact the system developer for help!",
                                            type: "error"
                                        }).then(() => {
                                            App.alert({
                                                container: "#generalfeedback",
                                                place: "append",
                                                type: "danger",
                                                message: "unknown error occured!",
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
                        pname: { minlength: 3, required: !0 },
                        product_category: { required: !0 },
                        product_collection: { required: !0 },
                        product_brand: { required: !0 },
                        brandavailable: { required: !0 },
                        describeit: { required: !0 },
                        quantity: { required: !0, number: !0 },
                        product_price: { required: !0, number: !0  }
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
                }),
                $(".select2", e).change(function () {
                    e.validate().element($(this));
                }),
                $(".date-picker").datepicker({ rtl: App.isRTL(), autoclose: !0}),
                $(".date-picker").datepicker("setDate", new Date()),
                $(".date-picker").datepicker("defaultDate", +0),
                $(".date-picker .form-control").change(function () {
                    e.validate().element($(this));                  
                });
        },
         //END: Add product

         //START: brands
        f = function () {
            var e = $("#form_sample_7"),
                r = $(".alert-danger", e),
                i = $(".alert-success", e);
                e.on("submit", function () {                   
                  if($("#form_sample_7").valid()){
                      //now call insert function
                    Swal.fire({
                        title: "Are you sure?",
                        text: "Proceed to add brand to database?",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: true,
                        confirmButtonText: "Yes, Add the brand!",
                        confirmButtonClass: "btn-success",
                        confirmButtonColor: "#008000",
                        position: "center"
                    }).then((result) => {
                        if (result.value) {
                            $(".modalspinner").show();
                            $.ajax({
                                url	:	"functions.php",
                                method:	"POST",
                                data	:$("#form_sample_7").serialize(),
                                success	:function(data){
                                    //console.log(data);
                                    switch(data){
                                        case "insert_success":
                                        Swal.fire
                                        ({
                                            title: "Brand Added!",
                                            text: "Product brand successfully added!",
                                            type: "success"
                                        }).then(() => {
                                            App.alert({
                                                container: "#generalfeedback",
                                                place: "append",
                                                type: "success",
                                                message: "Product brand successfully saved!",
                                                close: true,
                                                reset: true,
                                                focus: true,
                                                closeInSeconds: 10,
                                                icon: "check"
                                            }); 
                                        });                                        
                                     $(".modalspinner").hide();
                                     Ld.init();
                                     //reset the whole form
                                     $("#form_sample_7")[0].reset()                                      
                                        break;
                                        default:                                        
                                        Swal.fire
                                        ({
                                            title: "Error!!!",
                                            text: "Error occured, Kindly contact the system developer for help!",
                                            type: "error"
                                        }).then(() => {
                                            App.alert({
                                                container: "#generalfeedback",
                                                place: "append",
                                                type: "danger",
                                                message: "unknown error occured!",
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
                    })
                     }                    
                }),
                e.validate({
                    errorElement: "span",
                    errorClass: "help-block help-block-error",
                    focusInvalid: !1,
                    ignore: "",
                    rules: {
                        brandname: { minlength: 3, required: !0 }                        
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
              
        },
         //END: brands

        //START: categories
        c = function () {
            var e = $("#form_sample_9"),
                r = $(".alert-danger", e),
                i = $(".alert-success", e);
                e.on("submit", function () {                   
                  if($("#form_sample_9").valid()){
                      //now call insert function
                    Swal.fire({
                        title: "Are you sure?",
                        text: "Proceed to add category to database?",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: true,
                        confirmButtonText: "Yes, Add the category!",
                        confirmButtonClass: "btn-success",
                        confirmButtonColor: "#008000",
                        position: "center"
                    }).then((result) => {
                        if (result.value) {
                            $(".modalspinner").show();
                            $.ajax({
                                url	:	"functions.php",
                                method:	"POST",
                                data	:$("#form_sample_9").serialize(),
                                success	:function(data){
                                    //console.log(data);
                                    switch(data){
                                        case "insert_success":
                                        Swal.fire
                                        ({
                                            title: "Category Added!",
                                            text: "Product category successfully added!",
                                            type: "success"
                                        }).then(() => {
                                            App.alert({
                                                container: "#generalfeedback",
                                                place: "append",
                                                type: "success",
                                                message: "Product category successfully saved!",
                                                close: true,
                                                reset: true,
                                                focus: true,
                                                closeInSeconds: 10,
                                                icon: "check"
                                            }); 
                                        });                                        
                                        $(".modalspinner").hide();
                                        Ld.init(); 
                                        //reset the whole form
                                        $("#form_sample_9")[0].reset() 
                                        break;
                                        default:                                        
                                        Swal.fire
                                        ({
                                            title: "Error!!!",
                                            text: "Error occured, Kindly contact the system developer for help!",
                                            type: "error"
                                        }).then(() => {
                                            App.alert({
                                                container: "#generalfeedback",
                                                place: "append",
                                                type: "danger",
                                                message: "unknown error occured!",
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
                    })
                     }                    
                }),
                e.validate({
                    errorElement: "span",
                    errorClass: "help-block help-block-error",
                    focusInvalid: !1,
                    ignore: "",
                    rules: {
                        categoryname: { minlength: 3, required: !0 }                        
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
              
        },
         //END: categories  

        //START: add image
        im = function () {
            $('.btn_upload_img').click(function (e) {
                //To prevent form submit after ajax call
                e.preventDefault();
               //reset to empty
               $("#uploads_alert").html("");
                var insImgs = $("#insertimages").val();
                var productcode = $("#product_code_img").val();
                var productid = $("#product_id_img").val().trim();
                var browsedDoc = document.getElementById('inputFileselector_image').files[0];        
                var formDt = new FormData();
                formDt.append("iproductid", productid);
                formDt.append("iproductcode", productcode);
                formDt.append("ibrowsedfile", browsedDoc);
                formDt.append("iImginsert", insImgs);
                
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
                                    container: "#uploads_alert",
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
                                            container: "#uploads_alert",
                                            place: "append",
                                            type: "success",
                                            message: response.message,
                                            close: true,
                                            reset: true,
                                            focus: true,
                                            closeInSeconds: 5,
                                            icon: "check"
                                        });
                                       // $('#inputFileselector_image').val('')      
                                       document.getElementById('inputFileselector_image').value = null;
                                       $(".progress-bar-success").css("background-color", "none");
                                       $(".progress-bar").html(0 + '%');                                
                                        //call all photos uploded and display on a table
                                        ls.init();
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
                                            container: "#uploads_alert",
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
              
        },
        //START: add image    

        //START: upload excel
        xclf = function () {
            $('.btn_upload_excel').click(function (e) {
                //To prevent form submit after ajax call
                e.preventDefault();
               //reset to empty
               $("#uploads_alert").html("");
                var upldXcel = $("#import_excel").val();

                var browsedDoc = document.getElementById('inputFileselector_excel').files[0];        
                var formDt = new FormData();
                formDt.append("ibrowsedfile", browsedDoc);
                formDt.append("upload_xcel_file", upldXcel);
                
                Swal.fire({
                    title: "Upload File?",
                    text: "Proceed to upload the selected excel file!",
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: true,
                    confirmButtonText: "Yes, Upload Excel!",
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
                            url: 'uploadxcelaction.php',                                                       
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
                                    container: "#uploads_alert",
                                    place: "append",
                                    type: "danger",
                                    message: "Unknown error happened!: ",
                                    close: true,
                                    reset: true,
                                    focus: true,
                                    closeInSeconds: 5,
                                    icon: "warning"
                                });
                                console.log(formDt)
                            },
                            success: function (response) {
                                switch (response.status) {
                                case 1:
                                    Swal.fire
                                    ({
                                        title: "File Imported!",
                                        text: "File imported to database successfully!",
                                        type: "success"
                                    }).then(() => {
                                        App.alert({
                                            container: "#uploads_alert",
                                            place: "append",
                                            type: "success",
                                            message: response.message,
                                            close: true,
                                            reset: true,
                                            focus: true,
                                            closeInSeconds: 5,
                                            icon: "check"
                                        });     
                                       document.getElementById('inputFileselector_excel').value = null;
                                       $(".progress-bar-success").css("background-color", "none");
                                       $(".progress-bar").html(0 + '%');                                       
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
                                            container: "#uploads_alert",
                                            place: "append",
                                            type: "danger",
                                            message: response.message,
                                            close: true,
                                            reset: true,
                                            focus: true,
                                            closeInSeconds: 5,
                                            icon: "warning"
                                        });
                                        $("#inputFileselector_excel").focus();
                                        $("#inputFileselector_excel").css("border", "solid 1px red");                                        
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
              
        },
        //START: upload Excel   
        
        //START: edit product
        ep = function () {
            var e = $("#form_edit_product"),
                r = $(".alert-danger", e),
                i = $(".alert-success", e);
                e.on("submit", function () {  
                   // for (var e in CKEDITOR.instances) CKEDITOR.instances[e].updateElement();                 
                  if($("#form_edit_product").valid()){
                      //now call insert function
                    Swal.fire({
                        title: "Are you sure?",
                        text: "Proceed to edit the product?",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: true,
                        confirmButtonText: "Yeah, edit it!",
                        confirmButtonClass: "btn-success",
                        confirmButtonColor: "#008000",
                        position: "center"
                    }).then((result) => {
                        if (result.value) {
                            $(".modalspinner").show();
                            $.ajax({
                                url	:	"functions.php",
                                method:	"POST",
                                data	:$("#form_edit_product").serialize(),
                                success	:function(data){
                                    //console.log(data);
                                    switch(data){
                                        case "insert_success":
                                        Swal.fire
                                        ({
                                            title: "Product Edited!",
                                            text: "Item successfully Edited!",
                                            type: "success"
                                        }).then(() => {
                                            App.alert({
                                                container: "#generalfeedback",
                                                place: "append",
                                                type: "success",
                                                message: "Item edited successfully!",
                                                close: true,
                                                reset: true,
                                                focus: true,
                                                closeInSeconds: 10,
                                                icon: "check"
                                            }); 
                                        });                                        
                                     $(".modalspinner").hide();
                                     Ld.init();
                                     $("#form_edit_product")[0].reset() 
                                        break;
                                        default:                                        
                                        Swal.fire
                                        ({
                                            title: "Error!!!",
                                            text:  "Error occured, kindly contact the system developer for help!",
                                            type: "error"
                                        }).then(() => {
                                            App.alert({
                                                container: "#generalfeedback",
                                                place: "append",
                                                type: "danger",
                                                message: "unknown error occured, only developer can help!",
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
                    })
                     }                    
                }),
                e.validate({
                    errorElement: "span",
                    errorClass: "help-block help-block-error",
                    focusInvalid: !1,
                    ignore: "",
                    rules: {
                        e_pname: { required: !0 }, 
                        e_product_category: {  required: !0 },
                        e_quantity: { required: !0, number: !0 } ,
                        e_product_price: { required: !0, number: !0 },
                        e_describeit: { required: !0 }                        
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
              
        },
         //END: edit product        

         //START: edit offer status
        ofa = function () {
            var e = $("#offer_edit_form_66"),
                r = $(".alert-danger", e),
                i = $(".alert-success", e);
                e.on("submit", function () {                   
                  if($("#offer_edit_form_66").valid()){
                      //now call insert function
                    Swal.fire({
                        title: "Are you sure?",
                        text: "Proceed to edit product?",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: true,
                        confirmButtonText: "Yeah, edit!",
                        confirmButtonClass: "btn-success",
                        confirmButtonColor: "#008000",
                        position: "center"
                    }).then((result) => {
                        if (result.value) {
                            $(".modalspinner").show();
                            $.ajax({
                                url	:	"functions.php",
                                method:	"POST",
                                data	:$("#offer_edit_form_66").serialize(),
                                success	:function(data){
                                    switch(data){
                                        case "insert_success":
                                        Swal.fire
                                        ({
                                            title: "Product Edited!",
                                            text: "Product successfully edited!",
                                            type: "success"
                                        }).then(() => {
                                            App.alert({
                                                container: "#generalfeedback",
                                                place: "append",
                                                type: "success",
                                                message: "Product successfully Edited!",
                                                close: true,
                                                reset: true,
                                                focus: true,
                                                closeInSeconds: 10,
                                                icon: "check"
                                            }); 
                                        });                                        
                                     $(".modalspinner").hide();
                                     fd.init();
                                        break;
                                        default: 
                                        Swal.fire
                                        ({
                                            title: "Error!!!",
                                            text: "Error occured, Kindly contact the system developer for help!",
                                            type: "error"
                                        }).then(() => {
                                            App.alert({
                                                container: "#generalfeedback",
                                                place: "append",
                                                type: "danger",
                                                message: "unknown error occured!",
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
                    })
                     }                    
                }),
                e.validate({
                    errorElement: "span",
                    errorClass: "help-block help-block-error",
                    focusInvalid: !1,
                    ignore: "",
                    rules: {
                        product_feature: { minlength: 5, required: !0 }                        
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
              
        },
        //END: edit offer status classes

        //START: edit subcat
        esubcat = function () {
            var e = $("#form_edit_sub_cat"),
                r = $(".alert-danger", e),
                i = $(".alert-success", e);
                e.on("submit", function () {  
                    // for (var e in CKEDITOR.instances) CKEDITOR.instances[e].updateElement();                 
                    if($("#form_edit_sub_cat").valid()){
                        //now call insert function
                    Swal.fire({
                        title: "Are you sure?",
                        text: "Proceed to edit the sub category?",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: true,
                        confirmButtonText: "Yeah, edit it!",
                        confirmButtonClass: "btn-success",
                        confirmButtonColor: "#008000",
                        position: "center"
                    }).then((result) => {
                        if (result.value) {
                            $(".modalspinner").show();
                            $.ajax({
                                url	:	"functions.php",
                                method:	"POST",
                                data	:$("#form_edit_sub_cat").serialize(),
                                success	:function(data){
                                    //console.log(data);
                                    switch(data){
                                        case "insert_success":
                                        Swal.fire
                                        ({
                                            title: "Sub Category Edited!",
                                            text: "Sub Category successfully Edited!",
                                            type: "success"
                                        }).then(() => {
                                            App.alert({
                                                container: "#generalfeedback",
                                                place: "append",
                                                type: "success",
                                                message: "Item edited successfully!",
                                                close: true,
                                                reset: true,
                                                focus: true,
                                                closeInSeconds: 10,
                                                icon: "check"
                                            }); 
                                        });                                        
                                        $(".modalspinner").hide();
                                        Ld.init();
                                        $("#form_edit_sub_cat")[0].reset() 
                                        break;
                                        default:                                        
                                        Swal.fire
                                        ({
                                            title: "Error!!!",
                                            text: "Error occured, kindly contact the system developer for help!",
                                            type: "error"
                                        }).then(() => {
                                            App.alert({
                                                container: "#generalfeedback",
                                                place: "append",
                                                type: "danger",
                                                message: "unknown error occured, only developer can help!",
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
                    })
                        }                    
                }),
                e.validate({
                    errorElement: "span",
                    errorClass: "help-block help-block-error",
                    focusInvalid: !1,
                    ignore: "",
                    rules: {
                        e_categoryname: { required: !0 }                      
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
                
        },
        //END: edit subcat 

        //START: edit quantity
        eq = function () {
            var e = $("#form_add_product"),
                r = $(".alert-danger", e),
                i = $(".alert-success", e);
                e.on("submit", function () {  
                   // for (var e in CKEDITOR.instances) CKEDITOR.instances[e].updateElement();                 
                  if($("#form_add_product").valid()){
                      //now call insert function
                    Swal.fire({
                        title: "Are you sure?",
                        text: "Proceed to add the items?",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: true,
                        confirmButtonText: "Yeah, add items!",
                        confirmButtonClass: "btn-success",
                        confirmButtonColor: "#008000",
                        position: "center"
                    }).then((result) => {
                        if (result.value) {
                            $(".modalspinner").show();
                            $.ajax({
                                url	:	"functions.php",
                                method:	"POST",
                                data	:$("#form_add_product").serialize(),
                                success	:function(data){
                                    //console.log(data);
                                    switch(data){
                                        case "insert_success":
                                        Swal.fire
                                        ({
                                            title: "Item quantity added!",
                                            text: "Items successfully added!",
                                            type: "success"
                                        }).then(() => {
                                            App.alert({
                                                container: "#generalfeedback",
                                                place: "append",
                                                type: "success",
                                                message: "Items added successfully!",
                                                close: true,
                                                reset: true,
                                                focus: true,
                                                closeInSeconds: 10,
                                                icon: "check"
                                            }); 
                                        });    

                                        //stop load spinner                                    
                                        $(".modalspinner").hide();
                                        //load new quantity
                                        ldQ.init();
                                        //reset quantity input
                                        $("#e_quantity_added").val("");

                                        break;
                                        default:                                        
                                        Swal.fire
                                        ({
                                            title: "Error!!!",
                                            text:  "Error occured, kindly contact the system developer for help!",
                                            type: "error"
                                        }).then(() => {
                                            App.alert({
                                                container: "#generalfeedback",
                                                place: "append",
                                                type: "danger",
                                                message: "unknown error occured, only developer can help!",
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
                    })
                     }                    
                }),
                e.validate({
                    errorElement: "span",
                    errorClass: "help-block help-block-error",
                    focusInvalid: !1,
                    ignore: "",
                    rules: {
                        e_pname: { required: !0 }, 
                        e_quantity: { required: !0, number: !0 } ,
                        e_product_price: { required: !0, number: !0 },
                        e_describeit: { required: !0 } ,
                        e_quantity_added: { required: !0 }                                                
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
              
        },
         //END: edit quantity 

        //START: remove quantity
        rq = function () {
            var e = $("#form_subtract_product"),
                r = $(".alert-danger", e),
                i = $(".alert-success", e);
                e.on("submit", function () {  
                   // for (var e in CKEDITOR.instances) CKEDITOR.instances[e].updateElement();                 
                  if($("#form_subtract_product").valid()){
                      //now call insert function
                    Swal.fire({
                        title: "Are you sure?",
                        text: "Proceed to add the items?",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: true,
                        confirmButtonText: "Yeah, remove items!",
                        confirmButtonClass: "btn-success",
                        confirmButtonColor: "#008000",
                        position: "center"
                    }).then((result) => {
                        if (result.value) {
                            $(".modalspinner").show();
                            $.ajax({
                                url	:	"functions.php",
                                method:	"POST",
                                data	:$("#form_subtract_product").serialize(),
                                success	:function(data){
                                    //console.log(data);
                                    switch(data){
                                        case "insert_success":
                                        Swal.fire
                                        ({
                                            title: "Item quantity removed!",
                                            text: "Items successfully removed!",
                                            type: "success"
                                        }).then(() => {
                                            App.alert({
                                                container: "#generalfeedback",
                                                place: "append",
                                                type: "success",
                                                message: "Items removed successfully!",
                                                close: true,
                                                reset: true,
                                                focus: true,
                                                closeInSeconds: 10,
                                                icon: "check"
                                            }); 
                                        });    
                                        
                                        //stop load spinner                                    
                                        $(".modalspinner").hide();
                                        //load new quantity
                                        ldQRmv.init();
                                        //reset quantity input
                                        $("#e_quantity_removed").val("");

                                        break;
                                        default:                                        
                                        Swal.fire
                                        ({
                                            title: "Error!!!",
                                            text: data, // "Error occured, kindly contact the system developer for help!",
                                            type: "error"
                                        }).then(() => {
                                            App.alert({
                                                container: "#generalfeedback",
                                                place: "append",
                                                type: "danger",
                                                message: data, //"unknown error occured, only developer can help!",
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
                    })
                     }                    
                }),
                e.validate({
                    errorElement: "span",
                    errorClass: "help-block help-block-error",
                    focusInvalid: !1,
                    ignore: "",
                    rules: {
                        e_pname_1: { required: !0 }, 
                        e_product_category_1: {  required: !0 },
                        e_quantity_1: { required: !0, number: !0 } ,
                        e_product_price_1: { required: !0, number: !0 },
                        e_describeit_1: { required: !0 }                        
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
              
        },
        //END: remove quantity 

        //START: set selling price
        sp = function () {
            var e = $("#form_set_product_price"),
                r = $(".alert-danger", e),
                i = $(".alert-success", e);
                e.on("submit", function () {  
                   // for (var e in CKEDITOR.instances) CKEDITOR.instances[e].updateElement();                 
                  if($("#form_set_product_price").valid()){
                      //now call insert function
                    Swal.fire({
                        title: "Are you sure?",
                        text: "Proceed to set selling price?",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: true,
                        confirmButtonText: "Yeah, set price!",
                        confirmButtonClass: "btn-success",
                        confirmButtonColor: "#008000",
                        position: "center"
                    }).then((result) => {
                        if (result.value) {
                            $(".modalspinner").show();
                            $.ajax({
                                url	:	"functions.php",
                                method:	"POST",
                                data	:$("#form_set_product_price").serialize(),
                                success	:function(data){
                                    //console.log(data);
                                    switch(data){
                                        case "insert_success":
                                        Swal.fire
                                        ({
                                            title: "Selling Price Set!",
                                            text: "Selling Price set successfully!",
                                            type: "success"
                                        }).then(() => {
                                            App.alert({
                                                container: "#generalfeedback",
                                                place: "append",
                                                type: "success",
                                                message: "Sellin Price set successfully!",
                                                close: true,
                                                reset: true,
                                                focus: true,
                                                closeInSeconds: 10,
                                                icon: "check"
                                            }); 
                                        });    
                                        
                                        //stop load spinner                                    
                                        $(".modalspinner").hide();
                                        //load new quantity
                                        rsSP.init();
                                        //reset quantity input
                                        $("#e_price_to_sell").val("");

                                        break;
                                        default:                                        
                                        Swal.fire
                                        ({
                                            title: "Error!!!",
                                            text: data, // "Error occured, kindly contact the system developer for help!",
                                            type: "error"
                                        }).then(() => {
                                            App.alert({
                                                container: "#generalfeedback",
                                                place: "append",
                                                type: "danger",
                                                message: data, //"unknown error occured, only developer can help!",
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
                    })
                     }                    
                }),
                e.validate({
                    errorElement: "span",
                    errorClass: "help-block help-block-error",
                    focusInvalid: !1,
                    ignore: "",
                    rules: {
                        e_pname_2: { required: !0 }, 
                        e_quantity_2: { required: !0, number: !0 } ,
                        e_product_price_2: { required: !0, number: !0 },
                        e_describeit_2: { required: !0 } ,
                        e_price_to_sell: { required: !0 }                                                
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
              
        },
         //END: set selling price 

        //Editor
        t = function () {
            jQuery().wysihtml5 && $(".wysihtml5").size() > 0 && $(".wysihtml5").wysihtml5({ stylesheets: ["../assets/global/plugins/bootstrap-wysihtml5/wysiwyg-color.css"] });
        };
    return {
        init: function () {
            t(), e(), r(), i(), f(), c(), im(), ofa(), ep(), esubcat(), eq(), rq(), sp(), xclf();
        },
    };
})();
var Ld = function () { 
    //start: brands list
    p = function() {
        var tl = $("#tbl_brands"),
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
                data: {getbrand:1}
            }).done(function(json) {
                //parse string to JSON                
                var newarr = JSON.parse(json);                
               //console.log("b r a n d s: "+json)
                l.fnClearTable();
                for (var i = 0; i < newarr.length; i++) {
                    l.fnAddData([                       
                        newarr[i].brand_id,
                        newarr[i].brand_name,
                        '<a class="delete_brand" href="">Delete</a>'
                    ]);                    
                }

                //append to edit products brand
                $.each(newarr,
                    function(key, entry) {
                        var opts = $('<option></option>').attr('value', entry.brand_id).text(entry.brand_name);
                        $(opts).appendTo('#e_product_brand');
                });

            });

        tl.on("click",
            ".delete_brand",
            function (tl) {
                tl.preventDefault();
                var i = $(this).parents("tr")[0];

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
                    text: "Proceed to delete "+i.cells[1].innerHTML+" database?",
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: true,
                    confirmButtonText: "Yes, delete brand!",
                    confirmButtonClass: "btn-success",
                    confirmButtonColor: "rgb(197, 28, 36)",
                    position: "center"
                }).then((result) => {
                    if (result.value) {
                    
                    //start ajax call
                    $.ajax({
                        data:  {deletebrand:1, brandid:i.cells[0].innerHTML, delete_rights: delterank},
                        async: true
                    }).done(function (data) {
                            //console.log(data);
                            switch(data){
                                case "delete_success":
                                Swal.fire
                                ({
                                    title: "Brand Deleted!",
                                    text: "Product brand deleted successfully!",
                                    type: "success"
                                }).then(() => {
                                    App.alert({
                                        container: "#generalfeedback",
                                        place: "append",
                                        type: "success",
                                        message: "Product brand deleted successfully!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "check"
                                    }); 
                                });                                        
                            $(".modalspinner").hide();
                            Ld.init();
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
    },
    //end: brands list

    //start: categories list
    g = function() {
        var tl = $("#tbl_category"),
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
                    [0, "desc"]
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
                data: {getcategory:1}
            }).done(function(json) {
                //parse string to JSON                
                var newarr = JSON.parse(json);                
                console.log(newarr)
                l.fnClearTable();
                for (var i = 0; i < newarr.length; i++) {
                    l.fnAddData([                       
                        newarr[i].category_id,
                        newarr[i].category_name,
                        '<a class="edit_sub_cat" href="">Edit</a>',
                        '<a class="delete_cat" href="">Delete</a>'
                    ]);                    
                }
                 //append to edit products category
                 $.each(newarr,
                    function(key, entry) {
                        var opts = $('<option></option>').attr('value', entry.category_id).text(entry.category_name);
                        $(opts).appendTo('#e_product_category');
                });
            });

        //start: delete
        tl.on("click",
            ".delete_cat",
            function (tl) {
                tl.preventDefault();
                var i = $(this).parents("tr")[0];

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
                    text: "Proceed to delete "+i.cells[1].innerHTML+" database?",
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: true,
                    confirmButtonText: "Yes, delete category!",
                    confirmButtonClass: "btn-success",
                    confirmButtonColor: "rgb(197, 28, 36)",
                    position: "center"
                }).then((result) => {
                    if (result.value) {
                    
                    //start ajax call
                    $.ajax({
                        data:  {deletecategory:1, categoryid:i.cells[0].innerHTML, delete_rights:delterank},
                        async: true
                    }).done(function (data) {
                            //console.log(data);
                            switch(data){
                                case "delete_success":
                                Swal.fire
                                ({
                                    title: "Category Deleted!",
                                    text: "Product category deleted successfully!",
                                    type: "success"
                                }).then(() => {
                                    App.alert({
                                        container: "#generalfeedback",
                                        place: "append",
                                        type: "success",
                                        message: "Product category deleted successfully!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 6,
                                        icon: "check"
                                    }); 
                                });                                        
                            $(".modalspinner").hide();
                            Ld.init();
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
                                        message:data,
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
        //end: delete

        //start :edit
        tl.on("click",
        ".edit_sub_cat",
        function (tl) {
            tl.preventDefault();           
            var i = $(this).parents("tr")[0];   
            
            Swal.fire({
                title: "Are you sure?",
                text: "Proceed to edit "+i.cells[1].innerHTML+" sub category?",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: true,
                confirmButtonText: "Yes, edit subcategory!",
                confirmButtonClass: "btn-success",
                confirmButtonColor: "green",
                position: "center"
            }).then((result) => {
                if (result.value) {
                    $(".modalspinner").show();
                    //async call edit sub cat:
                $.ajax({
                    data:  {specificsubcat:1, subcatid:i.cells[0].innerHTML},
                    async: true
                    //dataType:'json'
                }).done(function (data) {
                    $(".modalspinner").hide();
                    //global loader spinner;           

                    //switch divs
                    $('#addcategory').css("display", "none");
                    $('#editsubcategory').css("display", "block");                                  
                    //parse string to JSON                
                    var newarr = JSON.parse(data); 
                    for (var i = 0; i < newarr.length; i++) {
                        //populate the textfields                                                         
                        $('#e_subcat_id').val(newarr[i].category_id )    
                        $('#e_categoryname').val( newarr[i].category_name )               
                    }
                }); 

            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'You cancelled the action!',
                    'error'
                );
            }

            }); 
        });
        //end: edit
    }, 
    //end: categories list

    //start: items list
    o = function() {
        var tl = $("#tbl_all_list"),
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
                data: {getallproducts:1}
            }).done(function(json) {
                //parse string to JSON            

                var newarr = JSON.parse(json); 
                l.fnClearTable();
                //'onerror = "this.onerror = null;this.src = "/jesavi@2021/img/icons/no-image.png"" 
                for (var i = 0; i < newarr.length; i++) {
                    l.fnAddData([                                              
                        newarr[i].product_id,
                        '<a href="/zicco/product_images/'+newarr[i].product_code+'/'+newarr[i].product_image+'" class="fancybox-button" rel="fancybox-button">'+
                        '<img class="imgresize img-responsive" src="/zicco/product_images/'+newarr[i].product_code+'/'+newarr[i].product_image+'" alt="product-img"  onerror="image_error();"  /></a>',
                        newarr[i].product_code,
                        newarr[i].product_name,
                        newarr[i].brand_name,
                        newarr[i].category_name,
                        newarr[i].quantity_in_stock,
                        newarr[i].product_price,
                        newarr[i].date_edited,
                        newarr[i].first_name,
                        '<i class="fas fa-edit"></i>&nbsp;<a class="edit_product" href="">Edit Product</a>',
                        '<i class="fas fa-trash" style="color:red"></i>&nbsp<a class="delete_product" href="">Delete</a>'
                    ]);                    
                }
            });
        tl.on("click",
            ".edit_product",
            function (tl) {
                tl.preventDefault();
                var i = $(this).parents("tr")[0];
                //global loader spinner;            

                  //start ajax call
                  $.ajax({
                    data:  {specificproduct:1, productid:i.cells[0].innerHTML},
                    async: true
                    //dataType:'json'
                }).done(function (data) {
                    $(".modalspinner").hide();
                    //switch divs
                    $('#addstock').css("display", "none");
                    $('#editproduct').css("display", "block");
                    var ppcode;                   
                       //parse string to JSON                
                    var newarr = JSON.parse(data); 
                    console.log("testdata for spec prod "+data)
                    for (var i = 0; i < newarr.length; i++) {

                        //populate the textfields 
                        $('#edit_product_image').attr("src", "/zicco/product_images/"+newarr[i].product_image); 
                        $('#edit_product_image').attr("onerror", "image_error()");                                           
                        $('#e_product_id').val(newarr[i].product_id )  
                        $('#e_pname').val( newarr[i].product_name )
                        $('#e_product_brand').val( newarr[i].brand_id ) .change()
                        $('#e_product_category').val(parseInt(newarr[i].category_id)).change()                  
                        $('#e_brandavailable').val( newarr[i].availability ).change()                      
                        $('#e_describeit').val( newarr[i].description )
                        $('#e_quantity').val( newarr[i].quantity_in_stock )
                        $('#e_product_price').val( newarr[i].product_price )                         
                    }                    
                });                    
                          
            });

        tl.on("click",
        ".delete_product",
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
                text: "Proceed to delete "+b.cells[2].innerHTML+" from "+b.cells[3].innerHTML+ "?",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: true,
                confirmButtonText: "Yes, go delete!",
                confirmButtonClass: "btn-success",
                confirmButtonColor: "rgb(197, 28, 36)",
                position: "center"
            }).then((result) => {
                if (result.value) {

                //start ajax call
                $.ajax({
                    data:  {deleteproduct:1, product_id:b.cells[0].innerHTML, delete_rights:delterank},
                    async: true
                }).done(function (data) {
                    switch(data){
                        case "delete_success":
                        Swal.fire
                        ({
                            title: "Product Deleted!",
                            text: "Product removed successfully!",
                            type: "success"
                        }).then(() => {
                            App.alert({
                                container: "#generalfeedback",
                                place: "append",
                                type: "success",
                                message: "Product removed successfully!",
                                close: true,
                                reset: true,
                                focus: true,
                                closeInSeconds: 6,
                                icon: "check"
                            }); 
                        });                                        
                    $(".modalspinner").hide();
                   //call ajax to populate table here.....
                   Ld.init();
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

    },   
    //end: items list

    //start: add/remove stock list
    o1 = function() {
        var tl = $("#tbl_all_list_st_1"),
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
                data: {getallproducts:1}
            }).done(function(json) {
                //parse string to JSON            

                var newarr = JSON.parse(json); 
                l.fnClearTable();
                //'onerror = "this.onerror = null;this.src = "/jesavi@2021/img/icons/no-image.png"" 
                for (var i = 0; i < newarr.length; i++) {
                    l.fnAddData([                                              
                        newarr[i].product_id,
                        '<a href="/zicco/product_images/'+newarr[i].product_code+'/'+newarr[i].product_image+'" class="fancybox-button" rel="fancybox-button">'+
                        '<img class="imgresize img-responsive" src="/zicco/product_images/'+newarr[i].product_code+'/'+newarr[i].product_image+'" alt="product-img"  onerror="image_error();"  /></a>',
                        newarr[i].product_code,
                        newarr[i].product_name,
                        newarr[i].category_name,
                        newarr[i].quantity_in_stock,
                        newarr[i].product_price,
                        newarr[i].date_edited,
                        newarr[i].first_name,
                        '<i class="fas fa-usd"></i>&nbsp;<a class="set_price" href="">Setup Selling Price</a>',
                        '<i class="fas fa-edit"></i>&nbsp;<a class="add_stock" href="">Add Stock Product</a>',
                        '<i class="fas fa-money" style="color:red"></i>&nbsp<a class="remove_stock" href="">Record Sale </a>'
                    ]);                    
                }
            });
        
            tl.on("click",
            ".set_price",
            function (tl) {
                tl.preventDefault();
                var i = $(this).parents("tr")[0];
                //global loader spinner;            

                  //start ajax call
                  $.ajax({
                    data:  {specificproduct:1, productid:i.cells[0].innerHTML},
                    async: true
                    //dataType:'json'
                }).done(function (data) {
                    $(".modalspinner").hide();
                    //switch divs
                    $('#addeditstock').css("display", "none");
                    $('#setstockprice').css("display", "block");
                    var ppcode;                   
                       //parse string to JSON                
                    var newarr = JSON.parse(data); 
                    for (var i = 0; i < newarr.length; i++) {

                        //populate the textfields 
                        $('#edit_product_image_2').attr("src", "/zicco/product_images/"+newarr[i].product_image); 
                        $('#edit_product_image_2').attr("onerror", "image_error()");                                           
                        $('#e_product_id_2').val(newarr[i].product_id )  
                        $('#e_pname_2').val( newarr[i].product_name )
                        $('#e_brandavailable_2').val( newarr[i].availability ).change()                      
                        $('#e_describeit_2').val( newarr[i].description )
                        $('#e_quantity_2').val( newarr[i].quantity_in_stock )
                        $('#e_product_price_2').val( newarr[i].product_price )                         
                    }
                });                    
                          
            });

        tl.on("click",
            ".add_stock",
            function (tl) {
                tl.preventDefault();
                var i = $(this).parents("tr")[0];
                //global loader spinner;            

                  //start ajax call
                  $.ajax({
                    data:  {specificproduct:1, productid:i.cells[0].innerHTML},
                    async: true
                    //dataType:'json'
                }).done(function (data) {
                    $(".modalspinner").hide();
                    //switch divs
                    $('#addeditstock').css("display", "none");
                    $('#additemstock').css("display", "block");
                    var ppcode;                   
                       //parse string to JSON                
                    var newarr = JSON.parse(data); 
                    for (var i = 0; i < newarr.length; i++) {

                        //populate the textfields 
                        $('#edit_product_image').attr("src", "/zicco/product_images/"+newarr[i].product_image); 
                        $('#edit_product_image').attr("onerror", "image_error()");                                           
                        $('#e_product_id').val(newarr[i].product_id )  
                        $('#e_pname').val( newarr[i].product_name )
                        $('#e_product_category').val(newarr[i].category_id).change() 
                        $('#e_product_brand').val( newarr[i].brand_id ) .change()
                        $('#e_brandavailable').val( newarr[i].availability ).change()                      
                        $('#e_describeit').val( newarr[i].description )
                        $('#e_quantity').val( newarr[i].quantity_in_stock )
                        $('#e_product_price').val( newarr[i].product_price )                         
                    }
                });                    
                          
            });

        tl.on("click",
        ".remove_stock",
        function (tl) {
            tl.preventDefault();
            var i = $(this).parents("tr")[0];
            //global loader spinner;            

              //start ajax call
              $.ajax({
                data:  {specificproduct:1, productid:i.cells[0].innerHTML},
                async: true
                //dataType:'json'
            }).done(function (data) {
                $(".modalspinner").hide();
                //switch divs
                $('#addeditstock').css("display", "none");
                $('#subtractitemstock').css("display", "block");
                var ppcode;                   
                   //parse string to JSON                
                var newarr = JSON.parse(data); 
                for (var i = 0; i < newarr.length; i++) {

                    //populate the textfields 
                    $('#edit_product_image_1').attr("src", "/zicco/product_images/"+newarr[i].product_image); 
                    $('#edit_product_image_1').attr("onerror", "image_error()");                                           
                    $('#e_product_id_1').val(newarr[i].product_id )  
                    $('#e_pname_1').val( newarr[i].product_name )
                    $('#e_brandavailable_1').val( newarr[i].availability ).change()                      
                    $('#e_describeit_1').val( newarr[i].description )
                    $('#e_quantity_1').val( newarr[i].quantity_in_stock )
                    $('#e_product_price_1').val( newarr[i].product_price )                         
                }
            });     
        });

    },
    //end: add/remove stock list

    //start:dashboard displays
    //total inventory
    tiv = function(){
        $.ajax({
            data: {gettotalinventory:1}
        }).done(function(json) {
            //parse string to JSON                
            var newarr = JSON.parse(json);                
            console.log(newarr)       
            for (var i = 0; i < newarr.length; i++) {
                $(".total_inventory").text( newarr[i].total_items)  
                $(".total_i").attr("data-value", newarr[i].total_items)                             
            }            
        });
    },
    //total transactions
    ttrx = function(){
        $.ajax({
            data: {gettotaltransactioncost:1}
        }).done(function(json) {
            //parse string to JSON                
            var newarr = JSON.parse(json);                
            console.log(newarr)       
            for (var i = 0; i < newarr.length; i++) {
                $(".total_trxs").text(formatNumber(Number(newarr[i].grand_totals).toFixed(2)) ) 
                $(".total_trn").attr("data-value", parseInt(newarr[i].grand_totals))                         
            }            
        });
    },

    //count categories stocked
    tct = function(){
        $.ajax({
            data: {gettotalcategories:1}
        }).done(function(json) {
            //parse string to JSON                
            var newarr = JSON.parse(json);                
            console.log(newarr)       
            for (var i = 0; i < newarr.length; i++) {
                $(".no_of_categories").text(newarr[i].total_cats) 
                $(".cat_count").attr("data-value", parseInt(newarr[i].total_cats))                         
            }            
        });
    },
    //end: dashboard displays

    //start: transactions lists
    trx_list = function() {
        var tl = $("#tbl_all_transactions_list"),
            l = tl.dataTable({
                lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
                pageLength: 5,
                language: { lengthMenu: " _MENU_ records" },

                buttons: [
                    { extend: "print", className: "btn dark btn-outline", title: 'Inventory Transactions List',  orientation: 'landscape', filename: 'Inventory Transactions',  pageSize: 'LEGAL', footer: true  },
                    { extend: "copy", className: "btn red btn-outline", title: 'Inventory Transactions List',  orientation: 'landscape', filename: 'Inventory Transactions',  pageSize: 'LEGAL', footer: true    },
                    { extend: "pdf", className: "btn green btn-outline", title: 'Inventory Transactions List',  orientation: 'landscape', filename: 'Inventory Transactions',  pageSize: 'LEGAL', footer: true  },
                    { extend: "excel", className: "btn yellow btn-outline", title: 'Inventory Transactions List',  orientation: 'landscape', filename: 'Inventory Transactions',  pageSize: 'LEGAL', footer: true  },
                    { extend: "csv", className: "btn purple btn-outline", title: 'Inventory Transactions List',  orientation: 'landscape', filename: 'Inventory Transactions',  pageSize: 'LEGAL', footer: true  },
                    { extend: "colvis", className: "btn dark btn-outline", text: "Columns" }                   
                ],
                columnDefs: [{orderable: !0,  defaultContent: "-", targets: "_all"  },
                    {  searchable: !0, targets: "_all"  }
                ],
                order: [
                    [0, "asc"]
                ],
                footerCallback: function (e, t, a, r, o) {
                    var n = this.api(),
                        s = function (e) {
                            return "string" == typeof e ? 1 * e.replace(/[\$,]/g, "") : "number" == typeof e ? e : 0;
                        };
                    (total = n
                        .column(7)
                        .data()
                        .reduce(function (e, t) {
                            return s(e) + s(t);
                        }, 0)),
                        (pageTotal = n
                            .column(7, { page: "current" })
                            .data()
                            .reduce(function (e, t) {
                                return s(e) + s(t);
                            }, 0))
                        ,
                        $(n.column(7).footer()).html("KES: " + formatNumber(Number(pageTotal).toFixed(2))  + " ( Grand Total: " +formatNumber(Number(total).toFixed(2))   + ")");
                },
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
                data: {getalladmtransactions:1}
            }).done(function(json) {

                //parse string to JSON 
                var newarr = JSON.parse(json); 
                console.log(newarr)
                l.fnClearTable();
                var n = 1;               
                for (var i = 0; i < newarr.length; i++) {
                    l.fnAddData([   
                        n++,   
                        newarr[i].receipt_no,
                        newarr[i].product_name,
                        newarr[i].trx_type,  
                        new Date(newarr[i].effective_date).toLocaleDateString('en-US',
                        { day: '2-digit', month: '2-digit', year: 'numeric' }),                       
                        newarr[i].first_name,
                        newarr[i].quantity_effected,
                        formatNumber(Number(newarr[i].effected_cost).toFixed(2))                                                  
                    ]);                    
                }
            });

            $("#tbl_transactions_tools > li > a.tool-action").on("click", function () {
                var e = $(this).attr("data-action");
                l.DataTable().button(e).trigger();
            });

    },

    //end: transactions lists 

    //start: test encryption
    enc = function(){
        $.ajax({
            data: {encryptdata:1}
        }).done(function(json) {
            //parse string to JSON 
            var newarr = JSON.parse(json); 
            console.log("encrypted data: "+newarr)                     
        
        });
    }, 
    //end: test encryption

    //start: test decryption
    dec = function(){
        $.ajax({
            data: {decryptdata:1}
        }).done(function(json) {
            //parse string to JSON 
            var newarr = JSON.parse(json); 
            console.log("decrypted data: "+json.toString())                     
        
        });
    },
     //end: test decryption

    //all inventory list
    il = function(){
        var tl = $("#tbl_all_inventory_list"),
        k = tl.dataTable({
            lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
            pageLength: 5,
            language: { lengthMenu: " _MENU_ records" },
            buttons: [
                { extend: "print", className: "btn dark btn-outline", title: 'Inventory List',  orientation: 'landscape', filename: 'Inventory List',  pageSize: 'LEGAL', footer: false  },
                { extend: "copy", className: "btn red btn-outline", title: 'Inventory List',  orientation: 'landscape', filename: 'Inventory List',  pageSize: 'LEGAL', footer: false    },
                { extend: "pdf", className: "btn green btn-outline", title: 'Inventory List',  orientation: 'landscape', filename: 'Inventory List',  pageSize: 'LEGAL', footer: false  },
                { extend: "excel", className: "btn yellow btn-outline", title: 'Inventory List',  orientation: 'landscape', filename: 'Inventory List',  pageSize: 'LEGAL', footer: false  },
                { extend: "csv", className: "btn purple btn-outline", title: 'Inventory List',  orientation: 'landscape', filename: 'Inventory List',  pageSize: 'LEGAL', footer: false  },
                { extend: "colvis", className: "btn dark btn-outline", text: "Columns" }                   
            ],
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
            data: {getallproducts:1}
        }).done(function(json) {
            //parse string to JSON            

            var newarr = JSON.parse(json); 
            k.fnClearTable();
            //'onerror = "this.onerror = null;this.src = "/jesavi@2021/img/icons/no-image.png"" 
            for (var i = 0; i < newarr.length; i++) {
                k.fnAddData([
                    '<a href="/zicco/product_images/'+newarr[i].product_code+'/'+newarr[i].product_image+'" class="fancybox-button" rel="fancybox-button">'+
                    '<img class="imgresize img-responsive" src="/zicco/product_images/'+newarr[i].product_code+'/'+newarr[i].product_image+'" alt="product-img"  onerror="image_error();"  /></a>',                    
                    newarr[i].product_name,
                    newarr[i].brand_name,
                    newarr[i].category_name,
                    newarr[i].quantity_in_stock,
                    newarr[i].product_price
                ]);                    
            }
        });

        $("#tbl_inventory_tools > li > a.tool-action").on("click", function () {
            var e = $(this).attr("data-action");
            k.DataTable().button(e).trigger();
        });
    };
    //end: inventory list

    //start::print inventory list
    piL = function(){
        var tl = $("#tbl_print_inventory_list"),
        k = tl.dataTable({
            lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
            pageLength: 5,
            language: { lengthMenu: " _MENU_ records" },
            buttons: [
                { extend: "pdf", className: "btn green btn-outline", title: 'Items List',  fontSize: 12, orientation: 'portrait', filename: 'Items List',  pageSize: 'LEGAL', footer: false  },
                { extend: "excel", className: "btn green btn-outline", title: 'Items List',  fontSize: 12, orientation: 'portrait', filename: 'Items List',  pageSize: 'LEGAL', footer: false  },
           
            ],
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
            data: {getallproducts:1}
        }).done(function(json) {
            //parse string to JSON            

            var newarr = JSON.parse(json); 
            k.fnClearTable();
            for (var i = 0; i < newarr.length; i++) {
                k.fnAddData([
                    newarr[i].product_id,
                    newarr[i].product_name,
                    newarr[i].product_price
                ]);                    
            }
        });

        $("#tbl_p_inventory_tools > li > a.tool-action").on("click", function () {
            var e = $(this).attr("data-action");
            k.DataTable().button(e).trigger();
        });
    };
    //end::print inventory list

    return {
        init: function () {
            p(), g(), o(), o1(), trx_list(), tiv(), ttrx(), tct(),enc(), dec(), il(), piL();
        }
    }
}();

var ldQ = function(){
    
    lq = function(){
        //global loader spinner;
        //start ajax call
        $.ajax({
        data:  {specificproduct:1, productid:$('#e_product_id').val() },
        async: true
        //dataType:'json'
    }).done(function (data) {
        $(".modalspinner").hide();
            //parse string to JSON                
        var newarr = JSON.parse(data); 
        for (var i = 0; i < newarr.length; i++) {
            //populate the textfields                   
            $('#e_quantity').val( newarr[i].quantity_in_stock ) 
            $('#e_quantity_1').val( newarr[i].quantity_in_stock )                        
        }
    });       
    }
    return{
        init: function(){
            lq();
        }
    }
}();

var ldQRmv = function(){
    
    lqR = function(){
        //global loader spinner;
        //start ajax call
        $.ajax({
        data:  {specificproduct:1, productid:$('#e_product_id_1').val() },
        async: true
        //dataType:'json'
    }).done(function (data) {
        $(".modalspinner").hide();
            //parse string to JSON                
        var newarr = JSON.parse(data); 
        for (var i = 0; i < newarr.length; i++) {
            //populate the textfields 
            $('#e_quantity_1').val( newarr[i].quantity_in_stock )                        
        }
    });       
    }
    return{
        init: function(){
            lqR();
        }
    }
}();


var rsSP = function(){    
    lqP = function(){
        //global loader spinner;
        //start ajax call
        $.ajax({
        data:  {specificproduct:1, productid:$('#e_product_id_2').val() },
        async: true
        //dataType:'json'
    }).done(function (data) {
        $(".modalspinner").hide();
            //parse string to JSON                
        var newarr = JSON.parse(data); 
        for (var i = 0; i < newarr.length; i++) {
            //populate the textfields 
            $('#e_product_price_2').val( newarr[i].product_price )                        
        }
    });       
    }
    return{
        init: function(){
            lqP();
        }
    }
}();


var fd = function () {
    b = function() {
        var tl = $("#tbl_key_features"),
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
               // $("#form_sample_11").serialize()
               data: {getproductfeatures:1,productcode:$("#product_code").val() }
            }).done(function(json) {
                //parse string to JSON                
                var newarr = JSON.parse(json); 
                l.fnClearTable();
                for (var i = 0; i < newarr.length; i++) {
                    l.fnAddData([                       
                        newarr[i].f_id,
                        newarr[i].feature_description,
                        '<a class="delete_feature" href="">Delete</a>'
                    ]);                    
                }
            });       
    };
    return {
        init: function () {
            b();
        }
    }
}();

var ls = function () {
  //images
    f = function() {
        //list photos 
        $.ajaxSetup({
            global: false,
            type: "POST",
            url: "fileuploads.php",
            beforeSend: function () {
                $(".modalspinner").show();
            },
            complete: function () {
                $(".modalspinner").hide();
            }
        });
        $.ajax({
            data: {getfetch_files:1,productcode:$("#product_code_img").val() }
        }).done(function(json) {
            //list files in a table here
            $('#image_list').html(json);
        }); 
    };

    //delete image from folder
    d = function() {       
    $("body").delegate("#tbl_imgs .remove_file", "click", function (event) {
        var fpath = $(this).attr("id");
        var delterank = $('#user_rank').val().trim();  

        $.ajaxSetup({
            global: false,
            type: "POST",
            url: "fileuploads.php",
            beforeSend: function () {
                $(".modalspinner").show();
            },
            complete: function () {
                $(".modalspinner").hide();
            }
        });
           //async call delete:
           Swal.fire({
            title: "Are you sure?",
            text: "Proceed to delete the Image?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, go delete!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "rgb(197, 28, 36)",
            position: "center"
        }).then((result) => {
            if (result.value) {
            //start ajax call
            $.ajax({
                data:  {delete_file:1, filePath:fpath, delete_rights:delterank},
                async: true
            }).done(function (data) {
                switch(data){
                    case "delete_success":
                    Swal.fire
                    ({
                        title: "Image Deleted!",
                        text: "Image removed successfully!",
                        type: "success"
                    }).then(() => {
                        App.alert({
                            container: "#img_feedback",
                            place: "append",
                            type: "success",
                            message: "Image removed successfully!",
                            close: true,
                            reset: true,
                            focus: true,
                            closeInSeconds: 6,
                            icon: "check"
                        }); 
                    });                                        
                $(".modalspinner").hide();
               //call ajax to populate table here.....
               ls.init();
                break;
                default:                                        
                    Swal.fire
                    ({
                        title: "Error!!!",
                        text: data,
                        type: "error"
                    }).then(() => {
                        App.alert({
                            container: "#img_feedback",
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

    };
    return {
        init: function () {
            f(), d();
        }
    }
}();

  //START: general back button
$(".backtoinventory").click(function () {
      //refresh datafetch do not reload page
    WinRld(); 
    Ld.init();
    $('#addstock').css("display", "block");
    $('#addsizes').css("display", "none");
    $('#addclass').css("display", "none");
    $('#addcategory').css("display", "none");
    $('#addbrands').css("display", "none");
    $('#editstock').css("display", "none");
    $('#addprfeatures').css("display", "none");
    $('#addphotos').css("display", "none");
    $('#editproduct').css("display", "none");   
    
});

//START: general back button for Stock
$(".backtoinventory_1").click(function () {
    //refresh datafetch do not reload page
  WinRld(); 
  Ld.init();
  $('#addeditstock').css("display", "block");
  $('#additemstock').css("display", "none");
  $('#subtractitemstock').css("display", "none");
  $('#setstockprice').css("display", "none");  
});

 //START: general back button to images
 $(".backtoinventory_img").click(function () {
    //refresh datafetch do not reload page
    $("#form_4_images")[0].reset();    
    $('#addprfeatures').css("display", "block");
    $('#addphotos').css("display", "none");
    WinRld();  
    Ld.init(); 
});

$(".back_2_sub_cat").click(function () {    
    //switch divs
    $('#addcategory').css("display", "block");
    $('#editsubcategory').css("display", "none");  
   
    //refresh datafetch do not reload page 
    WinRld();  
    Ld.init();
});

$(".back_2_classes").click(function () {   
    //switch divs
    $('#addclass').css("display", "block");
    $('#editclass').css("display", "none"); 
     //refresh datafetch do not reload page
     WinRld();     
     Ld.init();  
  
});
 //END: general back buttons

 //format insert comma after 3 digits
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

function WinRld() {    
    window.location.reload();
  } 

 //Start : deliver order button
 $("body").delegate(".order_buttons .btn_deliver_order", "click", function (event) {

    var order_ref_id = $('#id_order_ref').val();
    var user_ref_id = $('#id_user_ref').val();
    
   // alert("am clicked, confirm!: "+order_ref_id) 

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
       //async call delete:
       Swal.fire({
        title: "Are you sure?",
        text: "Proceed to deliver this customer order #"+order_ref_id+ "?",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: true,
        confirmButtonText: "Yes, Start delivery process!",
        confirmButtonClass: "btn-success",
        confirmButtonColor: "rgb(197, 28, 36)",
        position: "center"
    }).then((result) => {
        if (result.value) {
        //start ajax call
        $.ajax({
            data:  {orderDeliver:1, order_ID:order_ref_id, user_id:user_ref_id},
            async: true
        }).done(function (data) {
            switch(data){
                case "confirm_success":            
                Swal.fire
                ({
                    title: "Order Delivery Started!",
                    text: "Customer Order in Delivery!",
                    type: "success"
                }).then(() => {
                    App.alert({
                        container: "#orderf_feedback",
                        place: "append",
                        type: "success",
                        message: "Order delivery started and an SMS sent to the customer successfully!",
                        close: true,
                        reset: true,
                        focus: true,
                        closeInSeconds: 6,
                        icon: "check"
                    });                   
                 });

                //reload the window
                WinRld(); 
                $(".modalspinner").hide();
                //call ajax to populate table here.....
                ls.init();        
            break;
            default:                                        
                Swal.fire
                ({
                    title: "Error!!!",
                    text: data,
                    type: "error"
                }).then(() => {
                    App.alert({
                        container: "#orderf_feedback",
                        place: "append",
                        type: "danger",
                        message:"Error while delivering the order!",
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
//end: deliver order

 //Start : confirm order button
 $("body").delegate(".order_buttons .btn_confirm_order", "click", function (event) {

    var order_ref_id = $('#id_order_ref').val();
    var user_ref_id = $('#id_user_ref').val();
    
   // alert("am clicked, confirm!: "+order_ref_id) 

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
       //async call delete:
       Swal.fire({
        title: "Are you sure?",
        text: "Proceed to confirm this customer order #"+order_ref_id+ "?",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: true,
        confirmButtonText: "Yes, Confirm!",
        confirmButtonClass: "btn-success",
        confirmButtonColor: "rgb(197, 28, 36)",
        position: "center"
    }).then((result) => {
        if (result.value) {
        //start ajax call
        $.ajax({
            data:  {orderConfirm:1, order_ID:order_ref_id, user_id:user_ref_id},
            async: true
        }).done(function (data) {
            switch(data){
                case "confirm_success":
                Swal.fire
                ({
                    title: "Order Confirmed!",
                    text: "Customer Order Confirmed successfully!",
                    type: "success"
                }).then(() => {
                    App.alert({
                        container: "#orderf_feedback",
                        place: "append",
                        type: "success",
                        message: "Order confirmed and an SMS sent to the customer successfully!",
                        close: true,
                        reset: true,
                        focus: true,
                        closeInSeconds: 6,
                        icon: "check"
                    }); 
                });

                //reload the window
                WinRld();                                                       
                $(".modalspinner").hide();
                //call ajax to populate table here.....
                ls.init();
            break;
            default:                                        
                Swal.fire
                ({
                    title: "Error!!!",
                    text: data,
                    type: "error"
                }).then(() => {
                    App.alert({
                        container: "#orderf_feedback",
                        place: "append",
                        type: "danger",
                        message:"Error while confirming the order!",
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
//end: confirm order

 //Start : complete delivery order button
 $("body").delegate(".order_buttons .btn_confirm_order_delivery", "click", function (event) {

    var order_ref_id = $('#id_order_ref').val();
    var user_ref_id = $('#id_user_ref').val();
    
   // alert("am clicked, confirm!: "+order_ref_id) 

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
       //async call delete:
       Swal.fire({
        title: "Are you sure?",
        text: "Confirm Delivery for this customer order #"+order_ref_id+ "?",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: true,
        confirmButtonText: "Yes, fully delivered!",
        confirmButtonClass: "btn-success",
        confirmButtonColor: "rgb(197, 28, 36)",
        position: "center"
    }).then((result) => {
        if (result.value) {
        //start ajax call
        $.ajax({
            data:  {orderfullyDelivered:1, order_ID:order_ref_id, user_id:user_ref_id},
            async: true
        }).done(function (data) {
            switch(data){
                case "confirm_success":
                Swal.fire
                ({
                    title: "Order Confirmed!",
                    text: "Customer Order Fully Delivered successfully!",
                    type: "success"
                }).then(() => {
                    App.alert({
                        container: "#orderf_feedback",
                        place: "append",
                        type: "success",
                        message: "Order delivery and an SMS sent to the customer successfully!",
                        close: true,
                        reset: true,
                        focus: true,
                        closeInSeconds: 6,
                        icon: "check"
                    }); 
                });

                //reload the window
                WinRld();                                                       
                $(".modalspinner").hide();
                //call ajax to populate table here.....
                ls.init();
            break;
            default:                                        
                Swal.fire
                ({
                    title: "Error!!!",
                    text: data,
                    type: "error"
                }).then(() => {
                    App.alert({
                        container: "#orderf_feedback",
                        place: "append",
                        type: "danger",
                        message:"Error while confirming the order!",
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
//end: complete delivery order button

 //Start : copy on clipboard
 $("body").delegate("#form_4_images #copytopaste", "click", function (event) {  
  
    /* Get the text field */
   var copyText = document.getElementById("product_codedis_img");
 
   /* Select the text field */
   copyText.select();
   
   //copyText.setSelectionRange(0, 99999); /*For mobile devices*/
 
   /* Copy the text inside the text field */
   document.execCommand("copy");
 
   /* Alert the copied text */
   //alert("Copied the text: " + copyText.value);
 
 });
 //end: copy to clipboard

jQuery(document).ready(function () {    
    FormValidation.init(),Ld.init();
});
