import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();

router.get("/", postController.index);
router.get("/:id", postController.show);
router.post("/", postController.create);
router.put("/:id", postController.update);
router.patch("/:id", postController.modify);
router.delete("/:id", postController.destroy);

export { router };
