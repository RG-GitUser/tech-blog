document.addEventListener('DOMContentLoaded', function () {
    // Assuming you have a form with the id 'newPostForm'
    const newPostForm = document.getElementById('newPostForm');

    newPostForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const content = document.getElementById('description').value.trim();

        try {
            const response = await fetch('/api/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, content }),
            });

            if (response.ok) {
                // Redirect to the updated dashboard after creating the post
                window.location.href = '/dashboard';
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});


