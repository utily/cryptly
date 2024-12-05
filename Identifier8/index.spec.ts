import { cryptly } from "../index"

describe("Identifier8", () => {
	it("is generate", () => expect(cryptly.Identifier8.is(cryptly.Identifier8.generate())).toBeTruthy())
	it("generate", () => {
		const identifier = cryptly.Identifier8.generate()
		expect(identifier).toHaveLength(8)
		expect(cryptly.Identifier8.fromBinary(cryptly.Identifier8.toBinary(identifier))).toEqual(identifier)
		expect(cryptly.Identifier8.fromHexadecimal(cryptly.Identifier8.toHexadecimal(identifier))).toEqual(identifier)
	})
	it("is", () => expect(cryptly.Identifier8.is("aAzZ09-_")).toBeTruthy())
	it("is not !", () => expect(cryptly.Identifier.is("Hello!0123")).toBeFalsy())
	it("is not /", () => expect(cryptly.Identifier.is("Hello/0123")).toBeFalsy())
	it("is not =", () => expect(cryptly.Identifier.is("Hello=0123")).toBeFalsy())
	it("is not .", () => expect(cryptly.Identifier.is("Hello.0123")).toBeFalsy())

	it("fromHexadecimal length 24", () =>
		expect(cryptly.Identifier8.fromHexadecimal("5d4282b672ed3c7738183bd3")).toEqual("PHc4GDvT"))
	it("toHexadecimal length 24", () => expect(cryptly.Identifier8.toHexadecimal("GDvT")).toEqual("183bd3"))

	it("toBinary length 4", () => expect(cryptly.Identifier8.toBinary("tgAg")).toEqual(Uint8Array.from([182, 0, 32])))
	it("fromBinary length 4", () => expect(cryptly.Identifier8.fromBinary(Uint8Array.from([182, 0, 32]))).toEqual("tgAg"))

	it("toHexadecimal QYklGX_K", () => expect(cryptly.Identifier8.toHexadecimal("QYklGX_K")).toEqual("418925197fca"))
	it("fromHexadecimal QYklGX_K", () => expect(cryptly.Identifier8.fromHexadecimal("418925197fca")).toEqual("QYklGX_K"))
	it("toHexadecimal length 6", () => expect(cryptly.Identifier8.toHexadecimal("DvQecA")).toEqual("0ef41e70"))
	it("fromHexadecimal length 6", () => expect(cryptly.Identifier8.fromHexadecimal("0ef41e70")).toEqual("AADvQecA"))
	it("fromDecimal length 6", () => expect(cryptly.Identifier8.toHexadecimal("DvQecA")).toEqual("0ef41e70"))
	it("fromHexadecimal length 6", () => expect(cryptly.Identifier8.fromHexadecimal("0ef41e70")).toEqual("AADvQecA"))

	it("toUint48 length 8", () => expect(cryptly.Identifier.toUint48("lEEtLeeT")).toEqual(163007651768211))
	it("fromUint48 length 8", () => expect(cryptly.Identifier.fromUint48(163007651768211)).toEqual("lEEtLeeT"))
	it("toUint48 max safe", () => expect(cryptly.Identifier.toUint48("________")).toEqual(281474976710655))
	it("fromUint48 max safe", () => expect(cryptly.Identifier.fromUint48(281474976710655)).toEqual("________"))
	it("toUint48 min safe", () => expect(cryptly.Identifier.toUint48("AAAAAAAA")).toEqual(0))
	it("fromUint48 min safe", () => expect(cryptly.Identifier.fromUint48(0)).toEqual("AAAAAAAA"))
})
