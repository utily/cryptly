import { isly } from "isly"
import type { Base16 } from "../Base16"
import { Base64 } from "../Base64"
import { Identifier } from "../Identifier"

export type Identifier4 = string

export namespace Identifier4 {
	export const type = isly.named("cryptly.Identifier", isly.string<string>(/^[a-zA-Z0-9\-_]{4}$/))
	export const is = type.is
	export const flaw = type.flaw
	export function fromHexadecimal(identifier: Base16, standard: Base64.Standard = "url"): Identifier4 {
		return convert(Identifier.fromBase16(identifier, standard))
	}
	export function toHexadecimal(identifier: Identifier4, standard: Base64.Standard = "url"): string {
		return Identifier.toBase16(identifier, standard)
	}
	export function fromUint24(value: number, standard: Base64.Standard = "url"): Identifier4 {
		return fromHexadecimal(value.toString(16).padStart(6, "0"), standard)
	}
	export function toUint24(identifier: Identifier4, standard: Base64.Standard = "url"): number {
		return Number.parseInt(toHexadecimal(identifier, standard).slice(0, 6), 16)
	}
	export function fromUint48(value: number): Identifier4 {
		return fromHexadecimal(value.toString(16).padStart(12, "0"))
	}
	export function toUint48(identifier: Identifier4, standard: Base64.Standard = "url"): number {
		return Number.parseInt(toHexadecimal(identifier, standard).slice(0, 12), 16)
	}
	export function fromBinary(identifier: Uint8Array, standard: Base64.Standard = "url"): Identifier4 {
		return convert(Base64.encode(identifier, standard))
	}
	export function toBinary(identifier: Identifier4, standard: Base64.Standard = "url"): Uint8Array {
		return Base64.decode(identifier, standard)
	}
	export function convert(identifier: Identifier): Identifier4 {
		return identifier.length > 4 ? identifier.substring(identifier.length - 4) : identifier.padStart(4, "A")
	}
	export function generate(standard: Base64.Standard = "url"): Identifier4 {
		return Identifier.generate(4, standard)
	}
}
