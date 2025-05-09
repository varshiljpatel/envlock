import * as fs from 'fs';
import * as path from 'path';
import { encrypt, decrypt } from 'envlock';

/**
 * Encrypts the contents of a .env file and writes the encrypted data to a env.lock file.
 *
 * @param {string} envPath - The full path to the .env file to be encrypted.
 * @param {string} secret - The secret key used for encryption.
 * @param {string} outputPath - The directory where the env.lock file will be saved.
 * @throws Will throw an error if the .env file does not exist.
 */
export function encryptEnv(envPath: string, secret: string, outputPath: string) {
  // Check if the .env file exists
  if (!fs.existsSync(envPath)) {
    throw new Error(`The .env file at ${envPath} does not exist.`);
  }

  // Read the contents of the .env file
  const content = fs.readFileSync(envPath, 'utf8');

  // Encrypt the contents using the provided secret
  const encrypted = encrypt(content, secret);

  // Construct the full path to the output env.lock file
  const outputFilePath = path.join(outputPath, 'env.lock');

  // Write the encrypted data to the env.lock file
  fs.writeFileSync(outputFilePath, encrypted);

  // Update the .gitignore file to include the env.lock file
  updateGitignore(outputFilePath);
}

/**
 * Decrypts the contents of a env.lock file and writes the decrypted data to a .env file.
 *
 * @param {string} envPath - The directory where the env.lock file is located.
 * @param {string} secret - The secret key used for decryption.
 * @param {string} outputName - The name of the output .env file.
 * @throws Will throw an error if the env.lock file does not exist.
 */
export function decryptEnv(envPath: string, secret: string, outputName: string) {
  // Construct the full path to the env.lock file
  const envlockFilePath = path.join(envPath, 'env.lock');

  // Check if the env.lock file exists
  if (!fs.existsSync(envlockFilePath)) {
    throw new Error(`The env.lock file at ${envlockFilePath} does not exist.`);
  }

  // Read the contents of the env.lock file
  const encrypted = fs.readFileSync(envlockFilePath, 'utf8');

  // Decrypt the contents using the provided secret
  const decrypted = decrypt(encrypted, secret);

  // Construct the full path to the output .env file
  const outputFilePath = path.join(envPath, outputName);

  // Write the decrypted data to the .env file
  fs.writeFileSync(outputFilePath, decrypted);
}

/**
 * Updates the .gitignore file to include the specified file path.
 *
 * @param {string} filePath - The file path to be added to the .gitignore file.
 */
function updateGitignore(filePath: string) {
  // Resolve the path to the .gitignore file
  const gitignorePath = path.resolve('.gitignore');
  let content = '';

  // Read the existing contents of the .gitignore file, if it exists
  if (fs.existsSync(gitignorePath)) {
    content = fs.readFileSync(gitignorePath, 'utf8');
  }

  // Get the relative path of the file to be added
  const relativeFilePath = path.relative(process.cwd(), filePath);

  // Append the file path to the .gitignore file if it's not already included
  if (!content.includes(relativeFilePath)) {
    fs.appendFileSync(gitignorePath, `\n${relativeFilePath}\n`);
  }
}

/**
 * Wrapper class for environment encryption/decryption operations
 */
export class EnvLockWrapper {
  /**
   * Encrypts environment content using AES-256-GCM
   * @param content - The environment content to encrypt
   * @param password - The password to use for encryption
   * @returns The hex-encoded encrypted content
   */
  static async encrypt(content: string, password: string): Promise<string> {
    try {
      return await encrypt(content, password);
    } catch (error) {
      throw new Error(`Encryption failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Decrypts previously encrypted environment content
   * @param encryptedContent - The hex-encoded encrypted content
   * @param password - The password used for encryption
   * @returns The decrypted content
   */
  static async decrypt(encryptedContent: string, password: string): Promise<string> {
    try {
      return await decrypt(encryptedContent, password);
    } catch (error) {
      throw new Error(`Decryption failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}