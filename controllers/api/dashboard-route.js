document.addEventListener('DOMContentLoaded', function () {
  // Handle navigation clicks
  document.getElementById('dashboard-content').addEventListener('click', function (event) {
      const clickedLink = event.target.closest('a');
      if (clickedLink) {
          event.preventDefault();
          const linkPath = clickedLink.getAttribute('href');
          navigate(linkPath);
      }
  });

  // Initial page load
  navigate(window.location.pathname);
});

//function for routes
function navigate(path) {
  
  switch (path) {
      case '/':
          loadHomePage();
          break;
      default:
          // Handle 404 
          loadNotFoundPage();
          break;
  }
}
function loadDashboardPage() {
  // Fetch the dashboard template content
  fetch('views/layouts/dashboard.handlebars')
      .then(response => response.text())
      .then(template => {
          // Compile the Handlebars template
          const dashboardTemplate = Handlebars.compile(template);

          // Render the template with data
          const html = dashboardTemplate(data);

          // Insert the rendered HTML into the 'main-content' div
          document.getElementById('dashboard-content').innerHTML = html;
      })
      .catch(error => {
          console.error('Error loading dashboard template:', error);
          loadNotFoundPage(); // 404 error
      });
}

function loadNotFoundPage() {
  const notFoundTemplate = Handlebars.compile(`
      <h2>404 Not Found</h2>
      <p>Page was not found.</p> 
  `); // error message 
  const html = notFoundTemplate();
  document.getElementById('dashboard-content').innerHTML = html;
};