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
    if (isNaN(id)) return res.status(400).json({ error: "Bad Request" });

    const sql = "SELECT * FROM post.posts WHERE id = ?";
    connection.query(sql, [id], (err, data) => {
      if (err) return res.status(500).json({ error: err?.sqlMessage });
      if (data.length === 0)
        return res.status(404).json({ error: "Post Not Found" });

      res.json(data);
    });
  },

  create(req, res) {
    const { title, content, image } = req.body;
    if (!title || !content || !image) {
      return res.status(400).json({ error: "Bad Request" });
    }

    const insertSql =
      "INSERT INTO `post`.`posts` (`title`, `content`, `image`) VALUES (?, ?, ?)";
    connection.query(insertSql, [title, content, image], (err, data) => {
      if (err) return res.status(500).json({ error: err?.sqlMessage });

      if (data.affectedRows === 0)
        return res.status(404).json({ error: "Post Not Created" });

      // Fetch all posts and return the response
      const selectSql = "SELECT * FROM post.posts";
      connection.query(selectSql, (err, data) => {
        if (err) return res.status(500).json({ error: err?.sqlMessage });

        res.status(201).json(data);
      });
    });
  },

  update(req, res) {
    res.send(`Updating post with ID ${req.params.id}`);
  },

  modify(req, res) {
    res.send(`Partially modifying post with ID ${req.params.id}`);
  },

  destroy(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(500).json({ error: "Bad Request" });

    const destroySql = "DELETE FROM post.posts WHERE id = ?";
    connection.query(destroySql, [id], (err, data) => {
      if (err) return res.status(500).json({ error: err?.sqlMessage });

      if (data.affectedRows === 0)
        return res.status(404).json({ error: "Post Not Destroyed" });

      // Fetch all posts and return the response
      const selectSql = "SELECT * FROM post.posts";
      connection.query(selectSql, (err, data) => {
        if (err) return res.status(500).json({ error: err?.sqlMessage });

        // Not Works as intended
        // res.status(204).json(data);

        // Works but not as intended
        res.json(data);
      });
    });
  },
};

export default postController;
