
function logoutUser() {
    // Implement your logout logic here
    // For example, clear the user session or token
    localStorage.removeItem('token'); // Assuming you're using localStorage for the token
  
    // Redirect to the login page
    window.location.href = '/login'; // Replace '/login' with the actual path to your login page
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
        // Call the logoutUser function when the logout button is clicked
        logoutUser();
      });
    }
  });
  