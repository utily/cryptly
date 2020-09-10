import { TextEncoder } from "./TextEncoder"

export function encode(value: Uint8Array | string, length?: number): string {
	const data = typeof value == "string" ? new TextEncoder().encode(value) : value
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
	const result = new Uint8Array(value.length / 2)
	for (let index = 0; index < result.length; index++)
		result[index] = Number.parseInt(value[index * 2], 16) * 16 + Number.parseInt(value[index * 2 + 1], 16)
	return result
}
