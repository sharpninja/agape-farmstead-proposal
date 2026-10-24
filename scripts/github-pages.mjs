import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const candidates = ["dist/client", ".vercel/output/static", "dist"];
const root = candidates.find((dir) => existsSync(dir));
if (!root) {
  console.error("[pages] no static build output found");
  process.exit(1);
}

function walk(dir, found = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, found);
    else if (entry.name.endsWith(".html")) found.push(full);
  }
  return found;
}

const html = walk(root);
console.log("[pages] output", root);
console.log("[pages] html", html.join(", ") || "(none)");
const shell = html.find((file) => file.endsWith("_shell.html")) ?? html.find((file) => file.endsWith("index.html"));
if (!shell || !statSync(shell).isFile()) {
  console.error("[pages] shell html missing");
  process.exit(1);
}

const out = "docs";
rmSync(out, { recursive: true, force: true });
cpSync(root, out, { recursive: true });
cpSync(shell, join(out, "index.html"));
cpSync(shell, join(out, "404.html"));
writeFileSync(join(out, ".nojekyll"), "");
console.log("[pages] published", out, "from", shell);
