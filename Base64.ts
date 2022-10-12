import { TextEncoder } from "./TextEncoder"

const tables: { [standard in Standard]: string } = {
	standard: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
	url: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
}
export type Standard = "standard" | "url"
export function encode(
	value: Uint8Array | string,
	standard: Standard = "standard",
	padding: "" | "=" | "-" = ""
): string {
	if (typeof value == "string")
		value = new TextEncoder().encode(value)
	const table = tables[standard]
	const result: string[] = []
	for (let c = 0; c < value.length; c += 3) {
		const c0 = value[c]
		const c1 = c + 1 < value.length ? value[c + 1] : 0
		const c2 = c + 2 < value.length ? value[c + 2] : 0
		result.push(table[c0 >>> 2])
		result.push(table[((c0 & 3) << 4) | (c1 >>> 4)])
		result.push(table[((c1 & 15) << 2) | (c2 >>> 6)])
		result.push(table[c2 & 63])
	}
	const length = Math.ceil((value.length / 3) * 4)
	return result.join("").substr(0, length) + padding.repeat(result.length - length)
}
export function decode(value: string, standard: Standard = "standard"): Uint8Array {
	while (value.endsWith("=") && value.length > 0)
		value = value.substr(0, value.length - 1)
	const table = tables[standard]
	const data = value.split("").map(c => table.indexOf(c))
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
	return result
}
export function next(value: string, increment = 1, standard: Standard = "standard"): string {
	const table = tables[standard]
	const rest = value.length > 1 ? value.substring(0, value.length - 1) : increment > 0 ? "" : table[63]
	const number = (value.length == 0 ? 0 : table.indexOf(value[value.length - 1])) + increment
	return (
		(number > 63 || number < 0 ? next(rest, Math.floor(number / 63), standard) : rest) + table[remainder(number, 64)]
	)
}
function remainder(left: number, right: number): number {
	return left >= 0 ? left % right : remainder(left + right, right)
}
