$(document).ready(function () {
    $(".ui.dimmer").hide(); // Hide the loader initially

    $("#searchButton").click(function () {
        const searchTerm = $("#searchInput").val().trim();

        if (!searchTerm) {
            alert("Please enter a search term!");
            return;
        }

        searchBooks(searchTerm);
    });

    function searchBooks(searchTerm) {
        const baseUrl = "https://openlibrary.org/search.json?q=";
        const resultsPerPage = 20;
        const url = `${baseUrl}${searchTerm}&limit=${resultsPerPage}`;

        $(".ui.dimmer").show(); // Show the loader

        $.ajax({
            url: url,
            success: function (data) {
                $(".ui.dimmer").hide(); // Hide the loader
                const resultsContainer = $("#searchResults");
                resultsContainer.empty();

                if (data.numFound === 0) {
                    resultsContainer.html("<p>No results found for your search.</p>");
                    return;
                }

                data.docs.forEach(doc => {
                    let title = "Unknown Title";
                    if (Array.isArray(doc.title)) {
                        title = doc.title.join(" ");
                    } else if (typeof doc.title === 'string') {
                        title = doc.title;
                    }

                    const author = doc.author_name ? doc.author_name[0] : "Unknown Author";
                    const publishDate = doc.publish_date ? doc.publish_date[0] : "Unknown Date";
                    const coverUrl = doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : "https://placehold.co/720x480?text=Resource+Not+Found%0A404&font=playfair-display"; // Use placeholder image

                    const resultItem = $(`
                        <div class="ui four wide column"> 
                            <div class="ui card">
                                <div class="image">
                                    <img src="${coverUrl}" alt="${title}">
                                </div>
                                <div class="content">
                                    <div class="header">${title}</div>
                                    <div class="meta">
                                        <span class="author">${author}</span>
                                        <span class="date">Published: ${publishDate}</span>
                                    </div>
                                </div>
                                <div class="ui secondary bottom attached button" onclick="window.location.href='${doc.key ? `https://openlibrary.org/${doc.key}` : '#'}'" target="_blank">
                                    <i class="external square alternate icon"></i>
                                    Open Library Page
                                </div>
                            </div>
                        </div>
                    `);

                    resultsContainer.append(resultItem);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error fetching search results:", error);
                $(".ui.dimmer").hide(); // Hide the loader
                $("#searchResults").html("<p>Error fetching search results. Please try again later.</p>");
            }
        });
    }
});