document.addEventListener('DOMContentLoaded', function () {
    // Initialize the router
    const router = new SimpleRouter();

    // Register a route for the dashboard
    router.addRoute('/dashboard', function () {
        loadDashboardPage();
    });

    // Handle initial route
    router.handleRoute();

    // Sample data for illustration
    const data = {
        pageTitle: 'Dashboard Page',
        message: 'This is your dashboard content.'
    };

    // Function to load the dashboard page
    function loadDashboardPage() {
        // Compile Handlebars template
        const source = document.getElementById('dashboard-template').innerHTML;
        const template = Handlebars.compile(source);

        // Render the template with data
        const html = template(data);

        // Insert the rendered HTML into the DOM
        document.getElementById('dashboard-content').innerHTML = html;

        console.log('Dashboard page loaded!');
    }
});
