//logout functionallity 

document.addEventListener('DOMContentLoaded', function() {
  const logoutLink = document.getElementById('logoutLink');

  if (logoutLink) {
    logoutLink.addEventListener('click', async function(event) {
      event.preventDefault();

      // Send a request to the server to log the user out
      try {
        const response = await fetch('/logout', {
          method: 'POST',  
        });

        if (response.ok) {
          // Redirect to the home page after successful logout
          window.location.href = '/';
        } else {
          console.error('Failed to log out');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }
});