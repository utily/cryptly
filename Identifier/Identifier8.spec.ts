import { cryptly } from "../index"

describe("Identifier8", () => {
	it("generate is", () => expect(cryptly.Identifier.is(cryptly.Identifier.generate(8))).toBeTruthy())
	it("generate length", () => expect(cryptly.Identifier.generate(8)).toHaveLength(8))
	const data = [
		{
			identifier: "abcdabcd",
			binary: [105, 183, 29, 105, 183, 29],
			hexadecimal: "69b71d69b71d",
			value: 116235193399069,
		},
		{
			identifier: "testtest",
			binary: [181, 235, 45, 181, 235, 45],
			hexadecimal: "b5eb2db5eb2d",
			value: 200021688838957,
		},
		{ identifier: "DEMODEMO", binary: [12, 67, 14, 12, 67, 14], hexadecimal: "0c430e0c430e", value: 13482138026766 },
		{ identifier: "TESTTEST", binary: [76, 68, 147, 76, 68, 147], hexadecimal: "4c44934c4493", value: 83857412736147 },
		{
			identifier: "________",
			binary: [255, 255, 255, 255, 255, 255],
			hexadecimal: "ffffffffffff",
			value: 281474976710655,
		},
		{
			identifier: "zzzzzzzz",
			binary: [207, 60, 243, 207, 60, 243],
			hexadecimal: "cf3cf3cf3cf3",
			value: 227860695432435,
		},
		{ identifier: "AAAAAAAA", binary: [0, 0, 0, 0, 0, 0], hexadecimal: "000000000000", value: 0 },
		{
			identifier: "aAzZaAzZ",
			binary: [104, 12, 217, 104, 12, 217],
			hexadecimal: "680cd9680cd9",
			value: 114404396371161,
		},
		{
			identifier: "demodemo",
			binary: [117, 233, 168, 117, 233, 168],
			hexadecimal: "75e9a875e9a8",
			value: 129646414129576,
		},
		{
			identifier: "GX_KGX_K",
			binary: [25, 127, 202, 25, 127, 202],
			hexadecimal: "197fca197fca",
			value: 28036642209738,
		},
		{ identifier: "GDvTGDvT", binary: [24, 59, 211, 24, 59, 211], hexadecimal: "183bd3183bd3", value: 26645223717843 },
		{ identifier: "tgAgtgAg", binary: [182, 0, 32, 182, 0, 32], hexadecimal: "b60020b60020", value: 200111665053728 },
		{
			identifier: "LeeTLeeT",
			binary: [45, 231, 147, 45, 231, 147],
			hexadecimal: "2de7932de793",
			value: 50472629954451,
		},
	]
	it.each(data)(`is %s`, ({ identifier }) => expect(cryptly.Identifier.is(identifier, 8)).toBeTruthy())
	it.each(data)(`toBinary %s`, ({ identifier, binary }) =>
		expect(cryptly.Identifier.toBinary(identifier)).toEqual(new Uint8Array(binary))
	)
	it.each(data)(`fromBinary %s`, ({ identifier, binary }) =>
		expect(cryptly.Identifier.fromBinary(new Uint8Array(binary))).toEqual(identifier)
	)
	it.each(data)(`toHexadecimal %s`, ({ identifier, hexadecimal }) =>
		expect(cryptly.Identifier.toHexadecimal(identifier)).toEqual(hexadecimal)
	)
	it.each(data)(`fromHexadecimal %s`, ({ identifier, hexadecimal }) =>
		expect(cryptly.Identifier.fromHexadecimal(hexadecimal)).toEqual(identifier)
	)
	it.each(data)(`toUint48 %s`, ({ identifier, value }) =>
		expect(cryptly.Identifier.toUint48(identifier)).toEqual(value)
	)
	it.each(data)(`fromUint48 %s`, ({ identifier, value }) =>
		expect(cryptly.Identifier.fromUint48(value)).toEqual(identifier)
	)
	it.each(["!", "/", "=", "."])("is not $s", c => expect(cryptly.Identifier.is(`Hello${c}01`, 8)).toEqual(false))
	it.each([[1691418818480, /^---0XS0e$/]])(`generate ordered w/ prefix %s`, (prefix, result) =>
		expect(cryptly.Identifier.generate(8, "ordered", prefix)).toMatch(result)
	)
	it.each([[1691418818480, /^zzzySXyK$/]])(`generate reversed w/ prefix %s`, (prefix, result) =>
		expect(cryptly.Identifier.generate(8, "reversed", prefix)).toMatch(result)
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
			cryptly.Identifier.generate(8, "ordered", time + left) <= cryptly.Identifier.generate(8, "ordered", time + right)
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
			cryptly.Identifier.generate(8, "reversed", time + left) >=
				cryptly.Identifier.generate(8, "reversed", time + right)
		).toEqual(true)
	)
})
