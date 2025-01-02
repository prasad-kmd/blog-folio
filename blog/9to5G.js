document.addEventListener("DOMContentLoaded", () => {
  const rssUrl = "https://9to5google.com/feed/"; // Replace with your RSS feed URL
  //Add "https://api.codetabs.com/v1/proxy?quest=" if you're getting CORS error
  const blogPostsContainer = document.getElementById("blog-posts-9to5g");

  // Add a loading animation
  const loadingAnimation = document.createElement("div");
  loadingAnimation.className = "ui active centered inline loader";
  blogPostsContainer.appendChild(loadingAnimation);

  // Function to format the date to DD/MM/YYYY
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${year}/${month}/${day}`;
  }

  // Function to fetch and parse RSS feed
  async function fetchAllPosts() {
    try {
      const response = await fetch(rssUrl);
      const rssText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(rssText, "application/xml");
      const items = xmlDoc.querySelectorAll("item");

      // Clear container and loader
      blogPostsContainer.innerHTML = "";

      // Display all blog posts
      items.forEach((item) => {
        const title = item.querySelector("title").textContent;
        const link = item.querySelector("link").textContent;
        const pubDate = formatDate(item.querySelector("pubDate").textContent);

        // Create a list item for each post
        const listItem = document.createElement("div");
        listItem.className = "item";
        listItem.innerHTML = `
              <i class="large file alternate outline middle aligned icon"></i>
              <div class="content">
                <a class="header" href="${link}" target="_blank">${title}</a>
                <div class="description">Published on ${pubDate}</div>
              </div>
            `;
        blogPostsContainer.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error fetching RSS feed:", error);
      blogPostsContainer.innerHTML =
        "<p>Error loading posts. Please try again later.</p>";
    }
  }

  // Fetch posts on page load
  fetchAllPosts();
});
