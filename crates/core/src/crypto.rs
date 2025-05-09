//! Core encryption and decryption functionality.
//! 
//! This module implements the main encryption and decryption logic using
//! AES-256-GCM for encryption and PBKDF2 for key derivation.

use aes_gcm::{
    aead::{Aead, KeyInit},
    Aes256Gcm, Nonce
};
use napi::Error;
use pbkdf2::pbkdf2_hmac;
use rand::RngCore;
use sha2::Sha256;

use crate::constants::{SALT_LEN, NONCE_LEN, ITERATIONS, KEY_LEN};
use crate::error::*;

/// Derives an encryption key from a password and salt using PBKDF2
fn derive_key(password: &[u8], salt: &[u8]) -> [u8; KEY_LEN] {
    let mut key = [0u8; KEY_LEN];
    pbkdf2_hmac::<Sha256>(password, salt, ITERATIONS, &mut key);
    key
}

/// Encrypts content using AES-256-GCM
/// 
/// # Arguments
/// * `content` - The content to encrypt
/// * `password` - The password to use for encryption
/// 
/// # Returns
/// * `Result<String, Error>` - Hex-encoded encrypted content or error
pub fn encrypt(content: String, password: String) -> Result<String, Error> {
    // Generate random salt
    let mut salt = [0u8; SALT_LEN];
    rand::thread_rng().fill_bytes(&mut salt);
    
    // Derive encryption key
    let key = derive_key(password.as_bytes(), &salt);
    
    // Initialize cipher
    let cipher = Aes256Gcm::new_from_slice(&key)
        .map_err(encryption_error)?;
    
    // Use zero nonce (in production, you should use a random nonce)
    let nonce = Nonce::from_slice(&[0u8; NONCE_LEN]);
    
    // Encrypt the content
    let ciphertext = cipher.encrypt(nonce, content.as_bytes().as_ref())
        .map_err(encryption_error)?;

    // Combine salt, nonce, and ciphertext
    let mut output = Vec::with_capacity(SALT_LEN + NONCE_LEN + ciphertext.len());
    output.extend_from_slice(&salt);
    output.extend_from_slice(nonce);
    output.extend_from_slice(&ciphertext);
    
    // Return hex-encoded result
    Ok(hex::encode(output))
}

/// Decrypts previously encrypted content
/// 
/// # Arguments
/// * `encrypted_content` - The hex-encoded encrypted content
/// * `password` - The password used for encryption
/// 
/// # Returns
/// * `Result<String, Error>` - Decrypted content or error
pub fn decrypt(encrypted_content: String, password: String) -> Result<String, Error> {
    // Decode hex-encoded content
    let data = hex::decode(encrypted_content)
        .map_err(hex_decode_error)?;
    
    // Validate data length
    if data.len() < SALT_LEN + NONCE_LEN {
        return Err(invalid_content_error());
    }
    
    // Split data into components
    let salt = &data[..SALT_LEN];
    let nonce = &data[SALT_LEN..SALT_LEN + NONCE_LEN];
    let ciphertext = &data[SALT_LEN + NONCE_LEN..];
    
    // Derive encryption key
    let key = derive_key(password.as_bytes(), salt);
    
    // Initialize cipher
    let cipher = Aes256Gcm::new_from_slice(&key)
        .map_err(decryption_error)?;
    
    // Decrypt the content
    let plaintext = cipher.decrypt(Nonce::from_slice(nonce), ciphertext)
        .map_err(decryption_error)?;
    
    // Convert to string
    String::from_utf8(plaintext)
        .map_err(utf8_error)
} 