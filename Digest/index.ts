import * as Base16 from "../Base16"
import * as Base64 from "../Base64"
import { crypto } from "../crypto"
import { TextEncoder } from "../TextEncoder"
import { Algorithm } from "./Algorithm"

export class Digest {
	get length(): number {
		return Digest.lengths[this.algorithm]
	}
	constructor(readonly algorithm: Algorithm) {}
	async digest(data: string, base: 16 | Base64.Standard): Promise<string>
	async digest(data: Uint8Array): Promise<Uint8Array>
	async digest(data: string | Uint8Array, base: 16 | Base64.Standard = "standard"): Promise<string | Uint8Array> {
		let result: string | Uint8Array
		if (typeof data == "string") {
			const digest = await this.digest(new TextEncoder().encode(data))
			result = base == 16 ? Base16.encode(digest) : Base64.encode(digest, base)
		} else
			result = new Uint8Array(await crypto.subtle.digest(this.algorithm, data))
		return result
	}
	private static lengths: { [algorithm in Algorithm]: number } = {
		"SHA-1": 128,
		"SHA-256": 256,
		"SHA-384": 384,
		"SHA-512": 512,
	}
}
