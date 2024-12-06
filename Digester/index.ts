import { Base16 } from "../Base16"
import { Base64 } from "../Base64"
import { crypto } from "../crypto"
import { Algorithm, Algorithm as DigesterAlgorithm } from "./Algorithm"

export class Digester {
	get length(): number {
		return Algorithm.bits(this.algorithm)
	}
	constructor(readonly algorithm: Digester.Algorithm) {}
	async digest(data: string, base: 16): Promise<Base16>
	async digest(data: string, base: Base64.Standard): Promise<Base64>
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
}
export namespace Digester {
	export import Algorithm = DigesterAlgorithm
}
