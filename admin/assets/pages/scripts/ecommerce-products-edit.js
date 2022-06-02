var EcommerceProductsEdit = (function () {
    var e = function () {
            var e = new plupload.Uploader({
                runtimes: "html5,flash,silverlight,html4",
                browse_button: document.getElementById("tab_images_uploader_pickfiles"),
                container: document.getElementById("tab_images_uploader_container"),
                url: "./../assets/plugins/plupload/examples/upload.php",
                filters: {
                    max_file_size: "10mb",
                    mime_types: [
                        { title: "Image files", extensions: "jpg,gif,png" },
                        { title: "Zip files", extensions: "zip" },
                    ],
                },
                flash_swf_url: "./../assets/plugins/plupload/js/Moxie.swf",
                silverlight_xap_url: "./../assets/plugins/plupload/js/Moxie.xap",
                init: {
                    PostInit: function () {
                        $("#tab_images_uploader_filelist").html(""),
                            $("#tab_images_uploader_uploadfiles").click(function () {
                                return e.start(), !1;
                            }),
                            $("#tab_images_uploader_filelist").on("click", ".added-files .remove", function () {
                                e.removeFile($(this).parent(".added-files").attr("id")), $(this).parent(".added-files").remove();
                            });
                    },
                    FilesAdded: function (e, a) {
                        plupload.each(a, function (e) {
                            $("#tab_images_uploader_filelist").append(
                                '<div class="alert alert-warning added-files" id="uploaded_file_' +
                                    e.id +
                                    '">' +
                                    e.name +
                                    "(" +
                                    plupload.formatSize(e.size) +
                                    ') <span class="status label label-info"></span>&nbsp;<a href="javascript:;" style="margin-top:-5px" class="remove pull-right btn btn-sm red"><i class="fa fa-times"></i> remove</a></div>'
                            );
                        });
                    },
                   
                }
            });
            e.init();
        }
    return {
        init: function () {
            l(), e(), a(), t();
        },
    };
})();
jQuery(document).ready(function () {
    EcommerceProductsEdit.init();
});
