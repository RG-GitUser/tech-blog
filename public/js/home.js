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
$(document).ready(function() {
  $('#deleteBtn').on('click', function () {
    const postId = $(this).data('post-id');

    $.ajax({     // ajax request to delete post
      url: `/api/post/${postId}`,
      type: 'DELETE',
      success: function (data) {
        console.log('Blog post deleted:', data.message);  // success message
        $('.blogPostContainer').remove();
      },
      error: function (error) {
        console.error('Error deleting blog post:', error.responseJSON.message);
      }            // error message for deleting blog posts
    }); 
  });
});

//modal functionality 

$('#deleteBtn').on('click', function () {
  // show the delete modal
  $('#deleteModal').modal('show');
});

// event listener setup for the "Confirm Delete" button
$('#confirmDelete').on('click', function () {

  const postId = $('#deleteBtn').data('post-id');


  // ajax request to delete the blog post
  $.ajax({
      url: `/api/posts/${postId}`,
      type: 'DELETE',
      success: function (data) {
          // Handle success, update UI, etc.
          console.log('Blog post deleted:', data);

          // close the modal after deletion
          $('#deleteModal').modal('hide');
    
      },
      error: function (error) {
          // handle error with error message
          console.error('Error deleting blog post:', error);
          
          // close the modal even in case of an error
          $('#deleteModal').modal('hide');
      }
  });
});