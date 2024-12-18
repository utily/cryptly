import { Base64 } from "../../Base64"
import { crypto } from "../../crypto"
import { Encrypted as AesEncrypted } from "./Encrypted"

export class Aes {
	public name?: string
	private constructor(private readonly key: PromiseLike<CryptoKey>) {}
	async encrypt(data: string | ArrayBuffer, salt?: string): Promise<AesEncrypted> {
		const iv = salt ? Base64.decode(salt, "url") : crypto.getRandomValues(new Uint8Array(16))
		return {
			key: this.name,
			salt: salt || Base64.encode(iv, "url"),
			value: Base64.encode(
				new Uint8Array(
					await crypto.subtle.encrypt(
						{ name: (await this.key).algorithm.name, iv },
						await this.key,
						typeof data == "string" ? new TextEncoder().encode(data) : data
					)
				),
				"url"
			),
		}
	}
	async decrypt(encrypted: AesEncrypted): Promise<string>
	async decrypt(encrypted: Base64, salt: Base64): Promise<string>
	async decrypt(encrypted: AesEncrypted | Base64, salt?: Base64): Promise<string> {
		if (Base64.is(encrypted))
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
	async export(): Promise<Base64>
	async export(parts: number): Promise<Base64[]>
	async export(parts: Uint8Array): Promise<Base64>
	async export(parts: Uint8Array[]): Promise<Base64[]>
	async export(parts: Base64): Promise<Base64>
	async export(parts: Base64[]): Promise<Base64[]>
	async export(parts?: number | Uint8Array | Uint8Array[] | Base64 | Base64[]): Promise<Base64 | Base64[]> {
		let result: Base64 | Base64[]
		const key = new Uint8Array(await crypto.subtle.exportKey("raw", await this.key))
		if (parts == undefined) result = (await this.export(1))[0]
		else if (typeof parts == "number")
			result = await this.export(parts > 1 ? Aes.generateRandomKeys(key.length, parts - 1) : [])
		else if (Base64.is(parts))
			result = await this.export(Base64.decode(parts, "url"))
		else if (parts instanceof Uint8Array)
			result = (await this.export([parts]))[0]
		else if (this.isBase64Array(parts))
			result = await this.export(parts.map(part => Base64.decode(part, "url")))
		else {
			parts = [Aes.reduceKeys([key, ...parts]), ...parts]
			result = parts.map(r => Base64.encode(r, "url"))
		}
		return result
	}
	private isBase64Array(value: unknown): value is Base64[] {
		return Array.isArray(value) && value.length > 0 && value.every(Base64.is)
	}
	static cbc(key: 256 | Base64 | Base64[]): Aes {
		return Aes.generate("AES-CBC", key)
	}
	static gcm(key: 256 | Base64 | Base64[]): Aes {
		return Aes.generate("AES-GCM", key)
	}
	static random(length: 256): Base64
	static random(length: 256, parts: number): Base64[]
	static random(length: 256, parts?: number): Base64 | Base64[] {
		const result = Aes.generateRandomKeys(length / 8, parts && parts > 0 ? parts : 1).map(r => Base64.encode(r, "url"))
		return parts ? result : result[0]
	}
	private static generate(algorithm: "AES-CBC" | "AES-GCM", key: 256 | Base64 | Base64[]): Aes {
		return new Aes(
			typeof key == "number"
				? crypto.subtle.generateKey({ name: algorithm, length: key }, true, ["encrypt", "decrypt"])
				: crypto.subtle.importKey(
						"raw",
						Array.isArray(key) ? Aes.reduceKeys(key.map(k => Base64.decode(k, "url"))) : Base64.decode(key, "url"),
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
		for (let index = 0; index < keys[0].length; index++) result[index] = keys.reduce((p, c) => p ^ c[index], 0)
		return result
	}
}

export namespace Aes {
	export import Encrypted = AesEncrypted
}
