import { Base64 } from "../../Base64"
import { crypto } from "../../crypto"
import { Key } from "../../Key"
import { Encrypted as RsaEncrypted } from "./Encrypted"

export class Rsa {
	public name?: string
	private constructor(private readonly keys: Promise<Partial<Key.Rsa.Pair>>) {}
	async encrypt(data: string | ArrayBuffer): Promise<RsaEncrypted | undefined> {
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
	async decrypt(encrypted: RsaEncrypted): Promise<string | undefined>
	async decrypt(encrypted: string): Promise<string | undefined>
	async decrypt(encrypted: RsaEncrypted | string): Promise<string | undefined> {
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
	async export(type: "private" | "public"): Promise<string | undefined>
	async export(): Promise<{ public: string | undefined; private: string | undefined }>
	async export(
		type?: "private" | "public"
	): Promise<string | undefined | { public: string | undefined; private: string | undefined }> {
		return type
			? (await this.keys)[type]?.export()
			: Object.fromEntries(
					await Promise.all(Object.entries(await this.keys).map(async ([type, key]) => [type, await key?.export()]))
			  )
	}
	static generate(key: 1024 | 2048 | 4096): Rsa {
		return new Rsa(Key.Rsa.generate(key))
	}
	static import(type: "public" | "private", key: string | ArrayBuffer): Rsa
	static import(publicKey: string | ArrayBuffer, privateKey: string | ArrayBuffer): Rsa
	static import(type: "public" | "private" | string | ArrayBuffer, key: string | ArrayBuffer): Rsa {
		return new Rsa(
			type == "public" || type == "private"
				? Key.Rsa.import(type, key).then(result => ({ [type]: result }))
				: Key.Rsa.Pair.load(type, key)
		)
	}
}

export namespace Rsa {
	export import Encrypted = RsaEncrypted
}
