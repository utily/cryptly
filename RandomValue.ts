
import {crypto } from "./crypto"
export namespace RandomValue {
	export function generate<
		T extends
			| Int8Array
			| Int16Array
			| Int32Array
			| Uint8Array
			| Uint16Array
			| Uint32Array
			| Uint8ClampedArray
			| Float32Array
			| Float64Array
			| DataView
			| null
	>(array: T): T {
		return crypto.getRandomValues(array)
	}
}
