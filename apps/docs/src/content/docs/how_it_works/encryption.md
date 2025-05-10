---
title: Encryption
description: How encryption works in Envlock.
---

1. Reads the contents of the `.env` file.
2. Encrypts the contents using AES-256 encryption with a user-provided password.
3. Saves the encrypted data as a `env.lock` file in the specified output directory.
