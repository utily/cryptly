import * as Base64 from "../Base64"
import { crypto } from "../crypto"
import { Base } from "./Base"
import { Hash } from "./Hash"

export class Rsa extends Base {
	private get parameters() {
		return getParameters(this.variant)
	}
	private constructor(
		private readonly variant: Rsa.Variant,
		private readonly publicKey: CryptoKey | undefined,
		private readonly privateKey: CryptoKey | undefined
	) {
		super()
	}
	protected async signBinary(data: Uint8Array): Promise<Uint8Array> {
		return this.privateKey
			? new Uint8Array(await crypto.subtle.sign(this.parameters, this.privateKey, data))
			: new Uint8Array(0)
	}
	protected async verifyBinary(data: Uint8Array, signature: Uint8Array): Promise<boolean> {
		return !!this.publicKey && crypto.subtle.verify(this.parameters, this.publicKey, signature, data)
	}
	async export(type: "private" | "public", format: "jwk"): Promise<JsonWebKey | undefined>
	async export(type: "private" | "public", format: "buffer"): Promise<ArrayBuffer | undefined>
	async export(type: "private" | "public", format?: "base64" | "pem"): Promise<string | undefined>
	async export(
		type: "private" | "public",
		format: "jwk" | "buffer" | "base64" | "pem" = "base64"
	): Promise<JsonWebKey | ArrayBuffer | string | undefined> {
		const key = type == "private" ? this.privateKey : this.publicKey
		let result: JsonWebKey | ArrayBuffer | string | undefined
		if (key)
			switch (format) {
				case "jwk":
					result = await crypto.subtle.exportKey("jwk", key)
					break
				case "buffer":
					result = await crypto.subtle.exportKey(type == "private" ? "pkcs8" : "spki", key)
					break
				case "base64":
					{
						const data = await this.export(type, "buffer")
						result = data && Base64.encode(new Uint8Array(data), "standard", "=")
					}
					break
				case "pem":
					{
						const data = await this.export(type, "base64")
						result =
							data &&
							[
								`-----BEGIN ${type.toUpperCase()} KEY-----`,
								...slice(data, 64),
								`-----END ${type.toUpperCase()} KEY-----`,
							].join("\n")
					}
					break
			}
		return result
	}
	static async import(
		variant: Rsa.Variant,
		hash: Hash,
		publicKey: Uint8Array | string | undefined,
		privateKey?: Uint8Array | string
	): Promise<Rsa | undefined> {
		const publicHelper = await Rsa.importHelper(variant, hash, "public", publicKey)
		const privateHelper = await Rsa.importHelper(variant, hash, "private", privateKey)
		return !publicHelper && !privateHelper ? undefined : new Rsa(variant, publicHelper, privateHelper)
	}
	private static async importHelper(
		variant: Rsa.Variant,
		hash: Hash,
		type: "private" | "public",
		key: Uint8Array | string | undefined
	): Promise<CryptoKey | undefined> {
		let result: CryptoKey | undefined
		if (key) {
			key = typeof key == "string" ? Base64.decode(key) : key
			result = await crypto.subtle
				.importKey(
					type == "private" ? "pkcs8" : "spki",
					key,
					{ name: getParameters(variant).name, hash: { name: hash } },
					true,
					[type == "private" ? "sign" : "verify"]
				)
				.catch(c => undefined)
		}
		return result
	}
	static async generate(variant: Rsa.Variant, hash: Hash, length: 1024 | 2048 | 4096): Promise<Rsa> {
		const keyPair: CryptoKeyPair = await crypto.subtle.generateKey(
			{
				name: getParameters(variant).name,
				modulusLength: length,
				publicExponent: new Uint8Array([1, 0, 1]),
				hash,
			},
			true,
			["sign", "verify"]
		)
		return new Rsa(variant, keyPair.publicKey, keyPair.privateKey)
	}
}
export namespace Rsa {
	export type Variant = "SSA" | "PSS"
}
function* slice(data: string, length: number): Generator<string> {
	let start = 0
	while (start < data.length)
		yield data.slice(start, (start = start + length))
}
function getParameters(variant: Rsa.Variant): { name: "RSASSA-PKCS1-v1_5" } | { name: "RSA-PSS"; saltLength: 128 } {
	return variant == "PSS" ? { name: "RSA-PSS", saltLength: 128 } : { name: "RSASSA-PKCS1-v1_5" }
}
