import { Base64 } from "../../Base64"

export type Key = ArrayBufferView | Base64

export namespace Key {
	export type Asymmetric = { public?: Key; private?: Key }
}
