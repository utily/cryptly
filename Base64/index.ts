import { isly } from "isly"
import { ArrayBuffer } from "../ArrayBuffer"
import { Standard as Base64Standard } from "./Standard"

export type Base64 = string

export namespace Base64 {
	export const type = isly.named<Base64>("cryptly.Base64", isly.string(/^[A-Za-z0-9+/\-_=]*$/))
	export const is = type.is
	export const flaw = type.flaw
	const tables: { [standard in Standard]: string } = {
		standard: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
		url: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
		ordered: "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",
		reversed: "zyxwvutsrqponmlkjihgfedcba_ZYXWVUTSRQPONMLKJIHGFEDCBA9876543210-",
	}
	export import Standard = Base64Standard
	export function encode(
		value: ArrayBuffer | Uint8Array | string | number | bigint,
		standard: Standard = "standard",
		padding: "" | "=" | "-" = ""
	): Base64 {
		let data: Uint8Array
		const reverse = (array: Uint8Array) => (standard == "ordered" || standard == "reversed" ? array.reverse() : array)
		switch (typeof value) {
			case "string":
				data = new TextEncoder().encode(value)
				break
			case "number":
				data = reverse(new Uint8Array(new BigUint64Array([BigInt(value)]).buffer))
				break
			case "bigint":
				data = reverse(new Uint8Array(new BigUint64Array([value]).buffer))
				break
			default:
				data = value instanceof Uint8Array ? value : new Uint8Array(value)
				break
		}
		const table = tables[standard]
		const result: string[] = []
		for (let c = 0; c < data.length; c += 3) {
			const c0 = data[c]
			const c1 = c + 1 < data.length ? data[c + 1] : 0
			const c2 = c + 2 < data.length ? data[c + 2] : 0
			result.push(table[c0 >>> 2])
			result.push(table[((c0 & 3) << 4) | (c1 >>> 4)])
			result.push(table[((c1 & 15) << 2) | (c2 >>> 6)])
			result.push(table[c2 & 63])
		}
		const length = Math.ceil((data.length / 3) * 4)
		return result.join("").substring(0, length) + padding.repeat(result.length - length)
	}
	export function decode(value: Base64, standard: Standard = "standard"): Uint8Array {
		while (value.endsWith("=") && value.length > 0)
			value = value.substring(0, value.length - 1)
		const table = tables[standard]
		const data = [...value].map(c => table.indexOf(c))
		const result = new Uint8Array(Math.floor((data.length / 4) * 3))
		for (let c = 0; c < result.length; c += 3) {
			const d0 = data.shift() || 0
			const d1 = data.shift() || 0
			const d2 = data.shift() || 0
			const d3 = data.shift() || 0
			result[c] = (d0 << 2) | (d1 >>> 4)
			result[c + 1] = ((d1 & 15) << 4) | (d2 >>> 2)
			result[c + 2] = ((d2 & 3) << 6) | d3
		}
		return standard == "ordered" || standard == "reversed" ? result.reverse() : result
	}
	export function next(value: Base64, increment = 1, standard: Standard = "standard"): Base64 {
		const table = tables[standard]
		const rest = value.length > 1 ? value.substring(0, value.length - 1) : increment > 0 ? "" : table[63]
		const number = (value.length == 0 ? 0 : table.indexOf(value[value.length - 1])) + increment
		return (
			(number > 63 || number < 0 ? next(rest, Math.floor(number / 63), standard) : rest) + table[remainder(number, 64)]
		)
	}
	export function convert(value: Base64, input: Standard, output: Standard): Base64 {
		const inputTable = tables[input]
		const outputTable = tables[output]
		return [...value].map(c => outputTable[inputTable.indexOf(c)]).join("")
	}
	function remainder(left: number, right: number): number {
		return left >= 0 ? left % right : remainder(left + right, right)
	}
	export function xor(data: Base64[], standard: Standard = "standard", padding: "" | "=" | "-" = ""): Base64 {
		return encode(ArrayBuffer.xor(...data.map(d => decode(d, standard))), standard, padding)
	}
	export function bytewiseAdd(data: Base64[], standard: Standard = "standard", padding: "" | "=" | "-" = ""): Base64 {
		return encode(ArrayBuffer.bytewiseAdd(...data.map(d => decode(d, standard))), standard, padding)
	}
	export function add(data: Base64[], standard: Standard = "standard", padding: "" | "=" | "-" = ""): Base64 {
		return encode(ArrayBuffer.add(...data.map(d => decode(d, standard))), standard, padding)
	}
	export function combine(data: Base64[], standard: Standard = "standard", padding: "" | "=" | "-" = ""): Base64 {
		return encode(ArrayBuffer.combine(...data.map(d => decode(d, standard))), standard, padding)
	}
	export function random(length: number): Base64 {
		return Base64.encode(ArrayBuffer.random(Math.ceil(length * (3 / 4)))).substring(0, length)
	}
	export function* slice(data: Base64, length: number): Generator<Base64> {
		let start = 0
		while (start < data.length)
			yield data.slice(start, (start = start + length))
	}
}
