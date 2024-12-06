import { cryptly } from "../index"

describe("Identifier64", () => {
	it("generate is", () => expect(cryptly.Identifier64.is(cryptly.Identifier64.generate())).toEqual(true))
	it("generate is length 64", () => expect(cryptly.Identifier64.is(cryptly.Identifier64.generate())).toEqual(true))
	it("generate is not length 64", () => expect(cryptly.Identifier64.is(cryptly.Identifier.generate(32))).toEqual(false))
	it("generate length", () => expect(cryptly.Identifier64.generate()).toHaveLength(64))
	it.each([[1691418818480, /^---0XS0exv[\w\d-_]{54}$/]])(`generate ordered w/ prefix %s`, (prefix, result) =>
		expect(cryptly.Identifier64.generate("ordered", prefix)).toMatch(result)
	)
	it.each([[1691418818480, /^zzzySXyK13z[\w\d-_]{53}$/]])(`generate reversed w/ prefix %s`, (prefix, result) =>
		expect(cryptly.Identifier64.generate("reversed", prefix)).toMatch(result)
	)
	const data = [
		{
			identifier: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
			binary: [
				0, 16, 131, 16, 81, 135, 32, 146, 139, 48, 211, 143, 65, 20, 147, 81, 85, 151, 97, 150, 155, 113, 215, 159, 130,
				24, 163, 146, 89, 167, 162, 154, 171, 178, 219, 175, 195, 28, 179, 211, 93, 183, 227, 158, 187, 243, 223, 191,
			],
			hexadecimal: "00108310518720928b30d38f41149351559761969b71d79f8218a39259a7a29aabb2dbafc31cb3d35db7e39ebbf3dfbf",
		},
	]
	it.each(data)(`is %s`, ({ identifier }) => expect(cryptly.Identifier64.is(identifier)).toBeTruthy())
	it.each(data)(`toBinary %s`, ({ identifier, binary }) =>
		expect(cryptly.Identifier64.toBinary(identifier)).toEqual(new Uint8Array(binary))
	)
	it.each(data)(`fromBinary %s`, ({ identifier, binary }) =>
		expect(cryptly.Identifier64.fromBinary(new Uint8Array(binary))).toEqual(identifier)
	)
	it.each(data)(`toBase16 %s`, ({ identifier, hexadecimal }) =>
		expect(cryptly.Identifier64.toBase16(identifier)).toEqual(hexadecimal)
	)
	it.each(data)(`fromBase16 %s`, ({ identifier, hexadecimal }) =>
		expect(cryptly.Identifier64.fromBase16(hexadecimal)).toEqual(identifier)
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
			cryptly.Identifier64.generate("ordered", time + left) < cryptly.Identifier64.generate("ordered", time + right)
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
			cryptly.Identifier64.generate("reversed", time + left) > cryptly.Identifier64.generate("reversed", time + right)
		).toEqual(true)
	)
})
