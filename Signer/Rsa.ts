import { crypto } from "../crypto"
import { Key } from "../Key"
import { Base } from "./Base"
import { Hash } from "./Hash"

export class Rsa extends Base {
	private constructor(private readonly keys: Promise<Partial<Key.Rsa.Pair>>) {
		super()
	}
	protected async signBinary(data: Uint8Array): Promise<Uint8Array> {
		const key = (await this.keys).private
		return key ? new Uint8Array(await crypto.subtle.sign(key.parameters, key.raw, data)) : new Uint8Array(0)
	}
	protected async verifyBinary(data: Uint8Array, signature: Uint8Array): Promise<boolean> {
		const key = (await this.keys).public
		return !!key && crypto.subtle.verify(key.parameters, key.raw, signature, data)
	}
	async export(type: "private" | "public", format: "jwk"): Promise<JsonWebKey | undefined>
	async export(type: "private" | "public", format: "buffer"): Promise<ArrayBuffer | undefined>
	async export(type: "private" | "public", format?: "base64" | "pem"): Promise<string | undefined>
	async export(
		type: "private" | "public",
		format: "jwk" | "buffer" | "base64" | "pem" = "base64"
	): Promise<JsonWebKey | ArrayBuffer | string | undefined> {
		const key = (await this.keys)[type]
		return key?.export(format)
	}
	static import(
		variant: Key.Rsa.Variant,
		hash: Hash,
		publicKey: Uint8Array | string | undefined,
		privateKey?: Uint8Array | string
	): Rsa {
		return new Rsa(
			Promise.all([
				Key.Rsa.import("public", publicKey, variant, hash),
				Key.Rsa.import("private", privateKey, variant, hash),
			]).then(([publicKey, privateKey]) => ({
				public: publicKey,
				private: privateKey,
			}))
		)
	}
	static generate(variant: Key.Rsa.Variant, hash: Hash, length: 1024 | 2048 | 4096): Rsa {
		return new Rsa(Key.Rsa.generate(length, variant, hash))
	}
}
