//! A secure content encryption/decryption library using AES-GCM.
//! 
//! This library provides functions to encrypt and decrypt content
//! using AES-256-GCM encryption with PBKDF2 key derivation.

mod crypto;
mod constants;
mod error;

use napi_derive::napi;

/// Encrypts content using AES-256-GCM with a password.
/// 
/// # Arguments
/// * `content` - The content to encrypt
/// * `password` - The password to use for encryption
/// 
/// # Returns
/// * `Result<String, napi::Error>` - Hex-encoded encrypted content or error
#[napi]
pub fn encrypt(content: String, password: String) -> Result<String, napi::Error> {
    crypto::encrypt(content, password)
}

/// Decrypts previously encrypted content.
/// 
/// # Arguments
/// * `encrypted_content` - The hex-encoded encrypted content
/// * `password` - The password used for encryption
/// 
/// # Returns
/// * `Result<String, napi::Error>` - Decrypted content or error
#[napi]
pub fn decrypt(encrypted_content: String, password: String) -> Result<String, napi::Error> {
    crypto::decrypt(encrypted_content, password)
} 