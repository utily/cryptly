import { Base64 } from "../Base64"
import { crypto } from "../crypto"
import { Base } from "./Base"
import { Hash } from "./Hash"

export class Ecdsa extends Base {
	private publicKey: PromiseLike<CryptoKey> | undefined
	private privateKey: PromiseLike<CryptoKey> | undefined
	constructor(
		private readonly hash: Hash,
		publicKey: Uint8Array | Base64 | undefined,
		privateKey?: Uint8Array | Base64
	) {
		super()
		if (publicKey) {
			if (Base64.is(publicKey))
				publicKey = Base64.decode(publicKey)
			this.publicKey = crypto.subtle.importKey(
				"spki",
				publicKey,
				{ name: "ECDSA", namedCurve: hash.replace("SHA", "P") == "P-512" ? "P-521" : hash.replace("SHA", "P") },
				false,
				["verify"]
			)
		}
		if (privateKey) {
			if (Base64.is(privateKey))
				privateKey = Base64.decode(privateKey)
			this.privateKey = crypto.subtle.importKey(
				"pkcs8",
				privateKey,
				{ name: "ECDSA", namedCurve: hash.replace("SHA", "P") == "P-512" ? "P-521" : hash.replace("SHA", "P") },
				true,
				["sign", "verify"]
			)
		}
	}
	protected async signBinary(data: Uint8Array): Promise<Uint8Array> {
		return new Uint8Array(
			this.privateKey
				? await crypto.subtle.sign({ name: "ECDSA", hash: { name: this.hash } }, await this.privateKey, data)
				: new ArrayBuffer(0)
		)
	}
	protected async verifyBinary(data: Uint8Array, signature: Uint8Array): Promise<boolean> {
		return (
			!!this.publicKey &&
			crypto.subtle.verify({ name: "ECDSA", hash: { name: this.hash } }, await this.publicKey, signature, data)
		)
	}
}
