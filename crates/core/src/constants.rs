//! Constants used throughout the encryption/decryption process.

/// Length of the salt in bytes
pub const SALT_LEN: usize = 16;

/// Length of the nonce in bytes
pub const NONCE_LEN: usize = 12;

/// Number of PBKDF2 iterations for key derivation
/// 
/// This value is set to 100,000 iterations to provide strong security
/// while maintaining reasonable performance.
pub const ITERATIONS: u32 = 100_000;

/// Length of the encryption key in bytes (256 bits)
pub const KEY_LEN: usize = 32; 