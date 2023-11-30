document.addEventListener('DOMContentLoaded', function() {
    // Compile the Handlebars template
    const loginTemplate = Handlebars.compile(`
      <!-- login.handlebars -->
      <h2>Login</h2>
      <form id="login-form">
        <div>
          <label for="username">Username/Email:</label>
          <input type="text" id="username" value="{{username}}" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" value="{{password}}" />
        </div>
        <button type="submit">Login</button>
      </form>
    `);
  
    // Define the data for the template
    const data = {
      username: '',
      password: ''
    };
  
    // Render the compiled template with the data
    const renderedHtml = loginTemplate(data);
  
    // Insert the generated HTML into the desired location in your application
    document.getElementById('login-form').innerHTML = renderedHtml;
  });