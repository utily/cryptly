import { cryptly } from "../index"

describe("Identifier16", () => {
	it("generate is", () => expect(cryptly.Identifier16.is(cryptly.Identifier16.generate())).toBeTruthy())
	it("generate length", () => expect(cryptly.Identifier16.generate()).toHaveLength(16))
	it("fromBase16 length 24", () =>
		expect(cryptly.Identifier16.fromBase16("5d4282b672ed3c7738183bd3")).toEqual("XUKCtnLtPHc4GDvT"))
	it.each([[1691418818480, /^---0XS0exv[\w\d-_]{6}$/]])(`generate ordered w/ prefix %s`, (prefix, result) =>
		expect(cryptly.Identifier16.generate("ordered", prefix)).toMatch(result)
	)
	it.each([[1691418818480, /^zzzySXyK13z[\w\d-_]{5}$/]])(`generate reversed w/ prefix %s`, (prefix, result) =>
		expect(cryptly.Identifier16.generate("reversed", prefix)).toMatch(result)
	)
	it("fromBase16 length 24", () =>
		expect(cryptly.Identifier16.fromBase16("5d4282b672ed3c7738183bd3")).toEqual("XUKCtnLtPHc4GDvT"))
	it("toBase16 length 24", () =>
		expect(cryptly.Identifier16.toBase16("XUKCtnLtPHc4GDvT")).toEqual("5d4282b672ed3c7738183bd3"))
	it("fromBase16 length 23", () =>
		expect(cryptly.Identifier16.fromBase16("5d4282b672ed3c7738183bd")).toEqual("XUKCtnLtPHc4GDvQ"))
	it("toBase16 length 23", () =>
		expect(cryptly.Identifier16.toBase16("XUKCtnLtPHc4GDvQ").slice(0, 23)).toEqual("5d4282b672ed3c7738183bd"))
	it("fromBase16 length 22", () =>
		expect(cryptly.Identifier16.fromBase16("5d4282b672ed3c7738183b")).toEqual("AXUKCtnLtPHc4GDs"))
	it("toBase16 length 22", () =>
		expect(cryptly.Identifier16.toBase16("XUKCtnLtPHc4GDvs").slice(0, 22)).toEqual("5d4282b672ed3c7738183b"))
	it("fromBase16 length 21", () =>
		expect(cryptly.Identifier16.fromBase16("5d4282b672ed3c7738183")).toEqual("AXUKCtnLtPHc4GDA"))
	it("toBase16 length 21", () =>
		expect(cryptly.Identifier16.toBase16("XUKCtnLtPHc4GDA").slice(0, 21)).toEqual("5d4282b672ed3c7738183"))
	it("fromBase16 length 20", () =>
		expect(cryptly.Identifier16.fromBase16("5d4282b672ed3c773818")).toEqual("AAXUKCtnLtPHc4GA"))
	it("toBase16 length 20", () =>
		expect(cryptly.Identifier16.toBase16("XUKCtnLtPHc4GA").slice(0, 20)).toEqual("5d4282b672ed3c773818"))

	const time = 1691418818480
	it.each([
		[0, 1],
		[1, 21111],
		[2, 344546],
		[3, 41112],
		[4, 5434],
	])("order of ordered", (left, right) =>
		expect(
			cryptly.Identifier16.generate("ordered", time + left) < cryptly.Identifier16.generate("ordered", time + right)
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
			cryptly.Identifier16.generate("reversed", time + left) > cryptly.Identifier16.generate("reversed", time + right)
		).toEqual(true)
	)
})
