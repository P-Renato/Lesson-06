import fs from 'fs';
import os from 'os';
import path from 'path';

// Detect the OS and set the appropriate root directory
let directoryPath;

if (os.platform() === "win32") {
    directoryPath = "C:\\"; // Windows root directory
} else {
    directoryPath = "/"; // macOS/Linux root directory
}

console.log(`Listing contents of: ${directoryPath}`);

try {
    const content = fs.readdirSync(directoryPath);
    console.log(content);
} catch (error) {
    console.error("Error reading directory:", error.message);
}
