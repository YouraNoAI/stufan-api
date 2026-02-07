import { Elysia, t } from "elysia";
import { db } from "../db";

export const attendanceRoutes = new Elysia({ prefix: "/attendance" })

  // GET ALL
  .get("/", async () => {
    const [rows] = await db.query("SELECT * FROM attendance ORDER BY date DESC");
    return rows;
  })

  // GET BY USER
  .get("/user/:user_id", async ({ params }) => {
    const [rows] = await db.query("SELECT * FROM attendance WHERE user_id = ? ORDER BY date DESC", [params.user_id]);
    return rows;
  })

  // CHECK IN
  .post(
    "/check-in",
    async ({ body }) => {
      const { user_id, date, check_in } = body;

      await db.query(
        `INSERT INTO attendance (user_id, date, check_in)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE check_in = VALUES(check_in)`,
        [user_id, date, check_in],
      );

      return { message: "Check-in success" };
    },
    {
      body: t.Object({
        user_id: t.Number(),
        date: t.String(),
        check_in: t.String(),
      }),
    },
  )

  // CHECK OUT
  .post(
    "/check-out",
    async ({ body }) => {
      const { user_id, date, check_out } = body;

      await db.query("UPDATE attendance SET check_out = ? WHERE user_id = ? AND date = ?", [check_out, user_id, date]);

      return { message: "Check-out success" };
    },
    {
      body: t.Object({
        user_id: t.Number(),
        date: t.String(),
        check_out: t.String(),
      }),
    },
  )

  // UPDATE STATUS (izin / alpha)
  .put(
    "/status/:id",
    async ({ params, body }) => {
      await db.query("UPDATE attendance SET status = ? WHERE id = ?", [body.status, params.id]);

      return { message: "Status updated" };
    },
    {
      body: t.Object({
        status: t.Union([t.Literal("hadir"), t.Literal("izin"), t.Literal("alpha")]),
      }),
    },
  )

  // DELETE
  .delete("/:id", async ({ params }) => {
    await db.query("DELETE FROM attendance WHERE id = ?", [params.id]);

    return { message: "Attendance deleted" };
  });
