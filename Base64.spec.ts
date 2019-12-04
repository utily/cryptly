import * as cryptly from "./index"

describe("Base64", () => {
	it("encode standard =", () => expect(cryptly.Base64.encode("This is the data (*)", "standard", "=")).toEqual("VGhpcyBpcyB0aGUgZGF0YSAoKik="))
	it("encode standard = 1", () => expect(cryptly.Base64.encode("any carnal pleasure.", "standard", "=")).toEqual("YW55IGNhcm5hbCBwbGVhc3VyZS4="))
	it("encode standard = 2", () => expect(cryptly.Base64.encode("any carnal pleasure", "standard", "=")).toEqual("YW55IGNhcm5hbCBwbGVhc3VyZQ=="))
	it("encode standard = 0", () => expect(cryptly.Base64.encode("any carnal pleasur", "standard", "=")).toEqual("YW55IGNhcm5hbCBwbGVhc3Vy"))
	it("encode url", () => expect(cryptly.Base64.encode("This is the data (*)", "url", "")).toEqual("VGhpcyBpcyB0aGUgZGF0YSAoKik"))
	it("decode url", () => expect(new cryptly.TextDecoder().decode(cryptly.Base64.decode("VGhpcyBpcyB0aGUgZGF0YSAoKik", "url"))).toEqual("This is the data (*)"))
	it("decode standard =", () => expect(new cryptly.TextDecoder().decode(cryptly.Base64.decode("VGhpcyBpcyB0aGUgZGF0YSAoKik==", "url"))).toEqual("This is the data (*)"))
	it("decode DvT", () => expect(cryptly.Base64.decode("DvQ", "url")).toEqual(Uint8Array.from([14, 244])))
	it("decode DvT", () => expect(cryptly.Base64.encode(Uint8Array.from([14, 244]), "url")).toEqual("DvQ"))
})
