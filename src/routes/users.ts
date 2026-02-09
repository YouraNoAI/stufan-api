import { Elysia, t } from "elysia";
import { db } from "../db";

export const usersRoutes = new Elysia({ prefix: "/users" })

  // GET ALL USERS
  .get("/", async () => {
    const [rows] = await db.query(
      "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC"
    );
    return rows;
  })

  // GET USER BY ID
  .get("/:id", async ({ params }) => {
    const [rows]: any = await db.query(
      "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
      [params.id]
    );

    return rows[0] ?? null;
  })

  // CREATE USER
  .post(
    "/",
    async ({ body }) => {
      const { name, email, password, role } = body;

      // hash password (bun native)
      const hashedPassword = await Bun.password.hash(password);

      await db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, role ?? "student"]
      );

      return { message: "User created" };
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
        role: t.Optional(
          t.Union([t.Literal("admin"), t.Literal("student")])
        ),
      }),
    }
  )

  // UPDATE USER
  .put(
    "/:id",
    async ({ params, body }) => {
      const { name, email, role } = body;

      await db.query(
        "UPDATE users SET name = ?, email = ?, password = ?, role = ?, WHERE id = ?", name, email, password, role, params.id]
      );

      return { message: "User updated" };
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        role: t.Optional(
          t.Union([t.Literal("admin"), t.Literal("student")])
        ),
      }),
    }
  )

  // DELETE USER
  .delete("/:id", async ({ params }) => {
    await db.query("DELETE FROM users WHERE id = ?", [params.id]);

    return { message: "User deleted" };
  });
