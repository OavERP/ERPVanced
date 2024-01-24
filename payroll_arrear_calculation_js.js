var editArr = false;
function GetFinancialYearArrearFilter() {
  var role_code = $("#encrpt_role_code").val();
  $.ajax({
    url:
      "payroll_arrear_calculation_db.php?oper=GETFINANCIALYEAR&role_code=" +
      role_code,
    mType: "get",
    success: function (response) {
      var res1 = JSON.parse(response);
      var CmbYearArrearFilter = $("#CmbYearArrearFilter").selectize()[0]
        .selectize;
      CmbYearArrearFilter.clear();
      CmbYearArrearFilter.clearOptions();
      $.each(res1.aaData, function (i, data) {
        CmbYearArrearFilter.addOption({
          value: data.leave_year,
          text: data.leave_year,
        });
        if (data.leave_year_status == "CURRENT") {
          CmbYearArrearFilter.setValue(data.leave_year);
        }
      });
    },
    error: function () {
      toastr.error("Oops! Something Went Wrong, Please Contact Admin");
    },
  });
}
const GetArrearTypeField = () => {
  var role_code = $("#encrpt_role_code").val();
  $.ajax({
    url:
      "payroll_arrear_calculation_db.php?oper=GETARREARTYPE&role_code=" +
      role_code,
    mType: "get",
    success: function (response) {
      var res1 = JSON.parse(response);
      var CmbArrearType = $("#CmbArrearType").selectize()[0].selectize;
      var CmbArrearTypeFilter = $("#CmbArrearTypeFilter").selectize()[0]
        .selectize;
      CmbArrearType.clear();
      CmbArrearTypeFilter.clear();
      CmbArrearType.clearOptions();
      CmbArrearTypeFilter.clearOptions();
      $.each(res1.aaData, function (i, data) {
        let dt = {
          value: data.arrear_type_code,
          text: data.arrear_type_name,
        };
        CmbArrearType.addOption(dt);
        CmbArrearTypeFilter.addOption(dt);
      });
    },
    error: function () {
      toastr.error("Oops! Something Went Wrong, Please Contact Admin");
    },
  });
};
function GetFinancialYearArrear() {
  var role_code = $("#encrpt_role_code").val();
  $.ajax({
    url:
      "payroll_arrear_calculation_db.php?oper=GETFINANCIALYEAR&role_code=" +
      role_code,
    mType: "get",
    success: function (response) {
      var options = "<option value=''>--SELECT--</option>";
      var res1 = JSON.parse(response);
      $.each(res1.aaData, function (i, data) {
        options =
          options +
          "<option value='" +
          data.leave_year +
          "'>" +
          data.leave_year +
          "</option>";
      });
      $("#CmbYearArrear").selectize()[0].selectize.destroy();
      $("#CmbYearArrear").html("");
      $("#CmbYearArrear").append(options);
      $("#CmbYearArrear").selectize();
    },
    error: function () {
      toastr.error("Oops! Something Went Wrong, Please Contact Admin");
    },
  });
}
function GetEmployeeNameArrear() {
  var role_code = $("#encrpt_role_code").val();
  $.ajax({
    url:
      "payroll_arrear_calculation_db.php?oper=GETEMPDATA&role_code=" +
      role_code,
    mType: "get",
    success: function (response) {
      var options = "<option value=''>--SELECT--</option>";
      var res1 = JSON.parse(response);
      $.each(res1.aaData, function (i, data) {
        options =
          options +
          "<option value='" +
          data.emp_code +
          "'>" +
          data.emp_name +
          "</option>";
      });
      $("#CmbEmployeeNameArrear").selectize()[0].selectize.destroy();
      $("#CmbEmployeeNameArrear").html("");
      $("#CmbEmployeeNameArrear").append(options);
      $("#CmbEmployeeNameArrear").selectize();
    },
    error: function () {
      toastr.error("Oops! Something Went Wrong, Please Contact Admin");
    },
  });
}
function Arrear() {
  var CmbYearArrearFilter = $("#CmbYearArrearFilter").val();
  var CmbMonthArrearFilter = $("#CmbMonthArrearFilter").val();
  var CmbArrearTypeFilter = $("#CmbArrearTypeFilter").val();
  var role_code = $("#encrpt_role_code").val();
  $.ajax({
    url:
      "payroll_arrear_calculation_db.php?oper=GETARREAR&role_code=" + role_code,
    mType: "get",
    data: {
      CmbYearArrearFilter: CmbYearArrearFilter,
      CmbMonthArrearFilter: CmbMonthArrearFilter,
      CmbArrearTypeFilter: CmbArrearTypeFilter,
    },
    success: function (response) {
      var res = JSON.parse(response);
      if (res.dbStatus == "SUCCESS") {
        var DtblArrear = $("#DtblArrear").DataTable();
        DtblArrear.clear().draw();
        DtblArrear.rows.add(res.aaData).draw();
      } else {
        toastr.error(res.dbMessage);
      }
    },
    error: function (response) {},
  });
}

