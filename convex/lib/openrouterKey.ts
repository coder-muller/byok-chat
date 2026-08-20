const MIN_SECRET_LENGTH = 16
const GCM_IV_BYTES = 12

declare const process: {
  env: Record<string, string | undefined>
}

export function assertOpenRouterKeyFormat(key: string) {
  const trimmed = key.trim()
  if (!trimmed.startsWith("sk-or-")) {
    throw new Error("OpenRouter keys start with sk-or-")
  }
  return trimmed
}

function requireSecret() {
  const secret = process.env.OPENROUTER_KEY_ENCRYPTION_SECRET
  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    throw new Error(
      "OPENROUTER_KEY_ENCRYPTION_SECRET is missing or too short",
    )
  }
  return secret
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = ""
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }
  return btoa(binary)
}

function base64ToBytes(value: string) {
  const binary = atob(value)
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }
  return bytes
}

async function importEncryptionKey(secret: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(secret),
  )
  return crypto.subtle.importKey("raw", digest, "AES-GCM", false, [
    "encrypt",
    "decrypt",
  ])
}

export async function encryptOpenRouterKey(plaintext: string) {
  const cryptoKey = await importEncryptionKey(requireSecret())
  const iv = crypto.getRandomValues(new Uint8Array(GCM_IV_BYTES))
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    new TextEncoder().encode(plaintext),
  )

  return {
    ciphertext: bytesToBase64(new Uint8Array(ciphertext)),
    iv: bytesToBase64(iv),
    version: 1,
  }
}

export async function decryptOpenRouterKey(ciphertext: string, iv: string) {
  const cryptoKey = await importEncryptionKey(requireSecret())
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: base64ToBytes(iv) },
    cryptoKey,
    base64ToBytes(ciphertext),
  )
  return new TextDecoder().decode(decrypted)
}
