import { cryptly } from "../index"

describe("Identifier20", () => {
	it("generate is", () => expect(cryptly.Identifier20.is(cryptly.Identifier20.generate())).toBeTruthy())
	it("generate length", () => expect(cryptly.Identifier20.generate()).toHaveLength(20))
	const data = [
		{
			identifier: "abcdabcdabcdabcdabcd",
			binary: [105, 183, 29, 105, 183, 29, 105, 183, 29, 105, 183, 29, 105, 183, 29],
			hexadecimal: "69b71d69b71d69b71d69b71d69b71d",
		},
		{
			identifier: "____________________",
			binary: [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
			hexadecimal: "ffffffffffffffffffffffffffffff",
		},
		{
			identifier: "AAAAAAAAAAAAAAAAAAAA",
			binary: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			hexadecimal: "000000000000000000000000000000",
		},
	]
	it.each(data)(`is %s`, ({ identifier }) => expect(cryptly.Identifier20.is(identifier)).toBeTruthy())
	it.each(data)(`toBinary %s`, ({ identifier, binary }) =>
		expect(cryptly.Identifier20.toBinary(identifier)).toEqual(new Uint8Array(binary))
	)
	it.each(data)(`fromBinary %s`, ({ identifier, binary }) =>
		expect(cryptly.Identifier20.fromBinary(new Uint8Array(binary))).toEqual(identifier)
	)
	it.each(data)(`toBase16 %s`, ({ identifier, hexadecimal }) =>
		expect(cryptly.Identifier20.toBase16(identifier)).toEqual(hexadecimal)
	)
	it.each(data)(`fromBase16 %s`, ({ identifier, hexadecimal }) =>
		expect(cryptly.Identifier20.fromBase16(hexadecimal)).toEqual(identifier)
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
			cryptly.Identifier20.generate("ordered", time + left) < cryptly.Identifier20.generate("ordered", time + right)
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
			cryptly.Identifier20.generate("reversed", time + left) > cryptly.Identifier20.generate("reversed", time + right)
		).toEqual(true)
	)
})
