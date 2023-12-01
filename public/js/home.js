
//Function for fetching json data for posts 
document.addEventListener("DOMContentLoaded", function() {
    fetch('./seeds/blogpostData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        var homepageTemplateSource = document.getElementById('homepage-template').innerHTML;
        var homepageTemplate = Handlebars.compile(homepageTemplateSource);
  
        // Render homepage template with the latest blog posts
        var latestBlogPosts = getLatestBlogPosts(data, 5); // Change 5 to the desired number of latest posts
        var homepageHtml = homepageTemplate({ blogPosts: latestBlogPosts });
        document.getElementById('posts').innerHTML = homepageHtml;
      })
      .catch(error => {
        console.error('Error fetching blog data:', error);
      });
  });
  
  // Function to get the latest blog posts
  function getLatestBlogPosts(allBlogPosts, count) {
    // Sort blog posts by date in descending order
    const sortedPosts = allBlogPosts.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    // Slice to get the latest posts up to the specified count
    return sortedPosts.slice(0, count);
  }
  