const changeDeductionData = () => {
  let role_code = $("#encrpt_role_code").val();
  let CmbYearArrear = $("#CmbYearArrear").val();
  let CmbMonthArrear = $("#CmbMonthArrear").val();
  let CmbEmployeeNameArrear = $("#CmbEmployeeNameArrear").val();
  let CmbArrearType =  $("#CmbArrearType").val();
  let id = $("#HiddenArrearCode").val();
  if (CmbYearArrear && CmbMonthArrear && CmbEmployeeNameArrear && !id) {
    $("#txtDueBasicArrear").val('');
          $("#txtDueDaArrear").val('');
          $("#txtDueHraArrear").val('');
          $("#txtDrawnBasicArrear").val('');
          $("#txtDrawnDaArrear").val('');
          $("#txtDrawnHraArrear").val('');
          $("#txtIt").val('');
          $("#txtPt").val('');
          $("#txtEpf").val('');
    $.ajax({
      url:
        "payroll_arrear_calculation_db.php?oper=GETDEDUCATIONDATA&role_code=" +
        role_code,
      mType: "get",
      data: {
        CmbYearArrear: CmbYearArrear,
        CmbMonthArrear: CmbMonthArrear,
        CmbEmployeeNameArrear: CmbEmployeeNameArrear,
      },
      success: function (response) {
        var res = JSON.parse(response);
        if (res.dbStatus == "SUCCESS"  &&  editArr != true) {
          let data = res.aaData[0];
          $("#txtDueBasicArrear").val(data.basic_due);
          $("#txtDueDaArrear").val(data.da_due);
          $("#txtDueHraArrear").val(data.hra_due);
          $("#txtDrawnBasicArrear").val(data.basic_drawn);
          $("#txtDrawnDaArrear").val(data.da_drawn);
          $("#txtDrawnHraArrear").val(data.hra_drawn);
          $("#txtIt").val(data.tds);
          $("#txtPt").val(data.pt);
          $("#txtEpf").val(data.epf);
          if(CmbArrearType == 'ARRDEARALL'){
             $("#txtDueBasicArrear").val('');
             $("#txtDueDaArrear").val('');
             $("#txtDueHraArrear").val('');
          } 
          calcNetPay(); 
        } else if(editArr != true) {
          toastr.error(res.dbMessage);
        }
      },
      error: function (response) {},
    });
    
  }
};

