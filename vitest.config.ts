import { config } from "dotenv";
import { defineConfig } from "vitest/config";

config(); // load .env
export default defineConfig({
  test: {
    testTimeout: 60_000,
  },
});
