import { Symmetric } from "./Symmetric"

export class None extends Symmetric {
	async signBinary(_: Uint8Array): Promise<Uint8Array> {
		return new Uint8Array(0)
	}
}
