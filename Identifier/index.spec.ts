import { cryptly } from "../index"

describe("Identifier", () => {
	it("generate", () => expect(cryptly.Identifier.is(cryptly.Identifier.generate(12))).toBeTruthy())
	it("generate lengths", () => {
		for (const length of cryptly.Identifier.Length.values) {
			const identifier = cryptly.Identifier.generate(length)
			expect(identifier).toHaveLength(length)
			expect(cryptly.Identifier.fromBinary(cryptly.Identifier.toBinary(identifier))).toEqual(identifier)
			expect(cryptly.Identifier.fromHexadecimal(cryptly.Identifier.toHexadecimal(identifier))).toEqual(identifier)
		}
	})
	it("is random", () => expect(cryptly.Identifier.is(cryptly.Identifier.generate(64))).toBeTruthy())
	it("is random length", () => expect(cryptly.Identifier.is(cryptly.Identifier.generate(64), 64)).toBeTruthy())
	it("is not length", () => expect(cryptly.Identifier.is(cryptly.Identifier.generate(64), 32)).toBeFalsy())
	it("is", () => expect(cryptly.Identifier.is("aAzZ09-_")).toBeTruthy())
	it("is all", () =>
		expect(cryptly.Identifier.is("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_")).toBeTruthy())
	it("is not !", () => expect(cryptly.Identifier.is("Hello!0123")).toBeFalsy())
	it("is not /", () => expect(cryptly.Identifier.is("Hello/0123")).toBeFalsy())
	it("is not =", () => expect(cryptly.Identifier.is("Hello=0123")).toBeFalsy())
	it("is not .", () => expect(cryptly.Identifier.is("Hello.0123")).toBeFalsy())

	const binary = [
		0, 16, 131, 16, 81, 135, 32, 146, 139, 48, 211, 143, 65, 20, 147, 81, 85, 151, 97, 150, 155, 113, 215, 159, 130, 24,
		163, 146, 89, 167, 162, 154, 171, 178, 219, 175, 195, 28, 179, 211, 93, 183, 227, 158, 187, 243, 223, 191,
	]
	const all = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
	it("fromBinary", () => expect(cryptly.Identifier.fromBinary(Uint8Array.from(binary))).toEqual(all))
	it("toBinary", () => expect(cryptly.Identifier.toBinary(all)).toEqual(Uint8Array.from(binary)))

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

	it("toBinary length 4", () => expect(cryptly.Identifier.toBinary("tgAg")).toEqual(Uint8Array.from([182, 0, 32])))
	it("fromBinary length 4", () => expect(cryptly.Identifier.fromBinary(Uint8Array.from([182, 0, 32]))).toEqual("tgAg"))

	it("toHexadecimal length 4", () => expect(cryptly.Identifier.toHexadecimal("tgAg")).toEqual("b60020"))
	it("fromHexadecimal length 4", () => expect(cryptly.Identifier.fromHexadecimal("b60020")).toEqual("tgAg"))
	it("toHexadecimal test", () => expect(cryptly.Identifier.toHexadecimal("test")).toEqual("b5eb2d"))
	it("fromHexadecimal test", () => expect(cryptly.Identifier.fromHexadecimal("b5eb2d")).toEqual("test"))
	it("toHexadecimal demo", () => expect(cryptly.Identifier.toHexadecimal("demo")).toEqual("75e9a8"))
	it("fromHexadecimal demo", () => expect(cryptly.Identifier.fromHexadecimal("75e9a8")).toEqual("demo"))
	it("toHexadecimal QYklGX_K", () => expect(cryptly.Identifier.toHexadecimal("QYklGX_K")).toEqual("418925197fca"))
	it("fromHexadecimal QYklGX_K", () => expect(cryptly.Identifier.fromHexadecimal("418925197fca")).toEqual("QYklGX_K"))
	it("toHexadecimal length 6", () => expect(cryptly.Identifier.toHexadecimal("DvQecA")).toEqual("0ef41e70"))
	it("fromHexadecimal length 6", () => expect(cryptly.Identifier.fromHexadecimal("0ef41e70")).toEqual("DvQecA"))
	it("fromDecimal length 6", () => expect(cryptly.Identifier.toHexadecimal("DvQecA")).toEqual("0ef41e70"))
	it("fromHexadecimal length 6", () => expect(cryptly.Identifier.fromHexadecimal("0ef41e70")).toEqual("DvQecA"))
	it("toUint24 length 4", () => expect(cryptly.Identifier.toUint24("lEEt")).toEqual(9716013))
	it("fromUint24 length 4", () => expect(cryptly.Identifier.fromUint24(9716013)).toEqual("lEEt"))
	it("toUint24 max safe", () => expect(cryptly.Identifier.toUint24("____")).toEqual(16777215))
	it("fromUint24 max safe", () => expect(cryptly.Identifier.fromUint24(16777215)).toEqual("____"))
	it("toUint24 min safe", () => expect(cryptly.Identifier.toUint24("AAAA")).toEqual(0))
	it("fromUint24 min safe", () => expect(cryptly.Identifier.fromUint24(0)).toEqual("AAAA"))
	it("toUint48 length 8", () => expect(cryptly.Identifier.toUint48("lEEtLeeT")).toEqual(163007651768211))
	it("fromUint48 length 8", () => expect(cryptly.Identifier.fromUint48(163007651768211)).toEqual("lEEtLeeT"))
	it("toUint48 max safe", () => expect(cryptly.Identifier.toUint48("________")).toEqual(281474976710655))
	it("fromUint48 max safe", () => expect(cryptly.Identifier.fromUint48(281474976710655)).toEqual("________"))
	it("toUint48 min safe", () => expect(cryptly.Identifier.toUint48("AAAAAAAA")).toEqual(0))
	it("fromUint48 min safe", () => expect(cryptly.Identifier.fromUint48(0)).toEqual("AAAAAAAA"))
	it("min", () => expect(cryptly.Identifier.min(4)).toEqual("----"))
	it("max", () => expect(cryptly.Identifier.max(4)).toEqual("zzzz"))
	it("next", () => {
		expect(cryptly.Identifier.next("----")).toEqual("---0")
		expect(cryptly.Identifier.next("---z")).toEqual("--0-")
		expect(cryptly.Identifier.next("zzzz")).toEqual("----")
	})
	it("previous", () => {
		expect(cryptly.Identifier.previous("zzzz")).toEqual("zzzy")
		expect(cryptly.Identifier.previous("zzz-")).toEqual("zzyz")
		expect(cryptly.Identifier.previous("----")).toEqual("zzzz")
	})
	it.each([4, 8, 12, 16, 64] as const)(`ordered id is`, (length: cryptly.Identifier.Length) => {
		expect(cryptly.Identifier.is(cryptly.Identifier.generate(length, "ordered", length), length)).toBeTruthy()
	})
	const time = 1691418818480
	it("pattern", () => {
		expect(cryptly.Identifier.generate(4, "ordered", time)).toMatch(/^---0$/)
		expect(cryptly.Identifier.generate(8, "ordered", time)).toMatch(/^---0XS0e$/)
		expect(cryptly.Identifier.generate(12, "ordered", time)).toMatch(/^---0XS0exv[\w\d-_]{2}$/)
		expect(cryptly.Identifier.generate(16, "ordered", time)).toMatch(/^---0XS0exv[\w\d-_]{6}$/)
		expect(cryptly.Identifier.generate(64, "ordered", time)).toMatch(/^---0XS0exv[\w\d-_]{54}$/)
	})
	it("pattern", () => {
		expect(cryptly.Identifier.generate(4, "reversed", time)).toMatch(/^zzzy$/)
		expect(cryptly.Identifier.generate(8, "reversed", time)).toMatch(/^zzzySXyK$/)
		expect(cryptly.Identifier.generate(12, "reversed", time)).toMatch(/^zzzySXyK13z[\w\d-_]{1}$/)
		expect(cryptly.Identifier.generate(16, "reversed", time)).toMatch(/^zzzySXyK13z[\w\d-_]{5}$/)
		expect(cryptly.Identifier.generate(64, "reversed", time)).toMatch(/^zzzySXyK13z[\w\d-_]{53}$/)
	})
	it.each([4, 8, 12, 16, 64] as const)(`ordered id is ordered`, (length: cryptly.Identifier.Length) => {
		expect(
			cryptly.Identifier.generate(length, "ordered", time + 1) >= cryptly.Identifier.generate(length, "ordered", time)
		).toBeTruthy()
	})
	it.each([4, 8, 12, 16, 64] as const)(`reverse ordered id is`, (length: cryptly.Identifier.Length) => {
		expect(cryptly.Identifier.is(cryptly.Identifier.generate(length, "reversed", length), length)).toBeTruthy()
	})
	it.each([4, 8, 12, 16, 64] as const)(`reverse ordered id is reverse ordered`, (length: cryptly.Identifier.Length) => {
		expect(
			cryptly.Identifier.generate(length, "reversed", time + 1) <= cryptly.Identifier.generate(length, "reversed", time)
		).toBeTruthy()
	})
	it("many ordered", () => {
		expect(
			cryptly.Identifier.generate(16, "ordered", time) < cryptly.Identifier.generate(16, "ordered", time + 1) &&
				cryptly.Identifier.generate(16, "ordered", time + 1) <
					cryptly.Identifier.generate(16, "ordered", time + 21111) &&
				cryptly.Identifier.generate(16, "ordered", time + 2) <
					cryptly.Identifier.generate(16, "ordered", time + 344546) &&
				cryptly.Identifier.generate(16, "ordered", time + 3) <
					cryptly.Identifier.generate(16, "ordered", time + 41112) &&
				cryptly.Identifier.generate(16, "ordered", time + 4) < cryptly.Identifier.generate(16, "ordered", time + 5434)
		).toBeTruthy()
	})
	it("many reversed1", () => {
		expect(
			cryptly.Identifier.generate(16, "reversed", time) > cryptly.Identifier.generate(16, "reversed", time + 1666)
		).toBeTruthy()
	})
	it("many reversed2", () => {
		expect(
			cryptly.Identifier.generate(16, "reversed", time + 1) > cryptly.Identifier.generate(16, "reversed", time + 211111)
		).toBeTruthy()
	})
	it("many reversed3", () => {
		expect(
			cryptly.Identifier.generate(16, "reversed", time + 2) > cryptly.Identifier.generate(16, "reversed", time + 32323)
		).toBeTruthy()
	})
	it("many reversed4", () => {
		expect(
			cryptly.Identifier.generate(16, "reversed", time + 3) > cryptly.Identifier.generate(16, "reversed", time + 434)
		).toBeTruthy()
	})
})
