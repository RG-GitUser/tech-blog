//sign up content 
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};


document
  .querySelector('.signupForm')
  .addEventListener('submit', signupFormHandler);













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