const newArrearEntryBtn = () => {
  editArr = false;
  var oTable = $("#DtblArrear").dataTable();
  $(oTable.fnSettings().aoData).each(function () {
    $(this.nTr).removeClass("success");
    $(this.anCells).removeClass("success");
  });
  $("#HiddenArrearCode").val("");
  $("#CmbYearArrear").selectize()[0].selectize.clear();
  $("#CmbMonthArrear").selectize()[0].selectize.clear();
  $("#CmbEmployeeNameArrear").selectize()[0].selectize.clear();
  $("#CmbArrearType").selectize()[0].selectize.clear();
  $("#txtDueBasicArrear").val("");
  $("#txtDueDaArrear").val("");
  $("#txtDueHraArrear").val("");
  $("#txtDrawnBasicArrear").val("");
  $("#txtDrawnDaArrear").val("");
  $("#txtDrawnHraArrear").val("");
  $("#txtIt").val("");
  $("#txtPt").val("");
  $("#txtEpf").val("");
  $("#txtNps").val("");
  $("#txtMiscDed").val("");
  $("#txtRemarks").val("");
  $("#lblArrear").html("ADD");
  $("#BtnSaveArrear").html('<i class="fa fa-save"></i>&nbsp;Save');
  $("#BtnSaveArrear").removeAttr("disabled");
  $("#ModalArrear").modal("show");
  $("#FrmArrear").data("bootstrapValidator").resetForm(true);
};

