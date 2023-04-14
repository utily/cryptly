import * as ArrayBuffer from "./ArrayBuffer"
import { TextEncoder } from "./TextEncoder"

export function encode(value: ArrayBuffer | Uint8Array | string, length?: number): string {
	const data =
		typeof value == "string"
			? new TextEncoder().encode(value)
			: value instanceof global.Uint8Array
			? value
			: new global.Uint8Array(value)
	let result: string[] = []
	for (const d of data)
		result.push(Math.floor(d / 16).toString(16), (d % 16).toString(16))
	if (length)
		result = result.slice(0, length)
	return result.join("")
}
export function decode(value: string): Uint8Array {
	if (value.length % 2 == 1)
		value += "0"
	const result = new global.Uint8Array(value.length / 2)
	for (let index = 0; index < result.length; index++)
		result[index] = Number.parseInt(value[index * 2], 16) * 16 + Number.parseInt(value[index * 2 + 1], 16)
	return result
}
export function xor(data: string[]): string {
	return encode(ArrayBuffer.xor(...data.map(decode)))
}
export function bytewiseAdd(data: string[]): string {
	return encode(ArrayBuffer.bytewiseAdd(...data.map(decode)))
}
export function add(data: string[]): string {
	return encode(ArrayBuffer.add(...data.map(decode)))
}
export function combine(data: string[]): string {
	return encode(ArrayBuffer.combine(...data.map(decode)))
}
