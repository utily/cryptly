import { Base16 } from "../Base16"
import { Base32 } from "../Base32"
import { Signer } from "../Signer"

export type Authenticator = string

export namespace Authenticator {
	export async function generate(key: string, time: number, length = 6): Promise<Authenticator> {
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
	export function generateRecoveryCodes(key: string, times: number[]): Promise<Authenticator[]> {
		return Promise.all(times.map(async time => await generate(key, time, 8)))
	}
	export function toQRCode(key: string, issuer: string, username: string): string {
		return `otpauth://totp/${issuer}:${username}?secret=${Base32.encode(key)}&issuer=${issuer}`
	}
}
