document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
});



const loginFormHandler = async (event) => {
  event.preventDefault();

  // collect data from login form 
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (email && password) {
    // Send a POST request to api 
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, take user to dashboard
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};



