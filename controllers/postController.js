import { connection } from "../connections/connections.js";

const postController = {
  index(req, res) {
    const sql = "SELECT * FROM post.posts";
    connection.query(sql, (err, data) => {
      if (err) return res.status(500).json({ error: err?.sqlMessage });
      res.json(data);
    });
  },
  show(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(500).json({ error: "Bad Request" });

    const sql = "SELECT * FROM post.posts WHERE id = ?";
    connection.query(sql, [id], (err, data) => {
      if (err) return res.status(500).json({ error: err?.sqlMessage });
      if (data.length === 0)
        return res.status(404).json({ error: "Post Not Found" });

      res.json(data);
    });
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
