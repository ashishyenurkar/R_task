
let blogPosts = [];

// Helper function to find a blog post by ID
function findPostById(id) {
  return blogPosts.find((post) => post.id === id);
}

// Controller to handle blog post operations
export const getPosts = async (req, res) => {
    const { page = 1, limit = 10, author } = req.query; // Destructuring with defaults
  
    // Filter by author if the author query parameter is provided
    let filteredPosts = blogPosts;
    if (author) {
      filteredPosts = blogPosts.filter((post) => post.author.toLowerCase() === author.toLowerCase());
    }
  
    // Calculate pagination values
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  
    // Calculate total pages for pagination metadata
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / parseInt(limit));
  
    // Return the paginated and filtered posts
    res.status(200).json({
      posts: paginatedPosts,
      currentPage: parseInt(page),
      totalPages,
      totalPosts,
    });
  };
  

export const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = findPostById(id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.status(200).json({ post });
};

export const createPost = async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Title, content, and author are required' });
  }

  const newPost = {
    id: `${Date.now()}`, // Simple ID generation using timestamp
    title,
    content,
    author,
    createdAt: new Date().toISOString(),
  };

  blogPosts.push(newPost);
  res.status(201).json({ message: 'Post created successfully', post: newPost });
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  const post = findPostById(id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Title, content, and author are required' });
  }

  post.title = title;
  post.content = content;
  post.author = author;
  post.updatedAt = new Date().toISOString();

  res.status(200).json({ message: 'Post updated successfully', post });
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const postIndex = blogPosts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  blogPosts.splice(postIndex, 1);
  res.status(200).json({ message: 'Post deleted successfully' });
};
