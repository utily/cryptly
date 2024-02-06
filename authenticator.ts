import * as Base16 from "./Base16"
import * as Base32 from "./Base32"
import { Signer } from "./Signer"

export namespace authenticator {
	export async function generate(key: string, time: number, length = 6): Promise<string> {
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
		return (value % +"1".padEnd(length + 1, "0")).toString().padStart(length, "0")
	}
	export async function generateRecoveryCodes(key: string, times: number[]): Promise<string[]> {
		const result = Array(times.length)
		for (let index = 0; index < times.length; index++) {
			result[index] = await generate(key, times[index], 8)
		}
		return result
	}
	export function toQrCode(key: string, issuer: string, username: string): string {
		return `otpauth://totp/${issuer}:${username}?secret=${Base32.encode(key)}&issuer=${issuer}`
	}
}
