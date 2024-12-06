import { isly } from "isly"
import type { Base16 } from "../Base16"
import { Base64 } from "../Base64"
import { Identifier } from "../Identifier"

export type Identifier4 = string

export namespace Identifier4 {
	export const type = isly.named("cryptly.Identifier4", isly.string<string>(/^[a-zA-Z0-9\-_]{4}$/))
	export const is = type.is
	export const flaw = type.flaw
	export function convert(
		identifier: Identifier,
		from: Identifier.Standard = "url",
		to?: Identifier.Standard
	): Identifier4 {
		const result = identifier.length != 4 ? Identifier.convert(identifier, 4, from) : identifier
		return to && from != to ? Base64.convert(result, from, to) : result
	}
	export function fromBase16(identifier: Base16, standard: Identifier.Standard = "url"): Identifier4 {
		return convert(Identifier.fromBase16(identifier, standard))
	}
	export function toBase16(identifier: Identifier4, standard: Identifier.Standard = "url"): string {
		return Identifier.toBase16(identifier, standard)
	}
	export function fromBinary(identifier: Uint8Array, standard: Identifier.Standard = "url"): Identifier4 {
		return convert(Base64.encode(identifier, standard))
	}
	export function toBinary(identifier: Identifier4, standard: Identifier.Standard = "url"): Uint8Array {
		return Base64.decode(identifier, standard)
	}
	export function fromUint24(value: number, standard: Identifier.Standard = "url"): Identifier4 {
		return fromBase16(value.toString(16).padStart(6, "0"), standard)
	}
	export function toUint24(identifier: Identifier4, standard: Identifier.Standard = "url"): number {
		return Number.parseInt(toBase16(identifier, standard).slice(0, 6), 16)
	}
	export function generate(
		standard: Identifier.Standard = "url",
		prefix?: Base64 | Uint8Array | number | bigint
	): Identifier4 {
		return Identifier.generate(4, standard, prefix)
	}
	export function min(standard: Identifier.Standard = "url"): Identifier4 {
		return fromUint24(0, standard)
	}
	export function max(standard: Identifier.Standard = "url"): Identifier4 {
		return fromUint24(16_777_215, standard)
	}
	export function next(identifier: Identifier4, standard: Identifier.Standard = "url", increment = 1): Identifier4 {
		const result = Base64.next(identifier, increment, standard)
		return convert(result, standard)
	}
	export function previous(identifier: Identifier4, standard: Identifier.Standard = "url", decrement = 1): Identifier4 {
		return next(identifier, standard, -decrement)
	}
}
