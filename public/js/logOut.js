
// Assume you have a function to check if the user is logged in
function isUserLoggedIn() {
    // Implement your logic to check if the user is logged in
    // For example, check if there's a user session or token
    // Return true if logged in, false otherwise
    return localStorage.getItem('token') !== null;
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    // Get the login button element
    const loginBtn = document.getElementById('loginBtn');
  
    // Check if the user is already logged in
    if (isUserLoggedIn()) {
      // If logged in, replace the login button with a logout button
      const logoutBtn = document.createElement('button');
      logoutBtn.innerText = 'Logout';
      logoutBtn.id = 'logoutBtn';
  
      // Replace the login button with the logout button
      loginBtn.parentNode.replaceChild(logoutBtn, loginBtn);
  
      // Add a click event listener to the new logout button
      logoutBtn.addEventListener('click', function () {
        // Implement your logout logic here
        // For example, clear the user session or token
        localStorage.removeItem('token');
           // After logging out, you may want to redirect to the login page
      // or perform any other necessary actions

  
        // For the sake of this example, we'll reload the page
        location.reload();
      });
    }
  });
  