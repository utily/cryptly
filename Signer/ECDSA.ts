import * as Base64 from "../Base64"
import { crypto } from "../crypto"
import { Base } from "./Base"
import { Hash } from "./Hash"

export class ECDSA extends Base {
	private publicKey: PromiseLike<CryptoKey>
	private privateKey: PromiseLike<CryptoKey>
	constructor(
		private readonly hash: Hash,
		publicKey: Uint8Array | string | undefined,
		privateKey?: Uint8Array | string
	) {
		super()
		if (publicKey) {
			if (typeof publicKey == "string")
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
			if (typeof privateKey == "string")
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
			await crypto.subtle.sign({ name: "ECDSA", hash: { name: this.hash } }, await this.privateKey, data)
		)
	}
	protected async verifyBinary(data: Uint8Array, signature: Uint8Array): Promise<boolean> {
		return crypto.subtle.verify({ name: "ECDSA", hash: { name: this.hash } }, await this.publicKey, signature, data)
	}
}
