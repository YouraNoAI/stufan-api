import { Elysia, t } from "elysia";
import { db } from "../db";

export const submissionRoutes = new Elysia({ prefix: "/submissions" })

/**
 * CREATE SUBMISSION
 */
.post(
  "/",
  async ({ body, set }) => {
    try {
      const { assignment_id, user_id, github_url } = body;

      await db.query(
        "INSERT INTO submissions (assignment_id, user_id, github_url) VALUES (?, ?, ?)",
        [assignment_id, user_id, github_url]
      );

      return { message: "Submitted" };
    } catch (err: any) {
      set.status = 400;
      return {
        message: "Submit gagal. Cek assignment_id / user_id lu.",
        error: err.code,
      };
    }
  },
  {
    body: t.Object({
      assignment_id: t.Number(),
      user_id: t.Number(),
      github_url: t.String(),
    }),
  }
)

/**
 * GET ALL
 */
.get("/", async () => {
  const [rows] = await db.query("SELECT * FROM submissions");
  return rows;
})

/**
 * GET BY ID
 */
.get(
  "/:id",
  async ({ params, set }) => {
    const [rows]: any = await db.query(
      "SELECT * FROM submissions WHERE id = ?",
      [params.id]
    );

    if (!rows.length) {
      set.status = 404;
      return { message: "Submission gak ketemu" };
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
 * UPDATE
 */
.put(
  "/:id",
  async ({ params, body, set }) => {
    const [result]: any = await db.query(
      "UPDATE submissions SET github_url = ? WHERE id = ?",
      [body.github_url, params.id]
    );

    if (result.affectedRows === 0) {
      set.status = 404;
      return { message: "Update gagal. Data gak ada." };
    }

    return { message: "Updated" };
  },
  {
    params: t.Object({
      id: t.Number(),
    }),
    body: t.Object({
      github_url: t.String(),
    }),
  }
)

/**
 * DELETE
 */
.delete(
  "/:id",
  async ({ params, set }) => {
    const [result]: any = await db.query(
      "DELETE FROM submissions WHERE id = ?",
      [params.id]
    );

    if (result.affectedRows === 0) {
      set.status = 404;
      return { message: "Delete gagal. Data gak ada." };
    }

    return { message: "Deleted" };
  },
  {
    params: t.Object({
      id: t.Number(),
    }),
  }
);