$(document).ready(function () {
  var role_code = $("#encrpt_role_code").val();
  var user_code = $("#user_code").val();
  var ins_code = $("#ins_code").val();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + "-" + mm + "-" + yyyy;
  $.ajax({
    url:
      "payroll_arrear_calculation_db.php?oper=GET_ACTIVE_INACTIVE&role_code=" +
      role_code,
    type: "post",
    success: function (responsedata) {
      /* DtblArrear.button().add(1, {
        text: '<button class="btn btn-primary btn-sm" id="AddArrear" name="AddArrear"><i class="fa fa-fw fa-plus"></i>&nbsp;Add</button>&nbsp;&nbsp;',
        action: newArrearEntryBtn,
      }); */
        DtblArrear.button().add(1, {
          text: '<button class="btn btn-primary btn-sm" id="AddArrear" name="AddArrear"><i class="fa fa-fw fa-plus"></i>&nbsp;Add</button>&nbsp;&nbsp;',
          action: newArrearEntryBtn,
        });
      
    },
  });
  GetFinancialYearArrearFilter();
  GetFinancialYearArrear();
  GetEmployeeNameArrear();
  GetArrearTypeField();
  $("#CmbEmployeeNameArrear").change(() => changeDeductionData());
  $("#CmbMonthArrear").change(() => changeDeductionData());
  $("#CmbYearArrear").change(() => changeDeductionData()); 
  $("#CmbArrearType").change(() => changeDeductionData()); 

  //$("#txtDueBasicArrear").change(() => calcNetPay()); 

  $("#CmbMonthArrearFilter").selectize();
    var DtblArrear = $("#DtblArrear").DataTable({
      lengthMenu: [
        [7, 10, 15, 45, 75, 100],
        [7, 10, 15, 45, 75, 100],
      ],
      pageLength: 7,
      bProcessing: false,
      bServerSide: false,
      bStateSave: false,
      bPaginate: true,
      bLengthChange: true,
      scrollX: true,
      bFilter: true,
      bSort: false,
      bInfo: true,
      bAutoWidth: false,
      bDestroy: false,
      sDom: "<'row'<'col-xs-5 dtblBtn addArrearBtn'B><'col-xs-3'l><'col-xs-4'f>r>t<'row'<'col-xs-6' <'row' <'col-xs-6' i>>><'col-xs-6'p>>",
      aoColumns: [
        {
          data: "slno",
          sWidth: "3%",
          bSortable: "false",
          className: "text-center",
        },
        { data: "financial_year", className: "text-center", sWidth: "5%" },
        { data: "month", className: "text-center", sWidth: "5%" },
        { data: "emp_name", className: "text-left", sWidth: "10%" },
        { data: "arrear_type_name", className: "text-left", sWidth: "10%" },
        { data: "due_basic", className: "text-right", sWidth: "7%" },
        { data: "due_da", className: "text-right", sWidth: "7%" },
        { data: "due_hra", className: "text-right", sWidth: "7%" },
        { data: "total1", className: "text-right", sWidth: "7%" },
        { data: "drawn_basic", className: "text-right", sWidth: "7%" },
        { data: "drawn_da", className: "text-right", sWidth: "7%" },
        { data: "drawn_hra", className: "text-right", sWidth: "7%" },
        { data: "total2", className: "text-right", sWidth: "7%" },
        { data: "it", className: "text-right", sWidth: "7%" },
        { data: "pt", className: "text-right", sWidth: "7%" },
        { data: "epf", className: "text-right", sWidth: "7%" },
        { data: "nps", className: "text-right", sWidth: "7%" },
        { data: "misc_ded", className: "text-right", sWidth: "7%" },
        { data: "total3", className: "text-right", sWidth: "7%" },
        { data: "net", className: "text-right", sWidth: "7%" },
        { data: "remarks", className: "text-center", sWidth: "7%" },
        {
          sName: "Action",
          className: "text-center",
          sWidth: "7%",
          data: null,
          mRender: function (data, type, val) {
            return "<button id='EditArrear' type='button' action ='EditArrear' class='btn btn-warning btn-sm btn-responsive' ><i class='fa fa-edit'></i></button>&nbsp;&nbsp<button id='DeleteArrear' action ='DeleteArrear' class='btn btn-danger btn-sm  btn-responsive'><i class='fa fa-trash'></i></button>";
          },
        },
      ],
      buttons: [
        {
          extend: "excelHtml5",
          text: '<button class="btn btn-success btn-sm "><i class="fa fa-download"></i>&nbsp;Excel</button>',
          filename: "Arrear Details",
          header: true,
          title: "Arrear Details",
          exportOptions: {
            columns: [
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
            ],
          },
        },
      ],
    });
   
  $("#FrmArrear").bootstrapValidator({
    excluded: "disabled",
    message: "This value is not valid",
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh",
    },
    submitButtons: 'button[type="submit"]',
    submitHandler: function (validator, form, submitButton) {
      $("#BtnSaveArrear").html('<i class="fa fa-gear fa-spin"></i> Saving...');
      $("#BtnSaveArrear").attr("disabled", true);
      var id = $("#HiddenArrearCode").val();
      if (id == "") {
        oper = "INSERTARREAR";
      } else {
        oper = "UPDATEARREAR";
      }
      var data = new FormData(document.getElementById("FrmArrear"));
      $.ajax({
        url:
          "payroll_arrear_calculation_db.php?oper=" +
          oper +
          "&role_code=" +
          role_code,
        type: "post",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
          var result = jQuery.parseJSON(response);
          if (result.dbStatus == "SUCCESS") {
            toastr.success(result.dbMessage);
            Arrear();
            $("#HiddenArrearCode").val("");
            $("#CmbYearArrear").selectize()[0].selectize.clear();
            $("#CmbMonthArrear").selectize()[0].selectize.clear();
            $("#CmbEmployeeNameArrear").selectize()[0].selectize.clear();
            $("#txtDueBasicArrear").val("");
            $("#txtDueDaArrear").val("");
            $("#txtDueHraArrear").val("");
            $("#txtDrawnBasicArrear").val("");
            $("#txtDrawnDaArrear").val("");
            $("#txtDrawnHraArrear").val("");
            $("#txtIt").val("");
            $("#txtPt").val("");
            $("#txtEpf").val("");
            $("#txtNps").val("");
            $("#txtMiscDed").val("");
            $("#txtRemarks").val("");
            $("#BtnSaveArrear").html('<i class="fa fa-save"></i>&nbsp;Save');
            $("#BtnSaveArrear").removeAttr("disabled");
            $("#FrmArrear").data("bootstrapValidator").resetForm(true);
            if (oper == "UPDATEARREAR") {
              $("#ModalArrear").modal("hide");
            }
          } else if (result.dbStatus == "FAILURE") {
            toastr.error(result.dbMessage);
          } else if (result.dbStatus == "EXIST") {
            toastr.error(result.dbMessage);
            $("#CmbYearArrear").selectize()[0].selectize.clear();
            $("#CmbMonthArrear").selectize()[0].selectize.clear();
            $("#CmbEmployeeNameArrear").selectize()[0].selectize.clear();
            $("#BtnSaveArrear").html('<i class="fa fa-save"></i>&nbsp;Save');
            $("#BtnSaveArrear").removeAttr("disabled");
            if (oper == "UPDATEARREAR") {
              $("#ModalArrear").modal("hide");
            }
          }
        },
      });
    },
    fields: {
      CmbYearArrear: { validators: { notEmpty: { message: "Required" } } },
      CmbMonthArrear: { validators: { notEmpty: { message: "Required" } } },
      CmbEmployeeNameArrear: {
        validators: { notEmpty: { message: "Required" } },
      },
      CmbArrearType: {
        validators: { notEmpty: { message: "Required" } },
      },
      txtDueBasicArrear: {
        validators: {
          notEmpty: { message: "Required" },
          regexp: {
            regexp: /^[0-9.]{1,30}$/,
            message:
              "Sorry! Only Number & Dot Allowed(Minimum 1 & Maximum 30 Digit)",
          },
        },
      },
      txtDueDaArrear: {
        validators: {
          notEmpty: { message: "Required" },
          regexp: {
            regexp: /^[0-9.]{1,30}$/,
            message:
              "Sorry! Only Number & Dot Allowed(Minimum 1 & Maximum 30 Digit)",
          },
        },
      },
      txtDueHraArrear: {
        validators: {
          notEmpty: { message: "Required" },
          regexp: {
            regexp: /^[0-9.]{1,30}$/,
            message:
              "Sorry! Only Number & Dot Allowed(Minimum 1 & Maximum 30 Digit)",
          },
        },
      },
      txtDrawnBasicArrear: {
        validators: {
          notEmpty: { message: "Required" },
          regexp: {
            regexp: /^[0-9.]{1,30}$/,
            message:
              "Sorry! Only Number & Dot Allowed(Minimum 1 & Maximum 30 Digit)",
          },
        },
      },
      txtDrawnDaArrear: {
        validators: {
          notEmpty: { message: "Required" },
          regexp: {
            regexp: /^[0-9.]{1,30}$/,
            message:
              "Sorry! Only Number & Dot Allowed(Minimum 1 & Maximum 30 Digit)",
          },
        },
      },
      txtDrawnHraArrear: {
        validators: {
          notEmpty: { message: "Required" },
          regexp: {
            regexp: /^[0-9.]{1,30}$/,
            message:
              "Sorry! Only Number & Dot Allowed(Minimum 1 & Maximum 30 Digit)",
          },
        },
      },
      txtIt: {
        validators: {
          notEmpty: { message: "Required" },
          regexp: {
            regexp: /^[0-9.]{1,30}$/,
            message:
              "Sorry! Only Number & Dot Allowed(Minimum 1 & Maximum 30 Digit)",
          },
        },
      },
      txtPt: {
        validators: {
          notEmpty: { message: "Required" },
          regexp: {
            regexp: /^[0-9.]{1,30}$/,
            message:
              "Sorry! Only Number & Dot Allowed(Minimum 1 & Maximum 30 Digit)",
          },
        },
      },
      txtEpf: {
        validators: {
          notEmpty: { message: "Required" },
          regexp: {
            regexp: /^[0-9.]{1,30}$/,
            message:
              "Sorry! Only Number & Dot Allowed(Minimum 1 & Maximum 30 Digit)",
          },
        },
      },
      txtNps: {
        validators: {
          notEmpty: { message: "Required" },
          regexp: {
            regexp: /^[0-9.]{1,30}$/,
            message:
              "Sorry! Only Number & Dot Allowed(Minimum 1 & Maximum 30 Digit)",
          },
        },
      },
      txtMiscDed: {
        validators: {
          notEmpty: { message: "Required" },
          regexp: {
            regexp: /^[0-9.]{1,30}$/,
            message:
              "Sorry! Only Number & Dot Allowed(Minimum 1 & Maximum 30 Digit)",
          },
        },
      },
      txtRemarks: { validators: { notEmpty: { message: "Required" } } },
    },
  });
  $("#DtblArrear tbody").on(
    "click",
    "button[action=EditArrear]",
    function (event) {
      var data = DtblArrear.row($(this).parents("tr")).data();
      var oTable = $("#DtblArrear").dataTable();
      $(oTable.fnSettings().aoData).each(function () {
        $(this.nTr).removeClass("success");
      });
      var row;
      if (event.target.tagName == "BUTTON")
        row = event.target.parentNode.parentNode;
      else if (event.target.tagName == "I")
        row = event.target.parentNode.parentNode.parentNode;
      $(row).addClass("success");
      $("#FrmArrear").data("bootstrapValidator").resetForm(true);
      editArr = true;
      $("#HiddenArrearCode").val(data.id);
      $("#CmbYearArrear")
        .selectize()[0]
        .selectize.setValue(data.financial_year);
      $("#CmbMonthArrear").selectize()[0].selectize.setValue(data.month);
      $("#CmbEmployeeNameArrear")
        .selectize()[0]
        .selectize.setValue(data.emp_id);
      $("#CmbArrearType").selectize()[0].selectize.setValue(data.arrear_type);
      $("#txtDueBasicArrear").val(data.due_basic);
      $("#txtDueDaArrear").val(data.due_da);
      $("#txtDueHraArrear").val(data.due_hra);
      $("#txtDrawnBasicArrear").val(data.drawn_basic);
      $("#txtDrawnDaArrear").val(data.drawn_da);
      $("#txtDrawnHraArrear").val(data.drawn_hra);
      $("#txtIt").val(data.it);
      $("#txtPt").val(data.pt);
      $("#txtEpf").val(data.epf);
      $("#txtNps").val(data.nps);
      $("#txtMiscDed").val(data.misc_ded);
      /////////////////////////
      calcNetPay();
      /////////////////////////////
      $("#txtRemarks").val(data.remarks);
      $("#FrmArrear")
        .data("bootstrapValidator")
        .updateStatus("txtDueBasicArrear", "NOT_VALIDATED", null)
        .validateField("txtDueBasicArrear");
      $("#FrmArrear")
        .data("bootstrapValidator")
        .updateStatus("txtDueDaArrear", "NOT_VALIDATED", null)
        .validateField("txtDueDaArrear");
      $("#FrmArrear")
        .data("bootstrapValidator")
        .updateStatus("txtDueHraArrear", "NOT_VALIDATED", null)
        .validateField("txtDueHraArrear");
      $("#FrmArrear")
        .data("bootstrapValidator")
        .updateStatus("txtDrawnBasicArrear", "NOT_VALIDATED", null)
        .validateField("txtDrawnBasicArrear");
      $("#FrmArrear")
        .data("bootstrapValidator")
        .updateStatus("txtDrawnDaArrear", "NOT_VALIDATED", null)
        .validateField("txtDrawnDaArrear");
      $("#FrmArrear")
        .data("bootstrapValidator")
        .updateStatus("txtDrawnHraArrear", "NOT_VALIDATED", null)
        .validateField("txtDrawnHraArrear");
      $("#FrmArrear")
        .data("bootstrapValidator")
        .updateStatus("txtIt", "NOT_VALIDATED", null)
        .validateField("txtIt");
      $("#FrmArrear")
        .data("bootstrapValidator")
        .updateStatus("txtPt", "NOT_VALIDATED", null)
        .validateField("txtPt");
      $("#FrmArrear")
        .data("bootstrapValidator")
        .updateStatus("txtEpf", "NOT_VALIDATED", null)
        .validateField("txtEpf");
      $("#FrmArrear")
        .data("bootstrapValidator")
        .updateStatus("txtNps", "NOT_VALIDATED", null)
        .validateField("txtNps");
      $("#FrmArrear")
        .data("bootstrapValidator")
        .updateStatus("txtMiscDed", "NOT_VALIDATED", null)
        .validateField("txtMiscDed");
      $("#FrmArrear")
        .data("bootstrapValidator")
        .updateStatus("txtRemarks", "NOT_VALIDATED", null)
        .validateField("txtRemarks");
      $("#BtnSaveArrear").html('<i class="fa fa-edit"></i>&nbsp;Update');
      $("#BtnSaveArrear").removeAttr("disabled");
      $("#lblArrear").html("EDIT");
      $("#ModalArrear").modal("show");
    }
  );
  $("#DtblArrear tbody").on(
    "click",
    "button[action=DeleteArrear]",
    function (event) {
      var data = DtblArrear.row($(this).parents("tr")).data();
      var oTable = $("#DtblArrear").dataTable();
      $(oTable.fnSettings().aoData).each(function () {
        $(this.nTr).removeClass("success");
      });
      var row;
      if (event.target.tagName == "BUTTON")
        row = event.target.parentNode.parentNode;
      else if (event.target.tagName == "I")
        row = event.target.parentNode.parentNode.parentNode;
      $(row).addClass("success");
      swal({
        title: "Are you sure to Delete?",
        text: "",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        animation: false,
      })
        .then(
          function () {
            $.ajax({
              url:
                "payroll_arrear_calculation_db.php?oper=DELETEARREAR&role_code=" +
                role_code,
              type: "get",
              data: { id: data.id },
              success: function (response) {
                var result = jQuery.parseJSON(response);
                if (result.dbStatus == "SUCCESS") {
                  toastr.success(result.dbMessage);
                } else {
                  toastr.error(result.dbMessage);
                }
                Arrear();
              },
              error: function () {
                toastr.error("Unable to process please contact support");
              },
            });
          },
          function (dismiss) {}
        )
        .done();
    }
  );
 
  $("#CmbYearArrearFilter").change(function () {
    Arrear();
  });
  $("#CmbMonthArrearFilter").change(function () {
    Arrear();
  });
  $("#CmbArrearTypeFilter").change(function () {
    Arrear();
  });
});
 ///below function is for calculate net payable amt/////////////////////
 function calcNetPay (){
  // console.log('hiiiiiiii');
    var txtDueBasicArrear =  chkNumber($('#txtDueBasicArrear').val());
    var txtDueDaArrear =  chkNumber($('#txtDueDaArrear').val());
    var txtDueHraArrear =  chkNumber($('#txtDueHraArrear').val());

    var txtDrawnBasicArrear =  chkNumber($('#txtDrawnBasicArrear').val());      
    var txtDrawnDaArrear =  chkNumber($('#txtDrawnDaArrear').val());      
    var txtDrawnHraArrear =  chkNumber($('#txtDrawnHraArrear').val());  
    
    var txtIt =  chkNumber($('#txtIt').val());      
    var txtPt =  chkNumber($('#txtPt').val());      
    var txtEpf =  chkNumber($('#txtEpf').val());      
    var txtNps =  chkNumber($('#txtNps').val());      
    var txtMiscDed =  chkNumber($('#txtMiscDed').val());      
    
    var dueTotal = parseFloat(txtDueBasicArrear) + parseFloat(txtDueDaArrear) + parseFloat(txtDueHraArrear);
    var roundDueTotal = Math.round(dueTotal);
    var deductTotal = parseFloat(txtDrawnBasicArrear) + parseFloat(txtDrawnDaArrear) + parseFloat(txtDrawnHraArrear) + parseFloat(txtIt) + parseFloat(txtPt) + parseFloat(txtEpf) + parseFloat(txtNps) + parseFloat(txtMiscDed);
    var netPay = roundDueTotal - deductTotal;
    // console.log(dueTotal, roundDueTotal, deductTotal);
    ///set data///
    $('#txtNetpayble').val(netPay);

  }
  function chkNumber(num){
    var retData = 0;
    if(num == '' || num == null || num == 'null' || num == undefined || num == NaN){
      retData = 0;
    }
    else{
      retData = num;
    }
    return retData;
  }

//////////////////////////////////////////////////////////////////////
