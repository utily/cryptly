import { isly } from "isly"
import { ArrayBuffer } from "../ArrayBuffer"
import { Standard as Base32Standard } from "./Standard"

export type Base32 = string

export namespace Base32 {
	export import Standard = Base32Standard
	export const type = isly.named<Base32>("cryptly.Base32", isly.string(/^[A-Z0-9]*$/))
	export const is = type.is
	export const flaw = type.flaw
	const tables: { [standard in Standard]: string } = {
		standard: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
		hex: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
		crockford: "0123456789ABCDEFGHJKMNPQRSTVWXYZ",
	}
	export function encode(
		input: ArrayBuffer | Uint8Array | string | number | bigint,
		standard: Standard = "standard",
		padding: "" | "=" | "-" = ""
	): Base32 {
		let data: Uint8Array
		switch (typeof input) {
			case "string":
				data = new TextEncoder().encode(input)
				break
			case "number":
				data = new Uint8Array(new BigUint64Array([BigInt(input)]).buffer)
				break
			case "bigint":
				data = new Uint8Array(new BigUint64Array([input]).buffer)
				break
			default:
				data = input instanceof Uint8Array ? input : new Uint8Array(input)
				break
		}
		const table = tables[standard]
		let bits = 0
		let value = 0
		let result = ""
		for (let i = 0; i < data.length; i++) {
			value = (value << 8) | data[i]
			bits += 8
			while (bits >= 5) {
				result += table[(value >>> (bits - 5)) & 31]
				bits -= 5
			}
		}
		if (bits > 0)
			result += table[(value << (5 - bits)) & 31]
		while (padding && result.length % 8 != 0)
			result += "="
		return result
	}
	export function decode(input: Base32, standard: Standard = "standard"): Uint8Array {
		while (input.endsWith("=") && input.length > 0)
			input = input.substring(0, input.length - 1)
		const table = tables[standard]
		const result = new Uint8Array(((input.length * 5) / 8) | 0)
		let bits = 0
		let value = 0
		let index = 0
		for (let i = 0; i < input.length; i++) {
			value = (value << 5) | table.indexOf(input[i])
			bits += 5
			if (bits >= 8) {
				result[index++] = (value >>> (bits - 8)) & 255
				bits -= 8
			}
		}
		return result
	}
	export function xor(data: Base32[], standard: Standard = "standard", padding: "" | "=" | "-" = ""): Base32 {
		return encode(ArrayBuffer.xor(...data.map(d => decode(d, standard))), standard, padding)
	}
	export function bytewiseAdd(data: Base32[], standard: Standard = "standard", padding: "" | "=" | "-" = ""): Base32 {
		return encode(ArrayBuffer.bytewiseAdd(...data.map(d => decode(d, standard))), standard, padding)
	}
	export function add(data: Base32[], standard: Standard = "standard", padding: "" | "=" | "-" = ""): Base32 {
		return encode(ArrayBuffer.add(...data.map(d => decode(d, standard))), standard, padding)
	}
	export function combine(data: Base32[], standard: Standard = "standard", padding: "" | "=" | "-" = ""): Base32 {
		return encode(ArrayBuffer.combine(...data.map(d => decode(d, standard))), standard, padding)
	}
	export function random(length: number): Base32 {
		return Base32.encode(ArrayBuffer.random(Math.ceil(length * (5 / 8)))).substring(0, length)
	}
}
