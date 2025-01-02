document.addEventListener("DOMContentLoaded", async () => {
  const rssUrl =
    "https://api.codetabs.com/v1/proxy?quest=https://9to5google.com/feed/"; // Replace with your RSS feed URL
  const latestPostsContainer = document.getElementById(
    "latest-posts-9to5-google"
  );

  // Add a loading animation
  const loadingAnimation = document.createElement("div");
  loadingAnimation.className = "ui active centered inline loader";
  latestPostsContainer.appendChild(loadingAnimation);

  // Function to extract the first image from content
  function extractFirstImage(content) {
    if (content) {
      const imgMatch = content.match(/<img.*?src="(.*?)"/);
      if (imgMatch && imgMatch[1]) {
        return imgMatch[1];
      }
    }
    return "https://via.placeholder.com/150"; // Fallback to placeholder
  }

  // Function to clean author field
  function cleanAuthor(author) {
    return author.replace(/noreply@blogger.com\s+\(([^)]+)\)/, "$1").trim(); // Extracts name without extra parts
  }
  // Function to format the date to DD/MM/YYYY
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${year}/${month}/${day}`;
  }

  // Fetch and process RSS feed
  async function fetchLatestPosts() {
    try {
      const Parser = window.RSSParser; // Ensure RSSParser is loaded in HTML
      const parser = new Parser();
      const feed = await parser.parseURL(rssUrl);

      // Clear container and loader
      latestPostsContainer.innerHTML = "";

      // Create grid for posts
      const grid = document.createElement("div");
      grid.className = "ui stackable three column grid";

      // Display latest six posts
      feed.items.slice(0, 3).forEach((item) => {
        const title = item.title;
        const link = item.link;
        const description = item.contentSnippet || "No description available.";
        const imageUrl = extractFirstImage(item.content);
        const author = cleanAuthor(item.creator || "Unknown Author");
        const pubDate = formatDate(item.pubDate);

        // Create a card for each post
        const card = document.createElement("div");
        card.className = "column";
        card.innerHTML = `
          <div class="ui centered raised link card">
  <div class="sixteen-by-nine">
    <img src="${imageUrl}" alt="Post image">
  </div>
  <div class="content" style="text-align: center;">
    <div class="header">${title.substring(0, 75)}</div>
  </div>
  <div class="content" style="text-align: center;">
    <div class="description">${description.substring(0, 250)}...</div>
  </div>
  <div class="extra content" style="text-align: left;">
    <span><i class="calendar icon"></i> ${pubDate}</span>
  </div>
  <div class="extra content" style="text-align: left;">
    <span><i class="user icon"></i> ${author}</span>
  </div>
   <div class="ui secondary bottom attached button" onclick="window.open('${link}', '_blank')">
    <i class="external square alternate icon"></i>
    Read More
  </div>
</div>
        `;
        grid.appendChild(card);
      });

      latestPostsContainer.appendChild(grid);
    } catch (error) {
      console.error("Error fetching RSS feed:", error);
      latestPostsContainer.innerHTML =
        "<p>Error loading posts. Please try again later.</p>";
    }
  }

  // Fetch posts on page load
  await fetchLatestPosts();
});
