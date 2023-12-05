document.addEventListener("DOMContentLoaded", function () {
  fetch('./seeds')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      var homepageTemplateSource = document.getElementById('homepage-template').innerHTML;
      var homepageTemplate = Handlebars.compile(homepageTemplateSource);

      // Process the blog post data to include comments
      var blogPostsWithComments = processBlogPostsWithComments(data);

      // Render homepage template with the latest blog posts and comments
      var latestBlogPosts = getLatestBlogPosts(blogPostsWithComments, 3); 
      var homepageHtml = homepageTemplate({ blogPosts: latestBlogPosts });
      document.getElementById('posts').innerHTML = homepageHtml;
    })
    .catch(error => {
      console.error('Error fetching blog data:', error);
    });
});

// Function to process blog post data and include comments
function processBlogPostsWithComments(allBlogPosts) {
  return allBlogPosts.map(post => {

    post.comments = post.comments || [];
    return post;
  });
}

// Function to get the latest blog posts
function getLatestBlogPosts(allBlogPosts, count) {

  const sortedPosts = allBlogPosts.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
  
  return sortedPosts.slice(0, count);
}
