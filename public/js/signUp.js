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

    // Display the result
    document.body.innerHTML = result;
  });