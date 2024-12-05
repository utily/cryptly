import { Base64 } from "../Base64"
import { crypto } from "../crypto"
import { Hash } from "../Signer/Hash"

export class Rsa {
	private constructor(
		readonly type: "public" | "private",
		readonly raw: CryptoKey,
		readonly parameters: Rsa.Parameters
	) {}
	async export(format: "jwk"): Promise<JsonWebKey | undefined>
	async export(format: "buffer"): Promise<ArrayBuffer | undefined>
	async export(format?: "base64" | "pem"): Promise<string | undefined>
	async export(format: "jwk" | "buffer" | "base64" | "pem"): Promise<JsonWebKey | ArrayBuffer | string | undefined>
	async export(
		format: "jwk" | "buffer" | "base64" | "pem" = "base64"
	): Promise<JsonWebKey | ArrayBuffer | string | undefined> {
		let result: JsonWebKey | ArrayBuffer | string | undefined
		switch (format) {
			case "jwk":
				result = await crypto.subtle.exportKey("jwk", this.raw)
				break
			case "buffer":
				result = await crypto.subtle.exportKey(this.type == "private" ? "pkcs8" : "spki", this.raw)
				break
			case "base64":
				{
					const data = await this.export("buffer")
					result = data && Base64.encode(new Uint8Array(data), "standard", "=")
				}
				break
			case "pem":
				{
					const data = await this.export("base64")
					result =
						data &&
						[
							`-----BEGIN ${this.type.toUpperCase()} KEY-----`,
							...slice(data, 64),
							`-----END ${this.type.toUpperCase()} KEY-----`,
						].join("\n")
				}
				break
		}
		return result
	}
	static async import(
		type: "private" | "public",
		key: ArrayBuffer | string | undefined,
		variant?: Rsa.Variant,
		hash?: Hash
	): Promise<Rsa | undefined> {
		if (typeof key == "string")
			key = Base64.decode(key)
		const parameters = getParameters(variant)
		return (
			key &&
			new Rsa(
				type,
				await crypto.subtle.importKey(
					type == "private" ? "pkcs8" : "spki",
					key,
					{ name: parameters.name, hash: { name: hash ?? "SHA-256" } },
					true,
					hash ? [type == "private" ? "sign" : "verify"] : [type == "private" ? "decrypt" : "encrypt"]
				),
				parameters
			)
		)
	}
	static async generate(length: 1024 | 2048 | 4096, variant?: Rsa.Variant, hash?: Hash): Promise<Rsa.Pair> {
		const parameters = getParameters(variant)
		const keyPair = await crypto.subtle.generateKey(
			{
				name: parameters.name,
				modulusLength: length,
				publicExponent: new Uint8Array([1, 0, 1]),
				hash: hash ?? "SHA-256",
			},
			true,
			hash ? ["sign", "verify"] : ["encrypt", "decrypt"]
		)
		return {
			public: new Rsa("public", keyPair.publicKey, parameters),
			private: new Rsa("private", keyPair.privateKey, parameters),
		}
	}
}
export namespace Rsa {
	export type Pair = {
		private: Rsa
		public: Rsa
	}
	export namespace Pair {
		export async function load(
			publicKey: string | ArrayBuffer,
			privateKey: string | ArrayBuffer
		): Promise<Partial<Pair>> {
			return {
				public: await Rsa.import("public", publicKey),
				private: await Rsa.import("private", privateKey),
			}
		}
	}
	export type Variant = "SSA" | "PSS"
	export type Parameters =
		| {
				name: "RSASSA-PKCS1-v1_5" | "RSA-OAEP"
		  }
		| {
				name: "RSA-PSS"
				saltLength: 128
		  }
}

function getParameters(variant: Rsa.Variant | undefined): Rsa.Parameters {
	return variant == "PSS"
		? { name: "RSA-PSS", saltLength: 128 }
		: variant == "SSA"
		? { name: "RSASSA-PKCS1-v1_5" }
		: { name: "RSA-OAEP" }
}
function* slice(data: string, length: number): Generator<string> {
	let start = 0
	while (start < data.length)
		yield data.slice(start, (start = start + length))
}
