"use strict"

var day_val = 1;

var next_day_div = document.getElementById("yn_id");

var data_entry_div = document.getElementById("data_entry_id");

var data_array = [];

var rain_selected_id = document.getElementById("rain_selected_id");

var rain_total = document.getElementById("rain_total_id");

var snow_total = document.getElementById("snow_total_id");

var precipitation_input_ele = $("#precipitation_input_id");

var precipitation_input_txt = precipitation_input_ele.val();

var precipitation_input_val = parseInt(precipitation_input_txt);

var results_div = document.getElementById("results_id");



$(document).ready(() => {
  $("#day_id").val(day_val);
  // reset_form();

  $("#yn_input_id").change(evt => { next_day() })
  $("#precipitation_input_id").change(evt => { check_precipitation_input() })


});

const next_day = () => {
  var yn = $("#yn_input_id").val();
  if (yn == "Y" || yn == "y") {
    day_val++;
    $("#day_id").val(day_val);

    if(rain_selected_id.checked == true) {
      rain_total.value = parseInt(rain_total.value) + precipitation_input_val;
      data_array.push("Day: " + (day_val - 1).toString() + " Rain: " + precipitation_input_val)
    } else {
      snow_total.value = parseInt(snow_total.value) + precipitation_input_val;
      data_array.push("Day: " + (day_val - 1).toString() + " Snow: " + precipitation_input_val)
    }

  }
  $("#yn_input_id").val("");

  if (day_val == 6) {

    next_day_div.hidden = true;
    data_entry_div.hidden = true;

    var rev_data_array = data_array.reverse();

  
    rev_data_array.forEach(e => {
      var result_item = document.createElement("li");
      result_item.textContent = e;
      results_div.appendChild(result_item);
    });

  }

  
}


const check_precipitation_input = () => {
  var precipitation_input_ele = $("#precipitation_input_id");
  var precipitation_input_txt = precipitation_input_ele.val();
  var error_status_p = false;

  if (isNaN(precipitation_input_txt) ||
    precipitation_input_txt == "") {
    error_status_p = true;
    precipitation_input_ele.next().text("Error - Not a Number");
    $("inches_display_id").val("0");
    next_day_div.hidden = true;
  }
  else {
    precipitation_input_val = parseInt(precipitation_input_txt);
    next_day_div.hidden = false;

    if (precipitation_input_val < 0 ||
      precipitation_input_val > 1000) {
      error_status_p = true;
      precipitation_input_ele.next().text("Error - <0 or > 1000");
      $("#inches_display_id").val("0");
      next_day_div.hidden = true;
    }
    else {
      precipitation_input_ele.next().text("");
      var inches_val = (precipitation_input_val / 25.4).toFixed(2);
      $("#inches_display_id").val(inches_val);
      next_day_div.hidden = false;
    }
  }
}

const reset_form = () => {
  $("#precipitation_input_id").val("0");
  $("#precipitation_input_id").next().text("");
  $("inches_display_id").val("0");
  $("rain_selected_id").checked = true;
  $("snow_selected_id").checked = false;
}
