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

//Modal functionality 

document.body.addEventListener('click', async function (event) {
  if (event.target.matches('.btn-danger')) {
    const postId = event.currentTarget.dataset.postId;

    // Make an AJAX request to delete the post
    $.ajax({
      url: `/api/posts/${postId}`,
      type: 'DELETE',
      success: function (data) {
        // Handle success, update UI, remove the blog post container, etc.
        console.log('Blog post deleted:', data.message);
        // Remove the blog post container
        $('.blogPostContainer').remove();
        // Close the modal
        $('#deleteModal').modal('hide');
      },
      error: function (error) {
        // Handle error and show an error message
        console.error('Error deleting blog post:', error.responseJSON.message);
        // Close the modal even in case of an error
        $('#deleteModal').modal('hide');
      }
    });
  }
});

  console.log('Blog post deleted!');
  
  // Close the modal
  $('#deleteModal').modal('hide');

