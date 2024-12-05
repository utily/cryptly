import { cryptly } from "../index"

describe("Base64", () => {
	it("xor same length", () => {
		expect(
			new Uint8Array(
				cryptly.ArrayBuffer.xor(
					...[
						[255, 128, 64, 32, 0, 127],
						[255, 127, 63, 31, 255, 127],
					].map(i => new Uint8Array(i))
				)
			)
		).toEqual(new Uint8Array([0, 255, 127, 63, 255, 0]))
	})
	it("xor different lengths", () => {
		expect(
			new Uint8Array(
				cryptly.ArrayBuffer.xor(
					...[
						[255, 128, 64, 32, 0, 127],
						[63, 31, 255, 127],
					].map(i => new Uint8Array(i))
				)
			)
		).toEqual(new Uint8Array([255, 128, 127, 63, 255, 0]))
	})
	it("bytewiseAdd (w/o carry)", () => {
		expect(
			new Uint8Array(
				cryptly.ArrayBuffer.bytewiseAdd(
					...[
						[255, 128, 64, 32, 0, 127],
						[255, 127, 63, 31, 255, 127],
					].map(i => new Uint8Array(i))
				)
			)
		).toEqual(new Uint8Array([254, 255, 127, 63, 255, 254]))
	})
	it("add", () => {
		expect(
			new Uint8Array(
				cryptly.ArrayBuffer.add(
					...[
						[255, 128, 64, 32, 0, 128],
						[255, 127, 63, 31, 255, 129],
					].map(i => new Uint8Array(i))
				)
			)
		).toEqual(new Uint8Array([254, 255, 127, 64, 0, 1]))
	})
	it("combine", () => {
		expect(
			new Uint8Array(
				cryptly.ArrayBuffer.combine(
					...[
						[255, 128, 64, 32, 0, 128],
						[255, 127, 63, 31, 255, 129],
					].map(i => new Uint8Array(i))
				)
			)
		).toEqual(new Uint8Array([253, 255, 255, 128, 1, 1]))
	})
})
