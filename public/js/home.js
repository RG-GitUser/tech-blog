// Sample data for demonstration
const data = {
    blogPosts: [
        { title: 'Post 1' },
        { title: 'Post 2' },
        // Add more blog posts as needed
    ],
};

// Compile the Handlebars template
const homepageTemplate = Handlebars.compile(document.getElementById('homepage-template').innerHTML);

// Render the homepage 
document.getElementById('main-content').innerHTML = homepageTemplate(data);

// Add event listener for the homepage link
document.getElementById('homepage-link').addEventListener('click', (event) => {
    event.preventDefault();
    // Handle homepage link click 
    console.log('Homepage link clicked');
    window.location.href = '/';
});

document.getElementById('dashboard-link').addEventListener('click', () => {
    // Handle dashboard link click (e.g., navigate to the dashboard)
    console.log('Dashboard link clicked');
});

document.getElementById('login-link').addEventListener('click', () => {
    // Handle login link click 
    console.log('Login link clicked');
});
