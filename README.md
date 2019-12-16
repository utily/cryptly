# Cryptly
Cryptly is a library for encryption functionality that works both in browsers as well as in Node.JS. When using Node.JS a binary dependency based on OpenSSL is required.

# API
## `Algorithm`
Algorithm implements different encryption and decryption algorithms. Currently the following are supported:
* AES CBC-mode 256 bit key

## `Base64`
Support both encoding and decoding of `Uint8Array`s to and from base64 encoded strings. Both `standard`encoding as well as `url` encoding is supported.

## `TextEncoder` & `TextDecoder`
`TextEncoder` and `TextDecoder` perform encoding and decoding of UTF-8 encoded `Uint8Array` data into strings.
