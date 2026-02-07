import { Elysia, t } from "elysia";
import { db } from "../db";

export const usersRoutes = new Elysia({ prefix: "/users" })
  .get("/", async () => {
    const rows = await db.query("SELECT id, name, email, role, created_at FROM users");
    return rows;
  })
  .post(
    "/",
    async ({ body }) => {
      const { name, email, password, role } = body;

      await db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, password, role ?? "student"]);

      return { message: "User created" };
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
        role: t.Optional(t.Union([t.Literal("admin"), t.Literal("student")])),
      }),
    },
  )
  .put(
    "/:id",
    async ({ params, body }) => {
      const { id } = params;
      const { name, email, role } = body;

      await db.query("UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?", [name, email, role, id]);

      return { message: "User updated" };
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        role: t.Optional(t.String()),
      }),
    },
  )
  .delete("/:id", async ({ params }) => {
    await db.query("DELETE FROM users WHERE id = ?", [params.id]);

    return { message: "User deleted" };
  });
