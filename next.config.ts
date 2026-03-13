import type { NextConfig } from "next";
import { execSync } from "child_process";

let commitHash = "unknown";
try {
  commitHash = execSync("git rev-parse --short HEAD").toString().trim();
} catch {
  // not a git repo or git not available
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_COMMIT_HASH: commitHash,
  },
};

export default nextConfig;
