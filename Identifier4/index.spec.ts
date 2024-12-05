import { cryptly } from "../index"

describe("Identifier4", () => {
	it("generate is", () => expect(cryptly.Identifier4.is(cryptly.Identifier4.generate())).toBeTruthy())
	it("generate length", () => expect(cryptly.Identifier4.generate()).toHaveLength(4))
	const data = [
		{ identifier: "abcd", binary: [105, 183, 29], hexadecimal: "69b71d", uint24: 6928157, uint48: 6928157 },
		{ identifier: "test", binary: [181, 235, 45], hexadecimal: "b5eb2d", uint24: 11922221, uint48: 11922221 },
		{ identifier: "DEMO", binary: [12, 67, 14], hexadecimal: "0c430e", uint24: 803598, uint48: 803598 },
		{ identifier: "TEST", binary: [76, 68, 147], hexadecimal: "4c4493", uint24: 4998291, uint48: 4998291 },
		{ identifier: "____", binary: [255, 255, 255], hexadecimal: "ffffff", uint24: 16777215, uint48: 16777215 },
		{ identifier: "zzzz", binary: [207, 60, 243], hexadecimal: "cf3cf3", uint24: 13581555, uint48: 13581555 },
		{ identifier: "AAAA", binary: [0, 0, 0], hexadecimal: "000000", uint24: 0, uint48: 0 },
		{ identifier: "aAzZ", binary: [104, 12, 217], hexadecimal: "680cd9", uint24: 6819033, uint48: 6819033 },
		{ identifier: "demo", binary: [117, 233, 168], hexadecimal: "75e9a8", uint24: 7727528, uint48: 7727528 },
		{ identifier: "GX_K", binary: [25, 127, 202], hexadecimal: "197fca", uint24: 1671114, uint48: 1671114 },
		{ identifier: "GDvT", binary: [24, 59, 211], hexadecimal: "183bd3", uint24: 1588179, uint48: 1588179 },
		{ identifier: "tgAg", binary: [182, 0, 32], hexadecimal: "b60020", uint24: 11927584, uint48: 11927584 },
		{ identifier: "LeeT", binary: [45, 231, 147], hexadecimal: "2de793", uint24: 3008403, uint48: 3008403 },
	]
	it.each(data)(`toBinary %s`, ({ identifier, binary }) =>
		expect(cryptly.Identifier4.toBinary(identifier)).toEqual(new Uint8Array(binary))
	)
	it.each(data)(`fromBinary %s`, ({ identifier, binary }) =>
		expect(cryptly.Identifier4.fromBinary(new Uint8Array(binary))).toEqual(identifier)
	)
	it.each(data)(`is %s`, ({ identifier }) => expect(cryptly.Identifier4.is(identifier)).toBeTruthy())
	it.each(["!", "/", "=", "."])("is not $s", c => expect(cryptly.Identifier4.is(`He${c}0`)).toEqual(false))

	it.each(data)(`toHexadecimal %s`, ({ identifier, hexadecimal }) =>
		expect(cryptly.Identifier4.toHexadecimal(identifier)).toEqual(hexadecimal)
	)
	it.each(data)(`fromHexadecimal %s`, ({ identifier, hexadecimal }) =>
		expect(cryptly.Identifier4.fromHexadecimal(hexadecimal)).toEqual(identifier)
	)
	it("fromHexadecimal length 24", () =>
		expect(cryptly.Identifier4.fromHexadecimal("5d4282b672ed3c7738183bd3")).toEqual("GDvT"))

	it.each(data)(`toUint24 %s`, ({ identifier, uint24 }) =>
		expect(cryptly.Identifier4.toUint24(identifier)).toEqual(uint24)
	)
	it.each(data)(`fromUint24 %s`, ({ identifier, uint24 }) =>
		expect(cryptly.Identifier4.fromUint24(uint24)).toEqual(identifier)
	)
	it.each(data)(`toUint48 %s`, ({ identifier, uint48 }) =>
		expect(cryptly.Identifier4.toUint48(identifier)).toEqual(uint48)
	)
	it.each(data)(`fromUint48 %s`, ({ identifier, uint48 }) =>
		expect(cryptly.Identifier4.fromUint48(uint48)).toEqual(identifier)
	)
})
