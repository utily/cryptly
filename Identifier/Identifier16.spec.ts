import { cryptly } from "../index"

describe("Identifier16", () => {
	it("generate is", () => expect(cryptly.Identifier.is(cryptly.Identifier.generate(16))).toBeTruthy())
	it("generate length", () => expect(cryptly.Identifier.generate(16)).toHaveLength(16))
	it("fromHexadecimal length 24", () =>
		expect(cryptly.Identifier.fromHexadecimal("5d4282b672ed3c7738183bd3")).toEqual("XUKCtnLtPHc4GDvT"))
	it.each([[1691418818480, /^---0XS0exv[\w\d-_]{6}$/]])(`generate ordered w/ prefix %s`, (prefix, result) =>
		expect(cryptly.Identifier.generate(16, "ordered", prefix)).toMatch(result)
	)
	it.each([[1691418818480, /^zzzySXyK13z[\w\d-_]{5}$/]])(`generate reversed w/ prefix %s`, (prefix, result) =>
		expect(cryptly.Identifier.generate(16, "reversed", prefix)).toMatch(result)
	)
	it("fromHexadecimal length 24", () =>
		expect(cryptly.Identifier.fromHexadecimal("5d4282b672ed3c7738183bd3")).toEqual("XUKCtnLtPHc4GDvT"))
	it("toHexadecimal length 24", () =>
		expect(cryptly.Identifier.toHexadecimal("XUKCtnLtPHc4GDvT")).toEqual("5d4282b672ed3c7738183bd3"))
	it("fromHexadecimal length 23", () =>
		expect(cryptly.Identifier.fromHexadecimal("5d4282b672ed3c7738183bd")).toEqual("XUKCtnLtPHc4GDvQ"))
	it("toHexadecimal length 23", () =>
		expect(cryptly.Identifier.toHexadecimal("XUKCtnLtPHc4GDvQ", 23)).toEqual("5d4282b672ed3c7738183bd"))
	it("fromHexadecimal length 22", () =>
		expect(cryptly.Identifier.fromHexadecimal("5d4282b672ed3c7738183b")).toEqual("XUKCtnLtPHc4GDs"))
	it("toHexadecimal length 22", () =>
		expect(cryptly.Identifier.toHexadecimal("XUKCtnLtPHc4GDvs", 22)).toEqual("5d4282b672ed3c7738183b"))
	it("fromHexadecimal length 21", () =>
		expect(cryptly.Identifier.fromHexadecimal("5d4282b672ed3c7738183")).toEqual("XUKCtnLtPHc4GDA"))
	it("toHexadecimal length 21", () =>
		expect(cryptly.Identifier.toHexadecimal("XUKCtnLtPHc4GDA", 21)).toEqual("5d4282b672ed3c7738183"))
	it("fromHexadecimal length 20", () =>
		expect(cryptly.Identifier.fromHexadecimal("5d4282b672ed3c773818")).toEqual("XUKCtnLtPHc4GA"))
	it("toHexadecimal length 20", () =>
		expect(cryptly.Identifier.toHexadecimal("XUKCtnLtPHc4GA", 20)).toEqual("5d4282b672ed3c773818"))

	const time = 1691418818480
	it.each([
		[0, 1],
		[1, 21111],
		[2, 344546],
		[3, 41112],
		[4, 5434],
	])("order of ordered", (left, right) =>
		expect(
			cryptly.Identifier.generate(16, "ordered", time + left) < cryptly.Identifier.generate(16, "ordered", time + right)
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
			cryptly.Identifier.generate(16, "reversed", time + left) >
				cryptly.Identifier.generate(16, "reversed", time + right)
		).toEqual(true)
	)
})
