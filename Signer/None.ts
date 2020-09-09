import { Symmetric } from "./Symmetric"

export class None extends Symmetric {
	signBinary(_: Uint8Array): Promise<Uint8Array> {
		return Promise.resolve(new Uint8Array(0))
	}
}
