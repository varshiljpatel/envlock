#!/usr/bin/env node
import path from "path";
import { encryptEnv, decryptEnv } from "./wrapper.js";
import { Command } from "commander";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf-8"));

// Define interfaces for command options
interface EncryptOptions {
  env: string;
  name: string;
  output: string;
}

interface DecryptOptions {
  env: string;
  name: string;
}

const program = new Command("Envlock");

// Set the version and description of the CLI tool
program
  .version(pkg.version)
  .description(pkg.description);

program
  .command("encrypt <secret>")
  .alias("e") // Shortcut alias for encrypt
  .alias("-e") // Another shortcut alias for encrypt
  .description("Encrypt .env to env.lock file")
  .option("--env <path>", "Path to the .env file", "./") // Default path is root
  .option("--name <filename>", "Name of the .env file", ".env") // Default file name is .env
  .option("--output <path>", "Output directory for the env.lock file", "./") // Default output is root
  .action((secret: string, options: EncryptOptions) => {
    try {
      const envPath = path.join(options.env, options.name); // Construct the full path to the .env file
      const outputPath = path.join(options.output, "env.lock"); // Construct the full path to the env.lock file
      encryptEnv(envPath, secret, outputPath); // Call the encrypt function
      console.log(
        `Environment encrypted successfully to ${outputPath}`
      );
    } catch (error) {
      console.error("Encryption failed:", error instanceof Error ? error.message : String(error));
      process.exit();
    }
  });

program
  .command("decrypt <secret>")
  .alias("d") // Shortcut alias for decrypt
  .alias("-d") // Another shortcut alias for decrypt
  .description("Decrypt .envlock to .env file")
  .option("--env <path>", "Path to the env.lock file", "./") // Default path is root
  .option("--name <filename>", "Name of the output .env file", ".env") // Default file name is .env
  .action((secret: string, options: DecryptOptions) => {
    try {
      const envPath = options.env; // Path to the env.lock file
      const outputName = options.name; // Name of the output .env file
      decryptEnv(envPath, secret, outputName); // Call the decrypt function
      console.log(
        `Environment decrypted successfully to ${path.join(envPath, outputName)}`
      );
    } catch (error) {
      console.error("Decryption failed:", error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

// Export the program instance
export const cli = program;