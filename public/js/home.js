// Blog post data
var jsonData = {
    "blogPost": {
      "title": "My Blog Post",
      "content": "This is the content of my blog post. It can include text, images, and other HTML elements."
    },
    "comments": [
      "Comment 1",
      "Comment 2",
      "Comment 3"
    ]
  };
  
  // Load the homepage template
  var homepageTemplateSource = document.getElementById('homepage-template').innerHTML;
  var homepageTemplate = Handlebars.compile(homepageTemplateSource);
  
  // Render the homepage template with blog post data
  var homepageHtml = homepageTemplate(jsonData);
  
  // Insert the rendered HTML into the DOM
  document.getElementById('homepage-template').innerHTML = homepageHtml;
  
  // Additional template for blog post data
  var template = Handlebars.compile('<h2>{{blogPost.title}}</h2><p>{{blogPost.content}}</p>');
  var result = template(jsonData);
  
  // Insert the rendered HTML into the DOM
  document.getElementById("posts").innerHTML = result;
  