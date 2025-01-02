$(document).ready(function () {
  $.getJSON("https://api.adviceslip.com/advice", function (data) {
    $("#advice-text").html(data.slip.advice);
    $("#advice-text .ui.placeholder").remove(); // Remove placeholder after loading
  }).fail(function () {
    $("#advice-text").text("Failed to load advice.");
  });
});
