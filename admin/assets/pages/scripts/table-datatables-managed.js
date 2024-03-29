﻿var TableDatatablesManaged = (function () {
    var e = function () {
            var e = $("#sample_1");
            e.dataTable({
                language: {
                    aria: { sortAscending: ": activate to sort column ascending", sortDescending: ": activate to sort column descending" },
                    emptyTable: "No data available in table",
                    info: "Showing _START_ to _END_ of _TOTAL_ records",
                    infoEmpty: "No records found",
                    infoFiltered: "(filtered1 from _MAX_ total records)",
                    lengthMenu: "Show _MENU_",
                    search: "Search:",
                    zeroRecords: "No matching records found",
                    paginate: { previous: "Prev", next: "Next", last: "Last", first: "First" },
                },
                bStateSave: !0,
                lengthMenu: [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"],
                ],
                pageLength: 5,
                pagingType: "bootstrap_full_number",
                columnDefs: [{ orderable: !1, targets: [0] }, { searchable: !1, targets: [0] }, { className: "dt-right" }],
                order: [[1, "asc"]],
            });
            jQuery("#sample_1_wrapper");
            e.find(".group-checkable").change(function () {
                var e = jQuery(this).attr("data-set"),
                    t = jQuery(this).is(":checked");
                jQuery(e).each(function () {
                    t ? ($(this).prop("checked", !0), $(this).parents("tr").addClass("active")) : ($(this).prop("checked", !1), $(this).parents("tr").removeClass("active"));
                });
            }),
                e.on("change", "tbody tr .checkboxes", function () {
                    $(this).parents("tr").toggleClass("active");
                });
        },
        t = function () {
            var e = $("#sample_1_2");
            e.dataTable({
                language: {
                    aria: { sortAscending: ": activate to sort column ascending", sortDescending: ": activate to sort column descending" },
                    emptyTable: "No data available in table",
                    info: "Showing _START_ to _END_ of _TOTAL_ records",
                    infoEmpty: "No records found",
                    infoFiltered: "(filtered1 from _MAX_ total records)",
                    lengthMenu: "Show _MENU_",
                    search: "Search:",
                    zeroRecords: "No matching records found",
                    paginate: { previous: "Prev", next: "Next", last: "Last", first: "First" },
                },
                bStateSave: !1,
                lengthMenu: [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"],
                ],
                pageLength: 5,
                pagingType: "bootstrap_full_number",
                columnDefs: [{ orderable: !1, targets: [0] }, { searchable: !1, targets: [0] }, { className: "dt-right" }],
                order: [[1, "asc"]],
                initComplete: function () {
                    this.api()
                        .column(1)
                        .every(function () {
                            var e = this,
                                t = $('<select class="form-control input-sm"><option value="">Select</option></select>')
                                    .appendTo($(e.footer()).empty())
                                    .on("change", function () {
                                        var t = $.fn.dataTable.util.escapeRegex($(this).val());
                                        e.search(t ? "^" + t + "$" : "", !0, !1).draw();
                                    });
                            e.data()
                                .unique()
                                .sort()
                                .each(function (e, a) {
                                    t.append('<option value="' + e + '">' + e + "</option>");
                                });
                        });
                },
            });
            jQuery("#sample_1_2_wrapper");
            e.find(".group-checkable").change(function () {
                var e = jQuery(this).attr("data-set"),
                    t = jQuery(this).is(":checked");
                jQuery(e).each(function () {
                    t ? ($(this).prop("checked", !0), $(this).parents("tr").addClass("active")) : ($(this).prop("checked", !1), $(this).parents("tr").removeClass("active"));
                });
            }),
                e.on("change", "tbody tr .checkboxes", function () {
                    $(this).parents("tr").toggleClass("active");
                });
        },
        a = function () {
            var e = $("#sample_2");
            e.dataTable({
                language: {
                    aria: { sortAscending: ": activate to sort column ascending", sortDescending: ": activate to sort column descending" },
                    emptyTable: "No data available in table",
                    info: "Showing _START_ to _END_ of _TOTAL_ records",
                    infoEmpty: "No records found",
                    infoFiltered: "(filtered1 from _MAX_ total records)",
                    lengthMenu: "Show _MENU_",
                    search: "Search:",
                    zeroRecords: "No matching records found",
                    paginate: { previous: "Prev", next: "Next", last: "Last", first: "First" },
                },
                bStateSave: !0,
                pagingType: "bootstrap_extended",
                lengthMenu: [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"],
                ],
                pageLength: 5,
                columnDefs: [
                    { orderable: !1, targets: [0] },
                    { searchable: !1, targets: [0] },
                ],
                order: [[1, "asc"]],
            });
            jQuery("#sample_2_wrapper");
            e.find(".group-checkable").change(function () {
                var e = jQuery(this).attr("data-set"),
                    t = jQuery(this).is(":checked");
                jQuery(e).each(function () {
                    t ? $(this).prop("checked", !0) : $(this).prop("checked", !1);
                });
            });
        },
        r = function () {
            var e = $("#sample_3");
            e.dataTable({
                language: {
                    aria: { sortAscending: ": activate to sort column ascending", sortDescending: ": activate to sort column descending" },
                    emptyTable: "No data available in table",
                    info: "Showing _START_ to _END_ of _TOTAL_ records",
                    infoEmpty: "No records found",
                    infoFiltered: "(filtered1 from _MAX_ total records)",
                    lengthMenu: "Show _MENU_",
                    search: "Search:",
                    zeroRecords: "No matching records found",
                    paginate: { previous: "Prev", next: "Next", last: "Last", first: "First" },
                },
                bStateSave: !0,
                lengthMenu: [
                    [6, 15, 20, -1],
                    [6, 15, 20, "All"],
                ],
                pageLength: 6,
                columnDefs: [
                    { orderable: !1, targets: [0] },
                    { searchable: !1, targets: [0] },
                ],
                order: [[1, "asc"]],
            });
            jQuery("#sample_3_wrapper");
            e.find(".group-checkable").change(function () {
                var e = jQuery(this).attr("data-set"),
                    t = jQuery(this).is(":checked");
                jQuery(e).each(function () {
                    t ? $(this).prop("checked", !0) : $(this).prop("checked", !1);
                });
            });
        },
        o = function () {
            var e = $("#sample_4");
            e.dataTable({
                language: {
                    aria: { sortAscending: ": activate to sort column ascending", sortDescending: ": activate to sort column descending" },
                    emptyTable: "No data available in table",
                    info: "Showing _START_ to _END_ of _TOTAL_ records",
                    infoEmpty: "No records found",
                    infoFiltered: "(filtered1 from _MAX_ total records)",
                    lengthMenu: "Show _MENU_",
                    search: "Search:",
                    zeroRecords: "No matching records found",
                    paginate: { previous: "Prev", next: "Next", last: "Last", first: "First" },
                },
                bStateSave: !0,
                lengthMenu: [
                    [6, 15, 20, -1],
                    [6, 15, 20, "All"],
                ],
                pageLength: 6,
                columnDefs: [
                    { orderable: !1, targets: [0] },
                    { searchable: !1, targets: [0] },
                ],
                order: [[1, "asc"]],
            });
            jQuery("#sample_4_wrapper");
            e.find(".group-checkable").change(function () {
                var e = jQuery(this).attr("data-set"),
                    t = jQuery(this).is(":checked");
                jQuery(e).each(function () {
                    t ? $(this).prop("checked", !0) : $(this).prop("checked", !1);
                });
            });
        },
        n = function () {
            var e = $("#sample_5");
            e.dataTable({
                language: {
                    aria: { sortAscending: ": activate to sort column ascending", sortDescending: ": activate to sort column descending" },
                    emptyTable: "No data available in table",
                    info: "Showing _START_ to _END_ of _TOTAL_ records",
                    infoEmpty: "No records found",
                    infoFiltered: "(filtered1 from _MAX_ total records)",
                    lengthMenu: "Show _MENU_",
                    search: "Search:",
                    zeroRecords: "No matching records found",
                    paginate: { previous: "Prev", next: "Next", last: "Last", first: "First" },
                },
                footerCallback: function (e, t, a, r, o) {
                    var n = this.api(),
                        s = function (e) {
                            return "string" == typeof e ? 1 * e.replace(/[\$,]/g, "") : "number" == typeof e ? e : 0;
                        };
                    (total = n
                        .column(3)
                        .data()
                        .reduce(function (e, t) {
                            return s(e) + s(t);
                        }, 0)),
                        (pageTotal = n
                            .column(3, { page: "current" })
                            .data()
                            .reduce(function (e, t) {
                                return s(e) + s(t);
                            }, 0)),
                        $(n.column(3).footer()).html("$" + pageTotal + " ( $" + total + " total)");
                },
                bStateSave: !0,
                lengthMenu: [
                    [6, 15, 20, -1],
                    [6, 15, 20, "All"],
                ],
                pageLength: 6,
                columnDefs: [
                    { orderable: !1, targets: [0] },
                    { searchable: !1, targets: [0] },
                ],
                order: [[1, "asc"]],
            });
            jQuery("#sample_5_wrapper");
            e.find(".group-checkable").change(function () {
                var e = jQuery(this).attr("data-set"),
                    t = jQuery(this).is(":checked");
                jQuery(e).each(function () {
                    t ? $(this).prop("checked", !0) : $(this).prop("checked", !1);
                });
            });
        };
    return {
        init: function () {
            jQuery().dataTable && (e(), t(), a(), r(), o(), n());
        },
    };
})();
App.isAngularJsApp() === !1 &&
    jQuery(document).ready(function () {
        TableDatatablesManaged.init();
    });
