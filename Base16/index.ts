import { ArrayBuffer } from "../ArrayBuffer"

export type Base16 = string

export namespace Base16 {
	export function encode(value: ArrayBuffer | Uint8Array | string, length?: number): Base16 {
		const data =
			typeof value == "string"
				? new TextEncoder().encode(value)
				: value instanceof Uint8Array
				? value
				: new Uint8Array(value)
		let result: string[] = []
		for (const d of data)
			result.push(Math.floor(d / 16).toString(16), (d % 16).toString(16))
		if (length)
			result = result.slice(0, length)
		return result.join("")
	}
	export function decode(value: Base16): Uint8Array {
		if (value.length % 2 == 1)
			value += "0"
		const result = new Uint8Array(value.length / 2)
		for (let index = 0; index < result.length; index++)
			result[index] = Number.parseInt(value[index * 2], 16) * 16 + Number.parseInt(value[index * 2 + 1], 16)
		return result
	}
	export function xor(data: Base16[]): Base16 {
		return encode(ArrayBuffer.xor(...data.map(decode)))
	}
	export function bytewiseAdd(data: Base16[]): Base16 {
		return encode(ArrayBuffer.bytewiseAdd(...data.map(decode)))
	}
	export function add(data: Base16[]): Base16 {
		return encode(ArrayBuffer.add(...data.map(decode)))
	}
	export function combine(data: Base16[]): Base16 {
		return encode(ArrayBuffer.combine(...data.map(decode)))
	}
	export function random(length: number): Base16 {
		return Base16.encode(ArrayBuffer.random(Math.ceil(length / 2))).substring(0, length)
	}
}
