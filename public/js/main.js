
//blog posts
document.addEventListener('DOMContentLoaded', () => {
    const data = {
      blogPosts: [
        { title: 'Post 1' },
        { title: 'Post 2' },
      ],
    };
}); 
  
// Compile the Handlebars template
const homepageTemplate = Handlebars.compile(document.getElementById('homepage-template').innerHTML);

// Render the homepage 
document.getElementById('main-content').innerHTML = homepageTemplate(data);

// Add event listener for all links inside main-content
document.getElementById('main-content').addEventListener('click', (event) => {
    const clickedLink = event.target.closest('a');
    if (clickedLink) {
        event.preventDefault();
        const linkId = clickedLink.id;
        switch (linkId) {
            case 'homepage-link':
                console.log('Homepage link clicked');
                window.location.href = '/';
                break;
            case 'dashboard-link':
                console.log('Dashboard link clicked');
                break;
            case 'login-link':
                console.log('Login link clicked');
                break;
            // Add more cases for other links 
        }
    }
});
