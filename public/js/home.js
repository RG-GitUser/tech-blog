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

 //Delete post functionality 

 $(document).ready(function () {
  // Add an event listener for the delete button click
  $('.btn-danger').on('click', function () {
    const postId = $(this).data('post-id');

    // Store the post ID in a data attribute of the delete button
    $('#confirmDelete').data('post-id', postId);

    // Show the modal
    $('#deleteModal').modal('show');
  });

  // Add an event listener for the confirm delete button click
  $('#confirmDelete').on('click', function () {
    const postId = $(this).data('post-id');
    
    // Call a function to handle the delete (AJAX or form submission)
    deletePost(postId);
  });

  function deletePost(postId) {
    // AJAX request to delete a post
    $.ajax({
      url: `/api/posts/${postId}`,
      type: 'DELETE',
      success: function (data) {
        // Handle success 
        console.log('Post deleted:', data);

        // Close the modal after deletion
        $('#deleteModal').modal('hide');

        // Remove the blog post container
        $(`.blogPostContainer[data-post-id="${postId}"]`).remove();
      },
      error: function (error) {
        // Handle error 
        console.error('Error deleting post:', error);

        // Close the modal even in case of an error
        $('#deleteModal').modal('hide');
      }
    });
  }
});
