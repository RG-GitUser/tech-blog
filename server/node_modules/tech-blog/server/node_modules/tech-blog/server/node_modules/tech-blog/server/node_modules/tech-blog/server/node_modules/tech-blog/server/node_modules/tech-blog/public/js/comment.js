document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentTextArea = document.getElementById('comment');
    const commentsList = document.getElementById('comments');
  
    if (commentForm) {
      commentForm.addEventListener('submit', async function(event) {
        event.preventDefault();
  
        // Get the comment text from the textarea
        const commentText = commentTextArea.value.trim();
  
        // Check if the comment is not empty
        if (!commentText) {
          alert('Please enter a comment.');
          return;
        }
  
        // Get the post ID from the HTML data
        const postId = commentForm.getAttribute('data-post-id');
  
        // Send a request to the server to add a new comment
        try {
          const response = await fetch(`/api/post/${postId}/comment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              comment: commentText,
            }),
          });
  
          if (response.ok) {
            // Parse the JSON response
            const newComment = await response.json();
  
            // Update the UI with the new comment
            const commentItem = document.createElement('li');
            commentItem.textContent = newComment.text;
            commentsList.appendChild(commentItem);
  
            // Clear the textarea
            commentTextArea.value = '';
          } else {
            console.error('Failed to add comment');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    }
  });
  