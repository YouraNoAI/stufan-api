import { Elysia, t } from "elysia";
import { db } from "../db";

export const submissionRoutes = new Elysia({ prefix: "/submissions" })

  .post(
    "/",
    async ({ body }) => {
      const { assignment_id, user_id, github_url } = body;

      await db.query(
        "INSERT INTO submissions (assignment_id, user_id, github_url) VALUES (?, ?, ?)",
        [assignment_id, user_id, github_url]
      );

      return { message: "Submitted" };
    },
    {
      body: t.Object({
        assignment_id: t.Number(),
        user_id: t.Number(),
        github_url: t.String(),
      }),
    }
  )

  // GET ALL
  .get("/", async () => {
    const [rows] = await db.query(`
      SELECT * FROM submissions
    `);

    return rows;
  })

  .get("/:id", async ({ params }) => {
    const [rows]: any = await db.query(
      "SELECT * FROM submissions WHERE id = ?",
      [params.id]
    );

    return rows[0] ?? null;
  })

  // UPDATE
  .put(
    "/:id",
    async ({ params, body }) => {
      const { github_url } = body;

      await db.query(
        "UPDATE submissions SET github_url = ? WHERE id = ?",
        [github_url, params.id]
      );

      return { message: "Updated" };
    },
    {
      body: t.Object({
        github_url: t.String(),
      }),
    }
  )

  .delete("/:id", async ({ params }) => {
    await db.query(
      "DELETE FROM submissions WHERE id = ?",
      [params.id]
    );

    return { message: "Deleted" };
  });
