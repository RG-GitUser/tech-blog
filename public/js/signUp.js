document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#signupForm').addEventListener('submit', signupFormHandler);
});

//sign up content 
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
//check if credentials are valid 
  if (name && email && password) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
//if successful take to dashboard 
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};














document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Compile Handlebars template
    const source = document.getElementById('signup-template').innerHTML;
    const template = Handlebars.compile(source);

    // Render template with form data
    const result = template(data);

    // Display the result in the signup-template div
    document.getElementById('signup-template').innerHTML = result;
});


