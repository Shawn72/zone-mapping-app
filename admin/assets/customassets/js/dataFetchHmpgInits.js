'use-strict';
var Ld = function () {
    var f = function() {
        var tl = $("#tbl_unit_sizes"),
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
                data: {getunitsize:1}
            }).done(function(json) {
                //parse string to JSON                
                var newarr = JSON.parse(json);                
               // console.log(newarr.length)
                l.fnClearTable();
                for (var i = 0; i < newarr.length; i++) {
                    l.fnAddData([                       
                        newarr[i].size_id,
                        newarr[i].size_description,
                        '<a class="delete_size" href="">Delete</a>'
                    ]);                    
                }
            });
        tl.on("click",
            ".delete_size",
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
                //async call delete:
                $.ajax({
                    data:  {deletesize:1, sizeid:i.cells[0].innerHTML},
                    async: true
                }).done(function (data) {
                        //console.log(data);
                        switch(data){
                            case "delete_success":
                            Swal.fire
                            ({
                                title: "Size Deleted!",
                                text: "Unit size deleted successfully!",
                                type: "success"
                            }).then(() => {
                                App.alert({
                                    container: "#generalfeedback",
                                    place: "append",
                                    type: "success",
                                    message: "Unit size deleted successfully!",
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
                    
                });

                ////end ajax call here
            }

          );
    };
  
    return {
        init: function () {
            f();
        }
    }
}();
jQuery(document).ready(function () {
    Ld.init();
});