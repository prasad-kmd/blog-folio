$(document).ready(function () {
  let selectedStoreID = 1; // Default to Steam

  $(".ui.dropdown").dropdown({
    onChange: function (value) {
      selectedStoreID = value;
      fetchDeals($("#searchInput").val().trim().toLowerCase()); // Call fetchDeals with updated storeID
    },
  });

  $("#searchInput").on("keyup", function () {
    const searchTerm = $(this).val().trim().toLowerCase();
    fetchDeals(searchTerm);
  });

  function fetchDeals(searchTerm) {
    const apiUrl = "https://www.cheapshark.com/api/1.0/deals";
    const params = {
      storeID: selectedStoreID,
      pageSize: 40,
      sortBy: "Price",
      onSale: 1,
    };

    if (searchTerm) {
      params.title = searchTerm;
    }

    const queryString = $.param(params);
    const fullUrl = `${apiUrl}?${queryString}`;

    $.ajax({
      url: fullUrl,
      success: function (data) {
        const dealsContainer = $("#gameDeals");
        dealsContainer.empty();

        data.forEach((deal) => {
          const gameTitle = deal.title;
          const storeName = deal.storeName || "Unknown Store";
          const price = deal.salePrice;
          const normalPrice = deal.normalPrice;
          const discountPercent = deal.savings;
          const dealID = deal.dealID;
          const thumb =
            deal.thumb ||
            "https://placehold.co/720x480?text=Resource+Not+Found%0A404&font=playfair-display"; // Use placeholder image

          const dealCard = $(`
                      <div class="ui four wide column"> 
                          <div class="ui card">
                              <div class="image">
                                  <img src="${thumb}" alt="${gameTitle}"> 
                              </div>
                              <div class="content">
                                  <div class="header">${gameTitle}</div>
                                  <!--<div class="meta">${storeName}</div>-->
                                  <div class="description">
                                      <p>Sale Price: $${price}</p>
                                      <p>Normal Price: $${normalPrice}</p>
                                      <p>Discount: ${discountPercent}%</p>
                                  </div>
                              </div>
                              <div class="ui secondary bottom attached button" onclick="window.open('https://www.cheapshark.com/redirect?dealID=${dealID}', '_blank')">
  <i class="external square alternate icon"></i>
  View Deal
</div>
                          </div>
                      </div>
                  `);

          dealsContainer.append(dealCard);
        });
      },
      error: function (xhr, status, error) {
        console.error("Error fetching deals:", error);
        dealsContainer.html(
          "<p>Error fetching deals. Please try again later.</p>"
        );
      },
    });
  }

  // Initial fetch of deals (optional)
  fetchDeals();
});
