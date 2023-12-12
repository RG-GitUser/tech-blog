// home.js

document.addEventListener('DOMContentLoaded', async function () {
  try {
    // Make a fetch request to get the blog posts from the server
    const response = await fetch('/api/post'); 
    const blogPosts = await response.json();

    // Update the UI with the retrieved blog posts
    updateUI(blogPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }
});

function updateUI(blogPosts) {
  const postsContainer = document.getElementById('posts');

  if (blogPosts.length > 0) {
    const postsList = document.createElement('ul');

    blogPosts.forEach(post => {
      const postItem = document.createElement('li');
      postItem.innerHTML = `
        <div class="blogPostContainer">
          <p>Title: ${post.name}</p>
          <p>Content: ${post.content}</p>
          <p>Posted by ${post.username} on ${post.dateCreated}</p>
          <div class="comments">
            <h3>Comments</h3>
            <ul>
              ${post.comments.map(comment => `<li>${comment}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;

      postsList.appendChild(postItem);
    });

    postsContainer.appendChild(postsList);
  } else {
    postsContainer.innerHTML = '<p>No blog posts yet.</p>';
  }
}
