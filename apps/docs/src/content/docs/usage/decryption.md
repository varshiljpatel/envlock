---
title: Decryption
description: Decrypt env.lock file into .env file using Envlock.
---

To decrypt a `env.lock` file back into a `.env` file, use the `decrypt` or `d` command:

```bash
envlock decrypt <password>
```
or
```bash
envlock d <password>
```

#### Options:

- `--env <path>`: Path to the `env.lock` file (default: `./`).
- `--name <filename>`: Name of the output `.env` file (default: `.env`).

#### Example:

```bash
envlock decrypt mypassword --env=./src/frontend --name=.env.local
```

This command:

- Decrypts the `env.lock` file located in `./src/frontend`.
- Saves the decrypted `.env.local` file in the same directory.
