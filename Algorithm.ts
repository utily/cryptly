import * as Base64 from "./Base64"
import { crypto } from "./crypto"
import { Encrypted } from "./Encrypted"
import { TextDecoder } from "./TextDecoder"
import { TextEncoder } from "./TextEncoder"

export class Algorithm {
	public name?: string
	private constructor(private readonly key: PromiseLike<CryptoKey>) {}
	async encrypt(data: string, salt?: string): Promise<Encrypted> {
		const iv = salt ? Base64.decode(salt, "url") : crypto.getRandomValues(new Uint8Array(16))
		return {
			key: this.name,
			salt: salt || Base64.encode(iv, "url"),
			value: Base64.encode(
				new Uint8Array(
					await crypto.subtle.encrypt(
						{ name: (await this.key).algorithm.name, iv },
						await this.key,
						new TextEncoder().encode(data)
					)
				),
				"url"
			),
		}
	}
	async decrypt(encrypted: Encrypted): Promise<string>
	async decrypt(encrypted: string, salt: string): Promise<string>
	async decrypt(encrypted: Encrypted | string, salt?: string): Promise<string> {
		if (typeof encrypted == "string")
			encrypted = { value: encrypted, salt: salt ?? "" }
		return new TextDecoder().decode(
			new Uint8Array(
				await crypto.subtle.decrypt(
					{ name: (await this.key).algorithm.name, iv: Base64.decode(encrypted.salt, "url") },
					await this.key,
					Base64.decode(encrypted.value, "url")
				)
			)
		)
	}
	async export(): Promise<string>
	async export(parts: number): Promise<string[]>
	async export(parts?: number): Promise<string | string[]> {
		const key = new Uint8Array(await crypto.subtle.exportKey("raw", await this.key))
		let result: Uint8Array[] = Algorithm.generateRandomKeys(key.length, (parts ?? 1) - 1)
		result = [Algorithm.reduceKeys([key, ...result]), ...result]
		return parts == undefined ? Base64.encode(result[0], "url") : result.map(r => Base64.encode(r, "url"))
	}
	static aesCbc(key: 256 | string | string[]): Algorithm {
		return Algorithm.generate("AES-CBC", key)
	}
	static aesGcm(key: 256 | string | string[]): Algorithm {
		return Algorithm.generate("AES-GCM", key)
	}
	private static generate(algorithm: "AES-CBC" | "AES-GCM", key: 256 | string | string[]): Algorithm {
		return new Algorithm(
			typeof key == "number"
				? crypto.subtle.generateKey({ name: algorithm, length: key }, true, ["encrypt", "decrypt"])
				: crypto.subtle.importKey(
						"raw",
						Array.isArray(key)
							? Algorithm.reduceKeys(key.map(k => Base64.decode(k, "url")))
							: Base64.decode(key, "url"),
						algorithm,
						true,
						["encrypt", "decrypt"]
				  )
		)
	}
	private static generateRandomKeys(length: number, parts: number): Uint8Array[] {
		return parts > 0
			? [crypto.getRandomValues(new Uint8Array(length)), ...this.generateRandomKeys(length, parts - 1)]
			: []
	}
	private static reduceKeys(keys: Uint8Array[]): Uint8Array {
		const result = new Uint8Array(keys[0].length)
		for (let index = 0; index < keys[0].length; index++)
			result[index] = keys.reduce((p, c) => p ^ c[index], 0)
		return result
	}
}
