$(document).ready(function () {
  $("#searchButton").click(function () {
    var query = $("#searchQuery").val();
    searchArXiv(query);
  });

  $("#searchQuery").keypress(function (event) {
    if (event.keyCode === 13) {
      // Enter key pressed
      var query = $(this).val();
      searchArXiv(query);
    }
  });

  // Hide the loader initially
  $(".ui.dimmer").hide();
});

function searchArXiv(query) {
  var url =
    "https://export.arxiv.org/api/query?search_query=all:" +
    encodeURIComponent(query);
  $(".ui.dimmer").show(); // Show the loader

  $.get(url, function (data) {
    var entries = $(data).find("entry");
    var output = "";

    if (entries.length === 0) {
      output =
        "<div class='ui warning message'>No results found for '" +
        query +
        "'</div>";
    } else {
      output = "<div class='ui divided items'>";
      entries.each(function () {
        var title = $(this).find("title").text();
        var summary = $(this).find("summary").text().substring(0, 150) + "..."; // Limit summary length
        var link = $(this).find("id").text();
        output += `
            <div class="item">
              <div class="content">
                <a class="header" href="${link}" target="_blank">${title}</a>
                <div class="description">${summary}</div>
              </div>
            </div>
          `;
      });
      output += "</div>";
    }

    $("#searchResults .items").html(output);
    $(".ui.dimmer").hide(); // Hide the loader
  });
}
