import { cryptly } from "./index"

describe("Base64", () => {
	it("encode standard =", () =>
		expect(cryptly.Base64.encode("This is the data (*)", "standard", "=")).toEqual("VGhpcyBpcyB0aGUgZGF0YSAoKik="))
	it("encode standard = 1", () =>
		expect(cryptly.Base64.encode("any carnal pleasure.", "standard", "=")).toEqual("YW55IGNhcm5hbCBwbGVhc3VyZS4="))
	it("encode standard = 2", () =>
		expect(cryptly.Base64.encode("any carnal pleasure", "standard", "=")).toEqual("YW55IGNhcm5hbCBwbGVhc3VyZQ=="))
	it("encode standard = 0", () =>
		expect(cryptly.Base64.encode("any carnal pleasur", "standard", "=")).toEqual("YW55IGNhcm5hbCBwbGVhc3Vy"))
	describe.each(["ordered", "reversed"] as const)("", (type: "ordered" | "reversed") => {
		it.each(["2020-12-31", "2023-11-30", "2023-12-30"])(`encode ${type} and check order`, (date: string) => {
			const [small, big] = [cryptly.Base64.encode(date, type), cryptly.Base64.encode("2023-12-31", type)]
			expect(type == "reversed" ? small > big : small < big).toBeTruthy()
		})
		it(`${type} from number`, () => {
			const now = new Date().getTime()
			const [small, big] = [cryptly.Base64.encode(now, type), cryptly.Base64.encode(now + 1, type)]
			expect(type == "reversed" ? small > big : small < big).toBeTruthy()
		})
		it(`${type} to be equal`, () => {
			const now = new Date().getTime()
			expect(cryptly.Base64.encode(now, type) == cryptly.Base64.encode(now, type)).toBeTruthy()
		})
	})
	it(`encode ordered`, () => {
		expect(cryptly.Base64.encode("This is the data (*)", "ordered", "=")).not.toEqual("VGhpcyBpcyB0aGUgZGF0YSAoKik=")
		expect(cryptly.Base64.encode("This is the data (*)", "ordered")).toEqual("K5WdRm0dRm0oP5JVO54oNH-c9XZ")
	})
	it("encode reversed", () => {
		expect(cryptly.Base64.encode("This is the data (*)", "reversed", "=")).not.toEqual("VGhpcyBpcyB0aGUgZGF0YSAoKik=")
		expect(cryptly.Base64.encode("This is the data (*)", "reversed", "=")).toEqual("etTLYCyLYCyA_tfUatuAbhzMpSQ=")
	})
	it("encode url", () =>
		expect(cryptly.Base64.encode("This is the data (*)", "url", "")).toEqual("VGhpcyBpcyB0aGUgZGF0YSAoKik"))
	it("decode url", () =>
		expect(new cryptly.TextDecoder().decode(cryptly.Base64.decode("VGhpcyBpcyB0aGUgZGF0YSAoKik", "url"))).toEqual(
			"This is the data (*)"
		))
	it("decode standard =", () =>
		expect(new cryptly.TextDecoder().decode(cryptly.Base64.decode("VGhpcyBpcyB0aGUgZGF0YSAoKik==", "url"))).toEqual(
			"This is the data (*)"
		))
	it("decode DvT", () => expect(cryptly.Base64.decode("DvQ", "url")).toEqual(Uint8Array.from([14, 244])))
	it("decode DvT", () => expect(cryptly.Base64.encode(Uint8Array.from([14, 244]), "url")).toEqual("DvQ"))
	it("xor", () =>
		expect(cryptly.Base64.xor(["V6h7cyBpcyB0taUgZGF0YSAoK72", "Y4y5IGNhcm5hbCBwbGVhc3VyZ7u8"])).toMatchInlineSnapshot(
			`"Y9sRWxBBGx1BGJXVTAEABxRST5AB"`
		))
	it("bytewiseAdd", () =>
		expect(
			cryptly.Base64.bytewiseAdd(["V6h7cyBpcyB0taUgZGF0YSAoK72", "Y4y5IGNhcm5hbCBwbGVhc3VyZ7u8"])
		).toMatchInlineSnapshot(`"Y+Nhm9aB2+GB4NUVjMnC59aSj+Z5"`))
	it("add", () =>
		expect(cryptly.Base64.add(["V6h7cyBpcyB0taUgZGF0YSAoK72", "Y4y5IGNhcm5hbCBwbGVhc3VyZ7u8"])).toMatchInlineSnapshot(
			`"Y+Rhm9aB2+GB4NYVjMnC59aSj+d5"`
		))
	it("combine", () =>
		expect(
			cryptly.Base64.combine(["V6h7cyBpcyB0taUgZGF0YSAoK72", "Y4y5IGNhcm5hbCBwbGVhc3VyZ7u8"])
		).toMatchInlineSnapshot(`"ZJOykrzCrsfCykFfzZKF0JjS4D7z"`))
})
