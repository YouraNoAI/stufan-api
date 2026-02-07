import { Elysia, t } from "elysia";
import { db } from "../db";

export const attendanceRoutes = new Elysia({ prefix: "/attendance" })

  // =========================
  // GET ALL ATTENDANCE
  // =========================
  .get("/", async () => {
    const [rows] = await db.query(
      "SELECT * FROM attendance ORDER BY date DESC"
    );
    return rows;
  })

  // =========================
  // GET BY USER
  // =========================
  .get(
    "/user/:user_id",
    async ({ params }) => {
      const [rows] = await db.query(
        "SELECT * FROM attendance WHERE user_id = ? ORDER BY date DESC",
        [params.user_id]
      );
      return rows;
    },
    {
      params: t.Object({
        user_id: t.Numeric(),
      }),
    }
  )

  // =========================
  // CHECK IN
  // =========================
  .post(
    "/check-in",
    async ({ body, set }) => {
      const { user_id, date, check_in } = body;

      await db.query(
        `
        INSERT INTO attendance (user_id, date, check_in, status)
        VALUES (?, ?, ?, 'hadir')
        ON DUPLICATE KEY UPDATE
          check_in = VALUES(check_in),
          status = 'hadir'
        `,
        [user_id, date, check_in]
      );

      set.status = 201;
      return { message: "Check-in success" };
    },
    {
      body: t.Object({
        user_id: t.Number(),
        date: t.String(),      // YYYY-MM-DD
        check_in: t.String(),  // HH:mm:ss
      }),
    }
  )

  // =========================
  // CHECK OUT
  // =========================
  .post(
    "/check-out",
    async ({ body, set }) => {
      const { user_id, date, check_out } = body;

      const [rows]: any = await db.query(
        "SELECT id FROM attendance WHERE user_id = ? AND date = ?",
        [user_id, date]
      );

      if (!rows.length) {
        set.status = 400;
        return { message: "User has not checked in yet" };
      }

      await db.query(
        "UPDATE attendance SET check_out = ? WHERE user_id = ? AND date = ?",
        [check_out, user_id, date]
      );

      return { message: "Check-out success" };
    },
    {
      body: t.Object({
        user_id: t.Number(),
        date: t.String(),
        check_out: t.String(),
      }),
    }
  )

  // =========================
  // UPDATE STATUS
  // =========================
  .put(
    "/status/:id",
    async ({ params, body }) => {
      await db.query(
        "UPDATE attendance SET status = ? WHERE id = ?",
        [body.status, params.id]
      );

      return { message: "Status updated" };
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      body: t.Object({
        status: t.Union([
          t.Literal("hadir"),
          t.Literal("izin"),
          t.Literal("alpha"),
        ]),
      }),
    }
  )

  // =========================
  // DELETE
  // =========================
  .delete(
    "/:id",
    async ({ params }) => {
      await db.query(
        "DELETE FROM attendance WHERE id = ?",
        [params.id]
      );

      return { message: "Attendance deleted" };
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );
