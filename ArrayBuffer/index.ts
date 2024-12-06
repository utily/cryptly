export namespace ArrayBuffer {
	function reduce(reducer: (left: number, right: number) => number, data: ArrayBuffer[]): ArrayBuffer {
		let result = new Uint8Array(data.reduce((l, d) => (d.byteLength > l ? d.byteLength : l), 0))
		for (const d of data.map(d => new Uint8Array(d))) {
			const offset = result.length - d.length
			result = result.reduceRight(
				(r, value, index) => ((r[index] = index < offset ? value : reducer(value, d[index - offset])), r),
				result
			)
		}
		return result.buffer
	}

	export function xor(...data: ArrayBuffer[]): ArrayBuffer {
		return reduce((left, right) => left ^ right, data)
	}
	export function bytewiseAdd(...data: ArrayBuffer[]): ArrayBuffer {
		return reduce((left, right) => left + right, data)
	}
	export function add(...data: ArrayBuffer[]): ArrayBuffer {
		let previous = 0
		return reduce((left, right) => (previous = (previous >> 8) + left + right), data)
	}
	export function combine(...data: ArrayBuffer[]): ArrayBuffer {
		let previous = 0
		return reduce((left, right) => (previous = (left << 1) + (previous >> 8) + left + right), data)
	}
	export function random<
		T extends
			| Int8Array
			| Int16Array
			| Int32Array
			| Uint8Array
			| Uint16Array
			| Uint32Array
			| Uint8ClampedArray
			| Float32Array
			| Float64Array
			| DataView
			| null
	>(array: T): T
	export function random(length: number): Uint8Array
	export function random(array: ArrayBufferView | number): ArrayBufferView {
		return crypto.getRandomValues(typeof array == "number" ? new Uint8Array(array) : array)
	}
}
