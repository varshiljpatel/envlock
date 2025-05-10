---
title: Encryption
description: Encrypt .env file into env.lock file using Envlock.
---

### Encrypting `.env` Files

To encrypt a `.env` file into a `env.lock` file, use the `encrypt` or `e` command:

```bash
envlock encrypt <password>
```
or
```bash
envlock e <password>
```

#### Options:

- `--env <path>`: Path to the `.env` file (default: `./`).
- `--name <filename>`: Name of the `.env` file (default: `.env`).
- `--output <path>`: Directory where the `env.lock` file will be saved (default: `./`).

#### Example:

```bash
envlock encrypt mypassword --env=./src/frontend --name=.env.local --output=./src/frontend
```

This command:

- Encrypts the `.env.local` file located in `./src/frontend`.
- Saves the encrypted `env.lock` file in the `./src/frontend` directory.
