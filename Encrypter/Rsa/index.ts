import { Base64 } from "../../Base64"
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
							await globalThis.crypto.subtle.encrypt(
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
	async decrypt(encrypted: Base64): Promise<string | undefined>
	async decrypt(encrypted: RsaEncrypted | Base64): Promise<string | undefined> {
		if (Base64.is(encrypted))
			encrypted = { value: encrypted }
		const key = (await this.keys)?.private
		return key
			? new TextDecoder().decode(
					new Uint8Array(
						await globalThis.crypto.subtle.decrypt(
							{ name: key.parameters.name },
							key.raw,
							Base64.decode(encrypted.value, "url")
						)
					)
			  )
			: undefined
	}
	async export(type: "private" | "public"): Promise<Base64 | undefined>
	async export(): Promise<{ public: Base64 | undefined; private: Base64 | undefined }>
	async export(
		type?: "private" | "public"
	): Promise<Base64 | undefined | { public: Base64 | undefined; private: Base64 | undefined }> {
		return type
			? (await this.keys)[type]?.export()
			: Object.fromEntries(
					await Promise.all(Object.entries(await this.keys).map(async ([type, key]) => [type, await key?.export()]))
			  )
	}
	static generate(key: 1024 | 2048 | 4096): Rsa {
		return new Rsa(Key.Rsa.generate(key))
	}
	static import(type: "public" | "private", key: Base64 | ArrayBuffer): Rsa
	static import(publicKey: Base64 | ArrayBuffer, privateKey: Base64 | ArrayBuffer): Rsa
	static import(type: "public" | "private" | Base64 | ArrayBuffer, key: Base64 | ArrayBuffer): Rsa {
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
