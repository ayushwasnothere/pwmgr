function hexToUint8Array(hex: string): Uint8Array {
  return new Uint8Array(
    hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)),
  );
}

export async function deriveKey(
  masterPassword: string,
  salt: string,
): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const saltUint8 = hexToUint8Array(salt);

  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(masterPassword),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  const derivedKey = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltUint8,
      iterations: 100_000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );

  return derivedKey;
}

export async function encryptData(
  username: string,
  password: string,
  derivedKey: CryptoKey,
): Promise<{
  iv: string;
  encryptedUsername: string;
  encryptedPassword: string;
}> {
  const enc = new TextEncoder();

  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encryptedUsernameData = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    derivedKey,
    enc.encode(username),
  );

  const encryptedPasswordData = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    derivedKey,
    enc.encode(password),
  );

  const ivBase64 = btoa(String.fromCharCode(...new Uint8Array(iv.buffer)));
  const encryptedUsername = btoa(
    String.fromCharCode(...new Uint8Array(encryptedUsernameData)),
  );
  const encryptedPassword = btoa(
    String.fromCharCode(...new Uint8Array(encryptedPasswordData)),
  );

  return { iv: ivBase64, encryptedUsername, encryptedPassword };
}

export async function decryptData(
  ivBase64: string,
  encryptedUsername: string,
  encryptedPassword: string,
  derivedKey: CryptoKey,
): Promise<{ username: string; password: string }> {
  const enc = new TextDecoder();

  const iv = new Uint8Array(
    atob(ivBase64)
      .split("")
      .map((char) => char.charCodeAt(0)),
  );
  const encryptedUsernameData = new Uint8Array(
    atob(encryptedUsername)
      .split("")
      .map((char) => char.charCodeAt(0)),
  );

  const encryptedPasswordData = new Uint8Array(
    atob(encryptedPassword)
      .split("")
      .map((char) => char.charCodeAt(0)),
  );

  const decryptedUsername = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    derivedKey,
    encryptedUsernameData,
  );
  const decryptedPassword = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    derivedKey,
    encryptedPasswordData,
  );

  return {
    username: enc.decode(decryptedUsername),
    password: enc.decode(decryptedPassword),
  };
}

export async function cryptoKeyToBase64(cryptoKey: CryptoKey): Promise<string> {
  const exportedKey = await window.crypto.subtle.exportKey("raw", cryptoKey);

  const uint8Array = new Uint8Array(exportedKey);

  const binaryString = String.fromCharCode(...uint8Array);
  return btoa(binaryString);
}

export async function base64ToCryptoKey(base64: string): Promise<CryptoKey> {
  const binaryString = atob(base64);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return await window.crypto.subtle.importKey(
    "raw",
    bytes.buffer,
    "AES-GCM",
    true,
    ["encrypt", "decrypt"],
  );
}
