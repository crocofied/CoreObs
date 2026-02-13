import { Elysia } from "elysia";

import { authModule } from "./modules/auth";
import { seedGlobalRoles } from "./utility/seedGlobalRoles";

// Initialize global roles on startup
await seedGlobalRoles();

export const app = new Elysia()
  .use(authModule)
  .get("/", () => "CoreObs Backend running!")

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
