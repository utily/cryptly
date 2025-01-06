import { isly } from "isly"
import { Base64 } from "../../Base64"

export type Symmetric = ArrayBufferView | Base64

export namespace Symmetric {
	export const type = isly.named<Symmetric>(
		"authly.Algorithm.Key.Symmetric",
		isly.union(
			isly.fromIs<Uint8Array>("Uint8Array", v => v instanceof Uint8Array),
			Base64.type
		)
	)
	export const is = type.is
	export const flaw = type.flaw
}
