import * as Base64 from "./Base64"
import { crypto } from "./crypto"

export type Identifier = string

export namespace Identifier {
	export function is(value: Identifier | any, length?: Length): value is Identifier {
		return (
			typeof value == "string" &&
			(length == undefined || value.length == length) &&
			Array.from(value).every(
				c => (c >= "0" && c <= "9") || (c >= "A" && c <= "Z") || (c >= "a" && c <= "z") || c == "-" || c == "_"
			)
		)
	}
	export function fromUint24(value: number): Identifier {
		return fromHexadecimal(value.toString(16).padStart(6, "0"))
	}
	export function toUint24(identifier: Identifier): number {
		return Number.parseInt(toHexadecimal(identifier, 6), 16)
	}
	export function fromUint48(value: number): Identifier {
		return fromHexadecimal(value.toString(16).padStart(12, "0"))
	}
	export function toUint48(identifier: Identifier): number {
		return Number.parseInt(toHexadecimal(identifier, 12), 16)
	}
	export function fromBinary(identifier: Uint8Array, standard: Base64.Standard = "url"): Identifier {
		return Base64.encode(identifier, standard)
	}
	export function toBinary(identifier: Identifier): Uint8Array {
		return Base64.decode(identifier, "url")
	}
	export function generate(length: Length): Identifier
	export function generate(
		length: Length,
		ordering: Extract<Base64.Standard, "ordered" | "reversed">,
		value: number | Uint8Array | string
	): Identifier
	export function generate(
		length: Length,
		ordering?: Extract<Base64.Standard, "ordered" | "reversed">,
		value?: number | Uint8Array | string
	): Identifier {
		let result: Identifier | undefined = undefined
		if (value || value == 0 || value == "")
			result = Base64.encode(value, ordering).substring(0, length)
		return (
			(result ?? "") +
			fromBinary(crypto.getRandomValues(new Uint8Array((length / 4) * 3)), ordering).substring(
				0,
				length - (result ? result.length : 0)
			)
		)
	}
	export function fromHexadecimal(identifier: string): Identifier {
		if (identifier.length % 2 == 1)
			identifier += "0"
		const result = new Uint8Array(identifier.length / 2)
		for (let index = 0; index < result.length; index++)
			result[index] = Number.parseInt(identifier[index * 2], 16) * 16 + Number.parseInt(identifier[index * 2 + 1], 16)
		return fromBinary(result)
	}
	export function toHexadecimal(identifier: Identifier, length?: number): string {
		const data = Base64.decode(identifier, "url")
		let result: string[] = []
		for (const d of data)
			result.push(Math.floor(d / 16).toString(16), (d % 16).toString(16))
		if (length)
			result = result.slice(0, length)
		return result.join("")
	}
	export function min(length: Length): Identifier {
		return "".padStart(length, "-")
	}
	export function max(length: Length): Identifier {
		return "".padStart(length, "z")
	}
	export function next(identifier: Identifier, increment = 1): Identifier {
		const result = Base64.next(identifier, increment, "ordered")
		return result.length == identifier.length ? result : result.substring(result.length - identifier.length)
	}
	export function previous(identifier: Identifier, decrement = 1): Identifier {
		return next(identifier, -decrement)
	}
	export const length = [
		4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112,
		116, 120, 124, 128,
	] as Length[]
	export type Length =
		| 4
		| 8
		| 12
		| 16
		| 20
		| 24
		| 28
		| 32
		| 36
		| 40
		| 44
		| 48
		| 52
		| 56
		| 60
		| 64
		| 68
		| 72
		| 76
		| 80
		| 84
		| 88
		| 92
		| 96
		| 100
		| 104
		| 108
		| 112
		| 116
		| 120
		| 124
		| 128
	export namespace Length {
		export function is(value: Length | any): value is Length {
			return typeof value == "number" && value >= 4 && value <= 128 && (value & 252) == value
		}
	}
}
