var sumEcts = 0;
var sumHours = 0;
var selectedEcts = [];
var index;

$.ajax({
  method: "get",
  url: "http://www.fulek.com/VUA/SUPIT/GetNastavniPlan",

  success: function (data) {
    $("#autocompleteSearch").autocomplete({
      source: data,
      focus: function (event, ui) {
        event.preventDefault();
        $("#autocompleteSearch").val(ui.item.label);
      },
      select: function (event, ui) {
        event.preventDefault();
        $("#autocompleteSearch").val(ui.item.label);
        getSubject(ui.item.value);
      },
    });
  },
});

const getSubject = (id) => {
  $.ajax({
    url: "http://www.fulek.com/VUA/supit/GetKolegij",
    data: { id },

    success: (data) => {
      if ($("#tblBody tr").length == 0 && $("#tblHead tr").length == 0) {
        $("#tblHead").append("<tr id='headrow'></tr>");
        $.each(data, function (k, v) {
          if (k != "id" && k != "semestar") {
            $("#headrow").append("<th>" + k + "</th>");
          }
        });
      }

      $("#tblBody").append(
        "<tr class='bodyrow'> <td id='subjectCell'>" +
          data.kolegij +
          "</td> <td id='ectsCell'>" +
          data.ects +
          "</td> <td id='hoursCell'>" +
          data.sati +
          "</td> <td id='teoryCell'>" +
          data.predavanja +
          "</td> <td id='practicalCell'>" +
          data.vjezbe +
          "</td> <td id='typeCell'>" +
          data.tip +
          "</td> <td><input id='btnRemove' type='button' value='Obriši red' /></td> </tr>"
      );
      selectedEcts.push(data.ects);

      if ($("#tblBody tr").length == 1) {
        $("#tblSubjects").append("<tfoot id='total'></tfoot>");
        $("#total").append(
          "<tr> <td>Ukupno: </td> <td id='totalEcts'></td> <td id='totalHours'></td> </tr>"
        );
      }

      $.each(data, function (k, v) {
        if (k == "ects") {
          sumEcts += v;
        } else if (k == "sati") {
          sumHours += v;
        }
      });

      $("#totalEcts").html(sumEcts);
      $("#totalHours").html(sumHours);
    },
  });
};

$("#tblSubjects").on("click", "#btnRemove", function () {
  var currentEcts = $(this).closest("tr").find("#ectsCell").html();
  var currentHours = $(this).closest("tr").find("#hoursCell").html();

  if ($("#tblBody tr").length == 1) {
    $(this).closest("tr").remove();
    $("#headrow").remove();
    $("#total").remove();
  } else {
    $(this).closest("tr").remove();
  }

  sumEcts -= currentEcts;
  sumHours -= currentHours;

  $("#totalEcts").html(sumEcts);
  $("#totalHours").html(sumHours);
});
