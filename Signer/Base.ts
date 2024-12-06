import { Base64 } from "../Base64"

export abstract class Base {
	async sign(data: Uint8Array): Promise<Uint8Array>
	async sign(data: Base64): Promise<Base64>
	async sign(data: Base64 | Uint8Array): Promise<Base64 | Uint8Array> {
		return Base64.is(data)
			? Base64.encode(await this.signBinary(new TextEncoder().encode(data)), "url")
			: this.signBinary(data)
	}
	protected abstract signBinary(data: Uint8Array): Promise<Uint8Array>
	verify(data: Base64 | Uint8Array, signature: Base64 | Uint8Array): Promise<boolean> {
		if (Base64.is(signature))
			signature = Base64.decode(signature, "url")
		return Base64.is(data)
			? this.verifyBinary(new TextEncoder().encode(data), signature)
			: this.verifyBinary(data, signature)
	}
	protected abstract verifyBinary(data: Uint8Array, signature: Uint8Array): Promise<boolean>
}
