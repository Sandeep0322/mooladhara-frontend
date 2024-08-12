import pako from 'pako'
import CryptoJS from 'crypto-js'

// Generate a random key and IV
const key = CryptoJS.enc.Hex.parse(CryptoJS.lib.WordArray.random(32).toString())
const iv = CryptoJS.enc.Hex.parse(CryptoJS.lib.WordArray.random(16).toString())

// Function to compress and encrypt text
export function compressEncrypt(text) {
  console.log('Original text:', text)

  // Compress the text using pako and get binary data
  const compressed = pako.deflate(text, { to: 'uint8array' })

  // Convert compressed data to a WordArray for encryption
  const compressedWordArray = CryptoJS.lib.WordArray.create(compressed)

  // Encrypt the compressed data using AES
  const encrypted = CryptoJS.AES.encrypt(compressedWordArray, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })

  return {
    iv: iv.toString(CryptoJS.enc.Hex),
    encryptedData: encrypted.toString(),
  }
}

// Function to decrypt and decompress text
export function decryptDecompress(encrypted) {
  console.log('Encrypted data:', encrypted)

  const iv = CryptoJS.enc.Hex.parse(encrypted.iv)

  // Decrypt the data
  const decrypted = CryptoJS.AES.decrypt(encrypted.encryptedData, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })

  console.log('dee', decrypted)
  // Convert decrypted data to Uint8Array
  const decryptedArray = new Uint8Array(decrypted.sigBytes)
  for (let i = 0; i < decryptedArray.length; i++) {
    decryptedArray[i] = (decrypted.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff
  }

  console.log(decryptedArray)
  // Decompress the data using pako
  const decompressed = pako.inflate(decryptedArray, { to: 'string' })

  console.log(decompressed)
  return decompressed
}

export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString)

  // Options for date formatting
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }

  // Format date
  return date.toLocaleDateString('en-US', options)
}

export const getDayOfWeek = (isoDateString) => {
  const date = new Date(isoDateString)

  // Get the day of the week in full text
  const options = { weekday: 'long' }
  return date.toLocaleDateString('en-US', options)
}
