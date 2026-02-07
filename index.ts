import { Elysia } from "elysia";
import cors from "@elysiajs/cors";

import { initRoutes } from "./src/routes/init";
import { usersRoutes } from "./src/routes/users";
import { attendanceRoutes } from "./src/routes/attendance";
import { assignmentRoutes } from "./src/routes/assignments";
import { submissionRoutes } from "./src/routes/submissions";
import { postRoutes } from "./src/routes/posts";

const app = new Elysia()
.use(cors())
.use(initRoutes)
.use(usersRoutes)
.use(attendanceRoutes)
.use(assignmentRoutes)
.use(submissionRoutes)
.use(postRoutes)

module.exports = app
