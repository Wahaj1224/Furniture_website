// Fetch and display blog content
async function fetchBlogContent() {
    try {
        const response = await fetch(`http://localhost:5000/api/furni/blog_content`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch blog content');
        }

        const data = await response.json();
        console.log('Fetched blog content:', data); // Log fetched data
        createBlogArray(data);

    } catch (error) {
        console.error('Error fetching blog content:', error);
        alert('An error occurred while fetching blog content. Please try again later.');
    }
}

function createBlogArray(data) {
    const BlogArray = data.map(item => {
        // Remove the first 5 characters from item.blog_image
        const trimmedImageURL = item.blog_image.slice(4);

        return {
            blogName: item.blog_name || 'Untitled Blog',
            blogAuthor: item.blog_author || 'Unknown Author',
            blogDate: new Date(item.blog_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            blogBody: item.blog_body || 'No content available.',
            blogImage: trimmedImageURL,
            blogTimestamp: new Date(item.blog_date).getTime() // Add timestamp for sorting
        };
    });

    // Log the array of objects
    console.log('Blog Array:', BlogArray);

    // Call the appropriate display function
    displayBlogContent(BlogArray);
    displayRecentBlogs(BlogArray);
}

function displayBlogContent(BlogArray) {
    const blogContainer = document.getElementById('blogContainer');

    if (!blogContainer) {
        console.log('blogContainer not found on this page.');
        return; // If blogContainer is not found, skip the function
    }

    blogContainer.innerHTML = '';

    BlogArray.forEach(Blog => {
        const blogDiv = document.createElement('div');
        blogDiv.classList.add('col-12', 'col-sm-6', 'col-md-4', 'mb-5');
        blogDiv.innerHTML = `
            <div class="post-entry">
                <a href="#" class="post-thumbnail">
                    <img src="${Blog.blogImage}" alt="${Blog.blogName}" class="img-fluid">
                </a>
                <div class="post-content-entry">
                    <h3><a href="#">${Blog.blogName}</a></h3>
                    <div class="meta">
                        <span>by <a href="#">${Blog.blogAuthor}</a></span> <span>on <a href="#">${Blog.blogDate}</a></span>
                    </div>
                    <p>${Blog.blogBody}</p>
                </div>
            </div>
        `;

        // Append the blog post item to the container
        blogContainer.appendChild(blogDiv);
    });
}

function displayRecentBlogs(BlogArray) {
    console.log('Initial BlogArray:', BlogArray);

    // Sort blogs by date in descending order (most recent first)
    const sortedBlogs = BlogArray.sort((a, b) => b.blogTimestamp - a.blogTimestamp);
    console.log('Sorted Blogs:', sortedBlogs);

    // Get the top 3 recent blogs
    const recentBlogs = sortedBlogs.slice(0, 3);
    console.log('Recent Blogs:', recentBlogs);

    // Find the container for recent blogs
    const recentBlogContainer = document.getElementsByClassName('recentblog')[0];
    if (!recentBlogContainer) {
        
        return;
    }

    // Clear the entire recentblog container
    recentBlogContainer.innerHTML = '';

    // Create a new row container for the blogs
    const newRow = document.createElement('div');
    newRow.classList.add('row');

    // Iterate through the recent blogs and create HTML elements for each
    recentBlogs.forEach((Blog) => {
        const blogDiv = document.createElement('div');
        blogDiv.classList.add('col-12', 'col-sm-6', 'col-md-4', 'mb-4', 'mb-md-0');
        blogDiv.innerHTML = `
            <div class="post-entry">
                <a href="#" class="post-thumbnail">
                    <img src="${Blog.blogImage}" alt="${Blog.blogName}" class="img-fluid">
                </a>
                <div class="post-content-entry">
                    <h3><a href="#">${Blog.blogName}</a></h3>
                    <div class="meta">
                        <span>by <a href="#">${Blog.blogAuthor}</a></span> <span>on <a href="#">${Blog.blogDate}</a></span>
                    </div>
                </div>
            </div>
        `;
        
        // Append the blog post item to the new row container
        newRow.appendChild(blogDiv);
        console.log('Appended Blog:', Blog);
    });

    // Append the new row to the recentBlogContainer
    recentBlogContainer.appendChild(newRow);
}

// Call the function to fetch and display blog content when the page loads
document.addEventListener('DOMContentLoaded', fetchBlogContent);
