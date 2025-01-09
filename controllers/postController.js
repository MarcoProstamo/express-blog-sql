const postController = {
  index(req, res) {
    res.send("Listing all posts");
  },
  show(req, res) {
    res.send(`Showing post with ID ${req.params.id}`);
  },
  create(req, res) {
    res.send("Creating a new post");
  },
  update(req, res) {
    res.send(`Updating post with ID ${req.params.id}`);
  },
  modify(req, res) {
    res.send(`Partially modifying post with ID ${req.params.id}`);
  },
  destroy(req, res) {
    res.send(`Deleting post with ID ${req.params.id}`);
  },
};

export default postController;
