import { cryptly } from "../index"

describe("Identifier12", () => {
	it("generate is", () => expect(cryptly.Identifier12.is(cryptly.Identifier12.generate())).toBeTruthy())
	it("generate length", () => expect(cryptly.Identifier12.generate()).toHaveLength(12))
	const data = [
		{
			identifier: "abcdabcdabcd",
			binary: [105, 183, 29, 105, 183, 29, 105, 183, 29],
			hexadecimal: "69b71d69b71d69b71d",
			value: 116235193399069,
		},
		{
			identifier: "____________",
			binary: [255, 255, 255, 255, 255, 255, 255, 255, 255],
			hexadecimal: "ffffffffffffffffff",
			value: 281474976710655,
		},
		{ identifier: "AAAAAAAAAAAA", binary: [0, 0, 0, 0, 0, 0, 0, 0, 0], hexadecimal: "000000000000000000", value: 0 },
	]
	it.each(data)(`is %s`, ({ identifier }) => expect(cryptly.Identifier12.is(identifier)).toBeTruthy())
	it.each(data)(`toBinary %s`, ({ identifier, binary }) =>
		expect(cryptly.Identifier12.toBinary(identifier)).toEqual(new Uint8Array(binary))
	)
	it.each(data)(`fromBinary %s`, ({ identifier, binary }) =>
		expect(cryptly.Identifier12.fromBinary(new Uint8Array(binary))).toEqual(identifier)
	)
	it.each(data)(`toBase16 %s`, ({ identifier, hexadecimal }) =>
		expect(cryptly.Identifier12.toBase16(identifier)).toEqual(hexadecimal)
	)
	it.each(data)(`fromBase16 %s`, ({ identifier, hexadecimal }) =>
		expect(cryptly.Identifier12.fromBase16(hexadecimal)).toEqual(identifier)
	)
	it.each(["!", "/", "=", "."])("is not $s", c => expect(cryptly.Identifier12.is(`HelloWorld${c}0`)).toEqual(false))
	it.each([[1691418818480, /^---0XS0exv[\w\d-_]{2}$/]])(`generate ordered w/ prefix %s`, (prefix, result) =>
		expect(cryptly.Identifier12.generate("ordered", prefix)).toMatch(result)
	)
	it.each([[1691418818480, /^zzzySXyK13z[\w\d-_]{1}$/]])(`generate reversed w/ prefix %s`, (prefix, result) =>
		expect(cryptly.Identifier12.generate("reversed", prefix)).toMatch(result)
	)
	const time = 1691418818480
	it.each([
		[0, 1],
		[1, 21111],
		[2, 344546],
		[3, 41112],
		[4, 5434],
	])("order of ordered", (left, right) =>
		expect(
			cryptly.Identifier12.generate("ordered", time + left) < cryptly.Identifier12.generate("ordered", time + right)
		).toEqual(true)
	)
	it.each([
		[0, 1],
		[0, 1666],
		[1, 21111],
		[2, 32323],
		[3, 434],
	])("order of reversed", (left, right) =>
		expect(
			cryptly.Identifier12.generate("reversed", time + left) > cryptly.Identifier12.generate("reversed", time + right)
		).toEqual(true)
	)
})
