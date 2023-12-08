//logout functionallity 

document.addEventListener('DOMContentLoaded', function() {

  var redirectMessage = document.getElementById('redirectMessage');

  // Delay for 3 seconds and then redirect to the home page
  setTimeout(function() {
    window.location.href = '/';
  }, 3000);
});