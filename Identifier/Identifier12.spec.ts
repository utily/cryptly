import { cryptly } from "../index"

describe("Identifier12", () => {
	it("generate is", () => expect(cryptly.Identifier.is(cryptly.Identifier.generate(8))).toBeTruthy())
	it("generate length", () => expect(cryptly.Identifier.generate(8)).toHaveLength(8))
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
	it.each(data)(`toBinary %s`, ({ identifier, binary }) =>
		expect(cryptly.Identifier.toBinary(identifier)).toEqual(new Uint8Array(binary))
	)
	it.each(data)(`fromBinary %s`, ({ identifier, binary }) =>
		expect(cryptly.Identifier.fromBinary(new Uint8Array(binary))).toEqual(identifier)
	)
	it.each(data)(`is %s`, ({ identifier }) => expect(cryptly.Identifier.is(identifier, 12)).toBeTruthy())
	it.each(data)(`toHexadecimal %s`, ({ identifier, hexadecimal }) =>
		expect(cryptly.Identifier.toHexadecimal(identifier)).toEqual(hexadecimal)
	)
	it.each(data)(`fromHexadecimal %s`, ({ identifier, hexadecimal }) =>
		expect(cryptly.Identifier.fromHexadecimal(hexadecimal)).toEqual(identifier)
	)
	it.each(["!", "/", "=", "."])("is not $s", c => expect(cryptly.Identifier.is(`HelloWorld${c}0`, 12)).toEqual(false))
	it.each([[1691418818480, /^---0XS0exv[\w\d-_]{2}$/]])(`generate ordered w/ prefix %s`, (prefix, result) =>
		expect(cryptly.Identifier.generate(12, "ordered", prefix)).toMatch(result)
	)
	it.each([[1691418818480, /^zzzySXyK13z[\w\d-_]{1}$/]])(`generate reversed w/ prefix %s`, (prefix, result) =>
		expect(cryptly.Identifier.generate(12, "reversed", prefix)).toMatch(result)
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
			cryptly.Identifier.generate(12, "ordered", time + left) < cryptly.Identifier.generate(12, "ordered", time + right)
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
			cryptly.Identifier.generate(12, "reversed", time + left) >
				cryptly.Identifier.generate(12, "reversed", time + right)
		).toEqual(true)
	)
})
