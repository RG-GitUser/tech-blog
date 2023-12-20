// Function to create a blog post element
function createBlogPostElement(post) {
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
  `;
  return postItem;
}

// Function to update the UI with the latest three blog posts
function updateUI(blogPosts) {
  if (!blogPosts) {
    console.error('Blog posts data is undefined.');
    return;
  }

  const latestThreePosts = blogPosts.slice(0, 3);
  const postsList = document.createElement('ul');

  if (latestThreePosts.length > 0) {
    latestThreePosts.forEach(post => {
      const postItem = createBlogPostElement(post);
      postsList.appendChild(postItem);
    });
  } else {
    console.error('Blog posts data is empty or less than 3.');
  }

  // Append postsList to the element in the DOM
  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = ''; // Clear existing content
  postsContainer.appendChild(postsList);
}

// Delete post functionality
$(document).ready(function () {
  $('#deleteBtn').on('click', function () {
    const postId = $(this).data('post-id');
    openDeleteModal(postId);
  });
});

// Modal functionality
$(document).ready(function () {
  $('.deleteBtn').on('click', function () {
    const postId = $(this).data('post-id');
    openDeleteModal(postId);
  });

  $('#confirmDelete').on('click', function () {
    const postId = $(this).data('post-id');
    deletePost(postId);
  });
});

// Function to open the delete confirmation modal
function openDeleteModal(postId) {
  $('#confirmDelete').data('post-id', postId);
  $('#deleteModal').modal('show');
}

// Function to handle the delete action
function deletePost(postId) {
  $.ajax({
    url: `/api/post/${postId}`,
    type: 'DELETE',
    success: function (data) {
      console.log('Post deleted:', data);
      $('#deleteModal').modal('hide');
    },
    error: function (error) {
      console.error('Error deleting post:', error);
      $('#deleteModal').modal('hide');
    }
  });
}
