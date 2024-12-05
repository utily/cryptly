import { isly } from "isly"
import { ArrayBuffer } from "../ArrayBuffer"
import { Base16 } from "../Base16"
import { Base64 } from "../Base64"
import { Length as IdentifierLength } from "./Length"

export type Identifier = string

export namespace Identifier {
	export import Length = IdentifierLength
	export const type = isly.named("cryptly.Identifier", isly.string<string>(/^[a-zA-Z0-9\-_]{4,128}$/))
	export function is(value: Identifier | any, length?: Length): value is Identifier {
		return type.is(value) && (length == undefined || value.length == length)
	}
	export const flaw = type.flaw
	export function convert(identifier: Identifier, length: Length, standard?: Base64.Standard): Identifier
	export function convert(identifier: Identifier, from: Base64.Standard, to?: Base64.Standard): Identifier
	export function convert(
		identifier: Identifier,
		length: Base64.Standard | Length,
		standard: Base64.Standard = "url"
	): Identifier {
		return Base64.Standard.is(length)
			? Base64.convert(identifier, length, standard)
			: identifier.length < length
			? min(length).slice(0, length - identifier.length) + identifier
			: identifier.length > length
			? identifier.slice(identifier.length - length)
			: identifier
	}
	export function fromBase16(value: Base16, standard: Base64.Standard = "url"): Identifier {
		return fromBinary(Base16.decode(value), standard)
	}
	export function toBase16(identifier: Identifier, standard: Base64.Standard = "url"): Base16 {
		return Base16.encode(Base64.decode(identifier, standard))
	}
	export function fromUint24(value: number, standard: Base64.Standard = "url"): Identifier {
		return fromBase16(value.toString(16).padStart(6, "0"), standard)
	}
	export function toUint24(identifier: Identifier, standard: Base64.Standard = "url"): number {
		return Number.parseInt(toBase16(identifier, standard).slice(0, 6), 16)
	}
	export function fromUint48(value: number, standard: Base64.Standard = "url"): Identifier {
		return fromBase16(value.toString(16).padStart(12, "0"), standard)
	}
	export function toUint48(identifier: Identifier, standard: Base64.Standard = "url"): number {
		return Number.parseInt(toBase16(identifier, standard).slice(0, 12), 16)
	}
	export function fromBinary(identifier: Uint8Array, standard: Base64.Standard = "url"): Identifier {
		return Base64.encode(identifier, standard)
	}
	export function toBinary(identifier: Identifier, standard: Base64.Standard = "url"): Uint8Array {
		return Base64.decode(identifier, standard)
	}
	export function generate(
		length: Length,
		standard: Base64.Standard = "url",
		prefix?: Base64 | Uint8Array | number | bigint
	): Identifier {
		return !prefix
			? Base64.encode(ArrayBuffer.random(Identifier.Length.bytes(length)), standard)
			: prefix instanceof Uint8Array || typeof prefix == "number" || typeof prefix == "bigint"
			? generate(length, standard, Base64.encode(prefix, standard))
			: prefix.length < length
			? prefix + generate(length, standard).slice(prefix.length)
			: prefix.length > length
			? prefix.slice(prefix.length - length)
			: prefix
	}
	export function min(length: Length): Identifier {
		return "".padStart(length, "-")
	}
	export function max(length: Length): Identifier {
		return "".padStart(length, "z")
	}
	export function next(identifier: Identifier, standard: Base64.Standard = "url", increment = 1): Identifier {
		return convert(Base64.next(identifier, increment, standard), Length.type.get(identifier) ?? 128, standard)
	}
	export function previous(identifier: Identifier, standard: Base64.Standard = "url", decrement = 1): Identifier {
		return next(identifier, standard, -decrement)
	}
}
