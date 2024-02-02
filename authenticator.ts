import * as Base16 from "./Base16"
import * as Base32 from "./Base32"
import { Signer } from "./Signer"

export namespace authenticator {
	export async function generate(key: string, time: number): Promise<string> {
		const hash = await Signer.create("HMAC", "SHA-1", new TextEncoder().encode(key)).sign(
			Base16.decode(
				Math.floor(time / 1000 / 30)
					.toString(16)
					.padStart(16, "0")
			)
		)
		const offset = hash[hash.length - 1] & 0xf
		const value =
			((hash[offset] & 0x7f) << 24) |
			((hash[offset + 1] & 0xff) << 16) |
			((hash[offset + 2] & 0xff) << 8) |
			(hash[offset + 3] & 0xff)
		// magic numbers explanation:
		// (value % 10^digits).padstart(digits, "0")
		return (value % 1000000).toString().padStart(6, "0")
	}
	export function toQrCode(key: string, issuer: string, username: string): string {
		return `otpauth://totp/${issuer}:${username}?secret=${Base32.encode(key)}&issuer=${issuer}`
	}
}
