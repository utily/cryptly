import { crypto } from "../crypto"
import * as Base64 from "../Base64"
import { Symmetric } from "./Symmetric"
import { Hash } from "./Hash"

export class HMAC extends Symmetric {
	private key: PromiseLike<CryptoKey>
	constructor(private readonly hash: Hash, key: Uint8Array | string) {
		super()
		if (typeof key == "string")
			key = Base64.decode(key, "url")
		this.key = crypto.subtle.importKey("raw", key, { name: "HMAC", hash: { name: hash } }, false, ["sign", "verify"])
	}
	async signBinary(data: Uint8Array): Promise<Uint8Array> {
		return new Uint8Array(await crypto.subtle.sign("HMAC", await this.key, data))
	}
}
