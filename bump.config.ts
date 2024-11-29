import { defineConfig } from "bumpp";

export default defineConfig({
  files: ["packages/**/package.json", "extensions/**/package.json"],
  recursive: true,
});
