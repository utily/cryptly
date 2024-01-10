import { Rsa as KeyRsa } from "./Rsa"

export namespace Key {
	export type Rsa = KeyRsa
	export const Rsa = KeyRsa
	export namespace Rsa {
		export type Pair = KeyRsa.Pair
		export type Variant = KeyRsa.Variant
	}
}
