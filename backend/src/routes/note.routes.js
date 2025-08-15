import { Router } from "express";
import { z } from "zod";
import * as ctrl from "../controllers/note.controller.js";
import { validate } from "../middlewares/validateNote.js";

const router = Router();

const createSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  body: z.string().max(20000).optional().default(""),
});

const patchSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  body: z.string().max(20000).optional(),
});

// Routes
router.get("/", ctrl.list);
router.get("/:id", ctrl.get);
router.post("/", validate(createSchema), ctrl.create);
router.patch("/:id", validate(patchSchema), ctrl.patch);
router.delete("/:id", ctrl.remove);

export default router;
