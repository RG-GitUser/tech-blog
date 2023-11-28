
//blog post data 

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
  
  var template = Handlebars.compile('');
  var result = template(jsonData);
  
  document.getElementById("posts").innerHTML = result;