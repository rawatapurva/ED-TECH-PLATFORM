// kill-port.js
import { execSync } from "child_process";

const PORT = 3000;

try {
  const stdout = execSync(`netstat -ano | findstr :${PORT}`).toString();
  const lines = stdout.split('\n');

  for (const line of lines) {
    const parts = line.trim().split(/\s+/);
    const pid = parts[parts.length - 1];
    if (pid) {
      console.log(`Killing process on port ${PORT} with PID ${pid}`);
      execSync(`taskkill /PID ${pid} /F`);
    }
  }
} catch (err) {
  console.log(`No process running on port ${PORT}`);
}
