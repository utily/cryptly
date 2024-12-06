import { isly } from "isly"
import type { Base16 } from "../Base16"
import { Base64 } from "../Base64"
import { Identifier } from "../Identifier"
import { Identifier8 } from "../Identifier8"

export type Identifier16 = string

export namespace Identifier16 {
	export const type = isly.named("cryptly.Identifier16", isly.string<string>(/^[a-zA-Z0-9\-_]{16}$/))
	export const is = type.is
	export const flaw = type.flaw
	export function convert(
		identifier: Identifier,
		from: Identifier.Standard = "url",
		to?: Identifier.Standard
	): Identifier16 {
		const result = identifier.length != 16 ? Identifier.convert(identifier, 16, from) : identifier
		return to && from != to ? Base64.convert(result, from, to) : result
	}
	export function fromBase16(identifier: Base16, standard: Identifier.Standard = "url"): Identifier16 {
		return convert(Identifier.fromBase16(identifier, standard))
	}
	export function toBase16(identifier: Identifier16, standard: Identifier.Standard = "url"): string {
		return Identifier.toBase16(identifier, standard)
	}
	export function fromBinary(identifier: Uint8Array, standard: Identifier.Standard = "url"): Identifier16 {
		return convert(Base64.encode(identifier, standard))
	}
	export function toBinary(identifier: Identifier16, standard: Identifier.Standard = "url"): Uint8Array {
		return Base64.decode(identifier, standard)
	}
	export function generate(
		standard: Identifier.Standard = "url",
		prefix?: Base64 | Uint8Array | number | bigint
	): Identifier16 {
		return Identifier.generate(16, standard, prefix)
	}
	export function min(standard: Identifier.Standard = "url"): Identifier16 {
		const result = Identifier8.min(standard)
		return result + result
	}
	export function max(standard: Identifier.Standard = "url"): Identifier16 {
		const result = Identifier8.max(standard)
		return result + result
	}
	export function next(identifier: Identifier16, standard: Identifier.Standard = "url", increment = 1): Identifier16 {
		return convert(Base64.next(identifier, increment, standard), standard)
	}
	export function previous(
		identifier: Identifier16,
		standard: Identifier.Standard = "url",
		decrement = 1
	): Identifier16 {
		return next(identifier, standard, -decrement)
	}
}
