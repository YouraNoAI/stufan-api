import { Elysia, t } from "elysia";
import { db } from "../db";

export const assignmentRoutes = new Elysia({ prefix: "/assignments" })

  // =========================
  // GET ALL ASSIGNMENTS
  // =========================
  .get("/", async () => {
    const [rows] = await db.query(
      "SELECT * FROM assignments ORDER BY created_at DESC"
    );
    return rows;
  })

  // =========================
  // GET ASSIGNMENT BY ID
  // =========================
  .get(
    "/:id",
    async ({ params }) => {
      const [rows]: any = await db.query(
        "SELECT * FROM assignments WHERE id = ?",
        [params.id]
      );

      return rows[0] ?? null;
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )

  // =========================
  // CREATE ASSIGNMENT
  // =========================
  .post(
    "/",
    async ({ body, set }) => {
      const { title, description, deadline } = body;

      await db.query(
        `
        INSERT INTO assignments (title, description, deadline)
        VALUES (?, ?, ?)
        `,
        [
          title,
          description ?? null,
          deadline ?? null,
        ]
      );

      set.status = 201;
      return { message: "Assignment created" };
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.Optional(t.String()),
        deadline: t.Optional(t.String()), // YYYY-MM-DD
      }),
    }
  )

  // =========================
  // UPDATE ASSIGNMENT
  // =========================
  .put(
    "/:id",
    async ({ params, body }) => {
      const { title, description, deadline } = body;

      await db.query(
        `
        UPDATE assignments
        SET title = ?, description = ?, deadline = ?
        WHERE id = ?
        `,
        [
          title,
          description ?? null,
          deadline ?? null,
          params.id,
        ]
      );

      return { message: "Assignment updated" };
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      body: t.Object({
        title: t.String(),
        description: t.Optional(t.String()),
        deadline: t.Optional(t.String()),
      }),
    }
  )

  // =========================
  // DELETE ASSIGNMENT
  // =========================
  .delete(
    "/:id",
    async ({ params }) => {
      await db.query(
        "DELETE FROM assignments WHERE id = ?",
        [params.id]
      );

      return { message: "Assignment deleted" };
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );
