function updateUI(blogPosts) {
  if (!blogPosts) {
    console.error('Blog posts data is undefined.');
    return;
  }
  const latestThreePosts = blogPosts.slice(0, 3);

  if (latestThreePosts.length > 0) {
    const postsList = document.createElement('ul');

    latestThreePosts.forEach(post => {
      const postItem = document.createElement('li');
      postItem.innerHTML = `
        <div class="blogPostContainer">
          <p>Title: ${post.name}</p>
          <p>Content: ${post.description}</p>
          <p>Posted by ${post.user_id} on ${post.date_created}</p>
          <div class="comments">
            <h3>Comments</h3>
            <ul>
              ${post.comments.map(comment => `<li>${comment}</li>`).join('')}
            </ul>
          </div>
        </div>
      `
      console.log('testing', blogPosts)
      ;

      postsList.appendChild(postItem);
    });

    // append postsList to your element in the DOM
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = ''; // Clear existing content
    postsContainer.appendChild(postsList);
  } else {
    // Handle the case where blogPosts is empty or less than 3
    console.error('Blog posts data is empty or less than 3.');
  }
}

//Delete Post 



