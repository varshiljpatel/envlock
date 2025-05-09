//! Error handling for encryption/decryption operations.

use napi::Error;

/// Creates an error for encryption failures
pub fn encryption_error(e: impl std::fmt::Display) -> Error {
    Error::from_reason(format!("Encryption failed: {}", e))
}

/// Creates an error for decryption failures
pub fn decryption_error(e: impl std::fmt::Display) -> Error {
    Error::from_reason(format!("Decryption failed: {}", e))
}

/// Creates an error for hex decoding failures
pub fn hex_decode_error(e: impl std::fmt::Display) -> Error {
    Error::from_reason(format!("Hex decoding failed: {}", e))
}

/// Creates an error for UTF-8 conversion failures
pub fn utf8_error(e: impl std::fmt::Display) -> Error {
    Error::from_reason(format!("UTF-8 conversion failed: {}", e))
}

/// Creates an error for invalid encrypted content
pub fn invalid_content_error() -> Error {
    Error::from_reason("Invalid encrypted content".to_string())
} 