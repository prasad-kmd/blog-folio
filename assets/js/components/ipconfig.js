fetch("https://api.myip.com") //Add "https://api.codetabs.com/v1/proxy?quest=" if you're getting CORS error
  .then((response) => response.json())
  .then((data) => {
    const ip = data.ip;
    const countryCode = data.country_code;
    const countryName = data.country;

    const widget = $("#ipWidget");
    widget.html(`
      <div class="content asc2">
        <div class="header">Your IP Information</div>
        <div class="description">
          <p>IP Address: ${ip}</p>
          <p>Country Code: ${countryCode}</p>
          <p>Country: ${countryName}</p>
        </div>
      </div>
    `);
  })
  .catch((error) => {
    console.error("Error fetching IP data:", error);
    $("#ipWidget").html(
      '<div class="content"><div class="header">Error</div><div class="description">Failed to fetch IP information.</div></div>'
    );
  });
