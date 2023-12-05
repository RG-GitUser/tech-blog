document.addEventListener('DOMContentLoaded', function () {
    const newPostForm = document.getElementById('newPostForm');
  
    newPostForm.addEventListener('submit', async function (e) {
      e.preventDefault();
  
      //assigning value to variables 
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
      const username = document.getElementById('username').value;
  
      try {
        const response = await fetch('/api/post/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content, username }),
        });
  
        if (response.ok) {
        
          window.location.href = '/'; 
        } else {
          console.error('Failed to create post');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
});
