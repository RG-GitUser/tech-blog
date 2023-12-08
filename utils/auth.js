document.addEventListener('DOMContentLoaded', function() {
  // Check if the 'auth' object is defined
  if (typeof auth !== 'undefined') {
    updateUI(auth.isAuthenticated);
  }
});

function updateUI(isAuthenticated) {
  // Find the login/logout button element by ID or class
  const loginButton = document.getElementById('loginButton');
  
  // Update the button text based on the authentication status
  if (isAuthenticated) {
    loginButton.innerText = 'Log Out';
    // Assuming you have a logout link with id="logoutLink"
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
      logoutLink.style.display = 'block'; // Show the logout link
    }
  } else {
    loginButton.innerText = 'Log In';
    // Assuming you have a logout link with id="logoutLink"
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
      logoutLink.style.display = 'none'; // Hide the logout link
    }
  }
}
