import { Elysia, t } from "elysia";
import { db } from "../db";

export const postRoutes = new Elysia({ prefix: "/posts" })

/**
 * GET PUBLISHED POSTS
 */
.get("/", async () => {
  const [rows] = await db.query(
    "SELECT * FROM posts WHERE published = true ORDER BY created_at DESC"
  );
  return rows;
})

/**
 * GET POST BY ID
 */
.get(
  "/:id",
  async ({ params, set }) => {
    const [rows]: any = await db.query(
      "SELECT * FROM posts WHERE id = ?",
      [params.id]
    );

    if (!rows.length) {
      set.status = 404;
      return { message: "Post gak ketemu" };
    }

    return rows[0];
  },
  {
    params: t.Object({
      id: t.Number(),
    }),
  }
)

/**
 * CREATE POST
 */
.post(
  "/",
  async ({ body, set }) => {
    try {
      const { title, content, author_id } = body;

      await db.query(
        "INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)",
        [title, content, author_id ?? null]
      );

      return { message: "Post created" };
    } catch (err) {
      set.status = 400;
      return { message: "Gagal bikin post" };
    }
  },
  {
    body: t.Object({
      title: t.String(),
      content: t.String(),
      author_id: t.Optional(t.Number()),
    }),
  }
)

/**
 * UPDATE POST
 */
.put(
  "/:id",
  async ({ params, body, set }) => {
    const [result]: any = await db.query(
      "UPDATE posts SET title = ?, content = ?, published = ? WHERE id = ?",
      [body.title, body.content, body.published, params.id]
    );

    if (result.affectedRows === 0) {
      set.status = 404;
      return { message: "Update gagal. Post gak ada." };
    }

    return { message: "Post updated" };
  },
  {
    params: t.Object({
      id: t.Number(),
    }),
    body: t.Object({
      title: t.String(),
      content: t.String(),
      published: t.Boolean(),
    }),
  }
)

/**
 * DELETE POST
 */
.delete(
  "/:id",
  async ({ params, set }) => {
    const [result]: any = await db.query(
      "DELETE FROM posts WHERE id = ?",
      [params.id]
    );

    if (result.affectedRows === 0) {
      set.status = 404;
      return { message: "Delete gagal. Post gak ada." };
    }

    return { message: "Post deleted" };
  },
  {
    params: t.Object({
      id: t.Number(),
    }),
  }
);
