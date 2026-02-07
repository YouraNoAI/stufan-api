import { Elysia } from "elysia";
import { db } from "../db";

export const initRoutes = new Elysia({ prefix: "/init" }).post("/", async () => {
  try {
    const sql = await Bun.file("../init.sql").text();
    await db.query(sql);

    return {
      success: true,
      message: "Database initialized",
    };
  } catch (err) {
    console.error("INIT ERROR:", err);
    return {
      success: false,
      message: "Init failed",
    };
  }
});
