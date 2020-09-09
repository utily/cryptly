import * as Base64 from "../Base64"
import { TextEncoder } from "../TextEncoder"

export abstract class Base {
	async sign(data: Uint8Array): Promise<Uint8Array>
	async sign(data: string): Promise<string>
	async sign(data: string | Uint8Array): Promise<string | Uint8Array> {
		return typeof data == "string"
			? Base64.encode(await this.signBinary(new TextEncoder().encode(data)), "url")
			: this.signBinary(data)
	}
	protected abstract signBinary(data: Uint8Array): Promise<Uint8Array>
	verify(data: string | Uint8Array, signature: string | Uint8Array): Promise<boolean> {
		if (typeof signature == "string")
			signature = Base64.decode(signature, "url")
		return typeof data == "string"
			? this.verifyBinary(new TextEncoder().encode(data), signature)
			: this.verifyBinary(data, signature)
	}
	protected abstract verifyBinary(data: Uint8Array, signature: Uint8Array): Promise<boolean>
}
