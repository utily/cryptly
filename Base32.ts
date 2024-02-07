import * as ArrayBuffer from "./ArrayBuffer"
import { TextEncoder } from "./TextEncoder"

export type Standard = "standard" | "hex" | "crockford"
const tables: { [standard in Standard]: string } = {
	standard: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
	hex: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
	crockford: "0123456789ABCDEFGHJKMNPQRSTVWXYZ",
}
export function encode(
	input: ArrayBuffer | Uint8Array | string | number | bigint,
	standard: Standard = "standard",
	padding: "" | "=" | "-" = ""
): string {
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
	bits > 0 && (result += table[(value << (5 - bits)) & 31])
	while (padding && result.length % 8 != 0)
		result += "="
	return result
}
export function decode(input: string, standard: Standard = "standard"): Uint8Array {
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
export function xor(data: string[], standard: Standard = "standard", padding: "" | "=" | "-" = ""): string {
	return encode(ArrayBuffer.xor(...data.map(d => decode(d, standard))), standard, padding)
}
export function bytewiseAdd(data: string[], standard: Standard = "standard", padding: "" | "=" | "-" = ""): string {
	return encode(ArrayBuffer.bytewiseAdd(...data.map(d => decode(d, standard))), standard, padding)
}
export function add(data: string[], standard: Standard = "standard", padding: "" | "=" | "-" = ""): string {
	return encode(ArrayBuffer.add(...data.map(d => decode(d, standard))), standard, padding)
}
export function combine(data: string[], standard: Standard = "standard", padding: "" | "=" | "-" = ""): string {
	return encode(ArrayBuffer.combine(...data.map(d => decode(d, standard))), standard, padding)
}
