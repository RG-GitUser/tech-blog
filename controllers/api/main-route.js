document.addEventListener('DOMContentLoaded', function () {
    // Handle navigation clicks
    document.getElementById('main-content').addEventListener('click', function (event) {
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

function navigate(path) {
    // You can add more routes as needed
    switch (path) {
        case '/':
            loadHomePage();
            break;
        default:
            // Handle 404 or unknown paths
            loadNotFoundPage();
            break;
    }
}
function loadHomePage() {
    // Fetch the home template content
    fetch('./views/layouts/main.hbs')
        .then(response => response.text())
        .then(template => {
            // Compile the Handlebars template
            const homeTemplate = Handlebars.compile(template);

            // Render the template with data
            const html = homeTemplate(data);

            // Insert the rendered HTML into the 'main-content' div
            document.getElementById('main-content').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading home template:', error);
            loadNotFoundPage(); // 404 error
        });
}

function loadNotFoundPage() {
    const notFoundTemplate = Handlebars.compile(`
        <h2>404 Not Found</h2>
        <p>Page was not found.</p> 
    `); // error message 
    const html = notFoundTemplate();
    document.getElementById('main-content').innerHTML = html;
};