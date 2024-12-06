import { Base64 } from "../Base64"
import { crypto } from "../crypto"
import { Hash } from "./Hash"
import { Symmetric } from "./Symmetric"

export class Hmac extends Symmetric {
	private key: PromiseLike<CryptoKey>
	constructor(private readonly hash: Hash, key: Uint8Array | Base64) {
		super()
		if (Base64.is(key))
			key = Base64.decode(key, "url")
		this.key = crypto.subtle.importKey("raw", key, { name: "HMAC", hash: { name: hash } }, false, ["sign", "verify"])
	}
	async signBinary(data: Uint8Array): Promise<Uint8Array> {
		return new Uint8Array(await crypto.subtle.sign("HMAC", await this.key, data))
	}
}
