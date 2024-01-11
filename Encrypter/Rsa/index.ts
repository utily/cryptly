import * as Base64 from "../../Base64"
import { crypto } from "../../crypto"
import { Key } from "../../Key"
import { TextDecoder } from "../../TextDecoder"
import { TextEncoder } from "../../TextEncoder"
import { Encrypted } from "./Encrypted"

export class Rsa {
	public name?: string
	private constructor(private readonly keys: Promise<Partial<Key.Rsa.Pair>>) {}
	async encrypt(data: string | ArrayBuffer): Promise<Encrypted | undefined> {
		const key = (await this.keys)?.public
		return key
			? {
					key: this.name,
					value: Base64.encode(
						new Uint8Array(
							await crypto.subtle.encrypt(
								{ name: key.parameters.name },
								key.raw,
								typeof data == "string" ? new TextEncoder().encode(data) : data
							)
						),
						"url"
					),
			  }
			: undefined
	}
	async decrypt(encrypted: Encrypted): Promise<string | undefined>
	async decrypt(encrypted: string): Promise<string | undefined>
	async decrypt(encrypted: Encrypted | string): Promise<string | undefined> {
		if (typeof encrypted == "string")
			encrypted = { value: encrypted }
		const key = (await this.keys)?.private
		return key
			? new TextDecoder().decode(
					new Uint8Array(
						await crypto.subtle.decrypt({ name: key.parameters.name }, key.raw, Base64.decode(encrypted.value, "url"))
					)
			  )
			: undefined
	}
	async export(type: "private" | "public", standard?: Base64.Standard): Promise<string | undefined>
	async export(standard?: Base64.Standard): Promise<{ public: string | undefined; private: string | undefined }>
	async export(
		type?: "private" | "public" | Base64.Standard,
		standard?: Base64.Standard
	): Promise<string | undefined | { public: string | undefined; private: string | undefined }> {
		return type == "private" || type == "public"
			? (await this.keys)[type]?.export(standard && { type: "base64", standard: standard ?? "standard" })
			: Object.fromEntries(
					await Promise.all(
						Object.entries(await this.keys).map(async ([keyType, key]) => [
							keyType,
							await key?.export(type && { type: "base64", standard: type ?? "standard" }),
						])
					)
			  )
	}
	static generate(key: 1024 | 2048 | 4096): Rsa {
		return new Rsa(Key.Rsa.generate(key))
	}
	static import(type: "public" | "private", key: string | ArrayBuffer, encodingStandard?: Base64.Standard): Rsa
	static import(
		publicKey: string | ArrayBuffer,
		privateKey: string | ArrayBuffer,
		encodingStandard?: Base64.Standard
	): Rsa
	static import(
		type: "public" | "private" | string | ArrayBuffer,
		key: string | ArrayBuffer,
		encodingStandard?: Base64.Standard
	): Rsa {
		return new Rsa(
			type == "public" || type == "private"
				? Key.Rsa.import(type, key, undefined, undefined, encodingStandard).then(result => ({ [type]: result }))
				: Key.Rsa.Pair.load(type, key, encodingStandard)
		)
	}
}
