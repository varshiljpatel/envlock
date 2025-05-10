---
title: Decryption
description: How Decryption works in Envlock.
---

1. Reads the contents of the `env.lock` file.
2. Decrypts the contents using AES-256 decryption with the same password used for encryption.
3. By default saves the decrypted data as a `.env` file in the specified directory.
