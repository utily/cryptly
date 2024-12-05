import { isly } from "isly"
import type { Base16 } from "../Base16"
import { Base64 } from "../Base64"
import { Identifier } from "../Identifier"

export type Identifier8 = string

export namespace Identifier8 {
	export const type = isly.named("cryptly.Identifier", isly.string<string>(/^[a-zA-Z0-9\-_]{8}$/))
	export const is = type.is
	export const flaw = type.flaw
	export function fromHexadecimal(identifier: Base16): Identifier8 {
		return truncate(Identifier.fromBase16(identifier))
	}
	export function toHexadecimal(identifier: Identifier8, length?: number): string {
		return Identifier.toBase16(identifier, length)
	}
	export function fromUint24(value: number): Identifier8 {
		return fromHexadecimal(value.toString(16).padStart(6, "0"))
	}
	export function toUint24(identifier: Identifier8): number {
		return Number.parseInt(toHexadecimal(identifier, 6), 16)
	}
	export function fromUint48(value: number): Identifier8 {
		return fromHexadecimal(value.toString(16).padStart(12, "0"))
	}
	export function toUint48(identifier: Identifier8): number {
		return Number.parseInt(toHexadecimal(identifier, 12), 16)
	}
	export function fromBinary(identifier: Uint8Array, standard: Base64.Standard = "url"): Identifier8 {
		return Base64.encode(identifier, standard)
	}
	export function toBinary(identifier: Identifier8): Uint8Array {
		return Base64.decode(identifier, "url")
	}
	export function truncate(identifier: Identifier): Identifier8 {
		const result = identifier.padStart(8, "A")
		return result.substring(result.length - 8)
	}
	export function generate(): Identifier8 {
		return truncate(Identifier.generate(4))
	}
}
