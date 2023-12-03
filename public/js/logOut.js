// 
// 
// app.post('/logout', (req, res) => {
//     // Destroy the session
//     req.session.destroy((err) => {
//       if (err) {
//         console.error('Error destroying session:', err);
//         res.status(500).send('Internal Server Error');
//       } else {
//         // Redirect to the login page (or any other desired destination)
//         res.redirect('/login');
//       }
//     });
//   });
// 
//    // Event listener for logout button click
//    logoutButton.addEventListener('click', async () => {
//     try {
//       // Send a request to the server to logout
//       const response = await fetch('/logout', {
//         method: 'POST',
//       });
// 
//       if (response.ok) {
//         // Redirect to the login page after successful logout
//         window.location.href = '/login';
//       } else {
//         console.error('Logout failed:', response.statusText);
//         // Handle logout failure
//       }
//     } catch (error) {
//       console.error('Error during logout:', error);
//       // Handle network or other errors
//     }
//   });
