import { Elysia } from "elysia";
import { db } from "../db";
import fs from "fs";
import path from "path";

export const initRoutes = new Elysia({ prefix: "/init" }).post(
  "/",
  async ({ set, headers }) => {
    try {
      // 🔐 SIMPLE PROTECTION
      if (headers["x-init-key"] !== process.env.INIT_KEY) {
        set.status = 401;
        return { message: "Unauthorized" };
      }

      const sqlPath = path.join(process.cwd(), "init.sql");

      if (!fs.existsSync(sqlPath)) {
        set.status = 500;
        return { message: "init.sql not found" };
      }

      const sql = fs.readFileSync(sqlPath, "utf-8");

      if (!sql.trim()) {
        set.status = 400;
        return { message: "SQL file empty" };
      }

      await db.query(sql);

      return {
        success: true,
        message: "Database initialized",
      };
    } catch (err) {
      console.error("INIT ERROR:", err);
      set.status = 500;
      return {
        success: false,
        message: "Init failed",
      };
    }
  }
);
