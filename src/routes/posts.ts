import { Elysia, t } from "elysia";
import { db } from "../db";

export const postRoutes = new Elysia({ prefix: "/posts" })

  .get("/", async () => {
    const rows = await db.query("SELECT * FROM posts WHERE published = true ORDER BY created_at DESC");
    return rows;
  })

  .get("/:id", async ({ params }) => {
    const [rows]: any = await db.query("SELECT * FROM posts WHERE id = ?", [params.id]);

    return rows[0] ?? null;
  })

  .post(
    "/",
    async ({ body }) => {
      const { title, content, author_id } = body;

      await db.query("INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)", [title, content, author_id ?? null]);

      return { message: "Post created" };
    },
    {
      body: t.Object({
        title: t.String(),
        content: t.String(),
        author_id: t.Optional(t.Number()),
      }),
    },
  )

  .put(
    "/:id",
    async ({ params, body }) => {
      const { title, content, published } = body;

      await db.query("UPDATE posts SET title = ?, content = ?, published = ? WHERE id = ?", [title, content, published, params.id]);

      return { message: "Post updated" };
    },
    {
      body: t.Object({
        title: t.String(),
        content: t.String(),
        published: t.Boolean(),
      }),
    },
  )

  .delete("/:id", async ({ params }) => {
    await db.query("DELETE FROM posts WHERE id = ?", [params.id]);

    return { message: "Post deleted" };
  });
