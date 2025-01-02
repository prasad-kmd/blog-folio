$(document).ready(function () {
  // Replace with your desired city (optional)
  var city = "";

  // Use city parameter if provided, otherwise use automatic detection
  if (city) {
    var url = "https://api.codetabs.com/v1/weather?city=" + city;
  } else {
    var url = "https://api.codetabs.com/v1/weather";
  }

  $.getJSON(url, function (data) {
    var cityName = data.city;
    var temperatureC = data.tempC;
    var temperatureF = (temperatureC * 9) / 5 + 32;

    $("#city").text("City: " + cityName);
    $("#temperature").html(
      "Temperature: " + temperatureC + "°C (" + temperatureF.toFixed(2) + "°F)"
    );
  });
});
