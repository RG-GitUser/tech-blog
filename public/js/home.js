document.addEventListener("DOMContentLoaded", function () {
  const TEMPLATE_ID = 'homepage-template';
  const POSTS_CONTAINER_ID = 'posts';

  // Function to render blog posts
  function renderBlogPosts(posts) {
    var homepageTemplateSource = document.getElementById(TEMPLATE_ID).innerHTML;
    var homepageTemplate = Handlebars.compile(homepageTemplateSource);

    // Process the blog post data to include comments
    var blogPostsWithComments = processBlogPostsWithComments(posts);

    // Render homepage template with the latest blog posts and comments
    var latestBlogPosts = getLatestBlogPosts(blogPostsWithComments, 3); 
    var homepageHtml = homepageTemplate({ blogPosts: latestBlogPosts });
    document.getElementById(POSTS_CONTAINER_ID).innerHTML = homepageHtml;
  }

  fetchBlogPosts();

// Function to fetch and render blog posts
function fetchBlogPosts() {
  fetch('/api/post')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok - Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      renderBlogPosts(data);
    })
    .catch(error => {
      console.error('Error fetching blog data:', error);
    });
}
  // Event listener for a new blog post creation
  document.addEventListener('newPostCreated', function () {
    // Fetch and render the updated list of blog posts after a new post is created
    fetchBlogPosts();
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
});
