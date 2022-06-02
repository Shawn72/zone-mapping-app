var ComponentsBootstrapMaxlength = function () {
    var a = function () {
        $("#maxlength_defaultconfig").maxlength({
            limitReachedClass: "label label-danger"
        }), $("#maxlength_thresholdconfig").maxlength({
            limitReachedClass: "label label-danger",
            threshold: 20
        }), $("#maxlength_alloptions").maxlength({
            alwaysShow: !0,
            warningClass: "label label-success",
            limitReachedClass: "label label-danger",
            separator: " out of ",
            preText: "You typed ",
            postText: " chars available.",
            validate: !0
        }),
              
        //add custom codes here for ecommerce
        $("#product_feature").maxlength({
            limitReachedClass: "label label-danger",
            alwaysShow: !0
        })
    };
    return {
        init: function () {
            a();
        }
    }
}();
jQuery(document).ready(function () {
    ComponentsBootstrapMaxlength.init()
});