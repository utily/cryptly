import { isly } from "isly"
import type { Base16 } from "../Base16"
import { Base64 } from "../Base64"
import { Identifier } from "../Identifier"

export type Identifier8 = string

export namespace Identifier8 {
	export const type = isly.named("cryptly.Identifier8", isly.string<string>(/^[a-zA-Z0-9\-_]{8}$/))
	export const is = type.is
	export const flaw = type.flaw
	export function convert(
		identifier: Identifier,
		from: Identifier.Standard = "url",
		to?: Identifier.Standard
	): Identifier8 {
		const result = identifier.length != 8 ? Identifier.convert(identifier, 8, from) : identifier
		return to && from != to ? Base64.convert(result, from, to) : result
	}
	export function fromBase16(identifier: Base16, standard: Identifier.Standard = "url"): Identifier8 {
		return convert(Identifier.fromBase16(identifier, standard))
	}
	export function toBase16(identifier: Identifier8, standard: Identifier.Standard = "url"): string {
		return Identifier.toBase16(identifier, standard)
	}
	export function fromBinary(identifier: Uint8Array, standard: Identifier.Standard = "url"): Identifier8 {
		return convert(Base64.encode(identifier, standard))
	}
	export function toBinary(identifier: Identifier8, standard: Identifier.Standard = "url"): Uint8Array {
		return Base64.decode(identifier, standard)
	}
	export function fromUint48(value: number, standard: Identifier.Standard = "url"): Identifier8 {
		return fromBase16(value.toString(16).padStart(12, "0"), standard)
	}
	export function toUint48(identifier: Identifier8, standard: Identifier.Standard = "url"): number {
		return Number.parseInt(toBase16(identifier, standard).slice(0, 12), 16)
	}
	export function generate(
		standard: Identifier.Standard = "url",
		prefix?: Base64 | Uint8Array | number | bigint
	): Identifier8 {
		return Identifier.generate(8, standard, prefix)
	}
	export function min(standard: Identifier.Standard = "url"): Identifier8 {
		return fromUint48(0, standard)
	}
	export function max(standard: Identifier.Standard = "url"): Identifier8 {
		return fromUint48(281_474_976_710_655, standard)
	}
	export function next(identifier: Identifier8, standard: Identifier.Standard = "url", increment = 1): Identifier8 {
		return convert(Base64.next(identifier, increment, standard), standard)
	}
	export function previous(identifier: Identifier8, standard: Identifier.Standard = "url", decrement = 1): Identifier8 {
		return next(identifier, standard, -decrement)
	}
}
