import { cryptly } from "./index"

describe("Base16", () => {
	it("encode standard 1", () =>
		expect(cryptly.Base16.encode("This is the data (*)")).toEqual("5468697320697320746865206461746120282a29"))
	it("encode standard 2", () =>
		expect(cryptly.Base16.encode("any carnal pleasure.")).toEqual("616e79206361726e616c20706c6561737572652e"))
	it("encode standard 3", () =>
		expect(cryptly.Base16.encode("any carnal pleasure")).toEqual("616e79206361726e616c20706c656173757265"))
	it("encode standard 4", () =>
		expect(cryptly.Base16.encode("any carnal pleasur")).toEqual("616e79206361726e616c20706c6561737572"))
	it("decode standard 1", () =>
		expect(new cryptly.TextDecoder().decode(cryptly.Base16.decode("5468697320697320746865206461746120282a29"))).toEqual(
			"This is the data (*)"
		))
	it("decode standard 2", () =>
		expect(new cryptly.TextDecoder().decode(cryptly.Base16.decode("616e79206361726e616c20706c6561737572652e"))).toEqual(
			"any carnal pleasure."
		))
	it("decode standard 3", () =>
		expect(new cryptly.TextDecoder().decode(cryptly.Base16.decode("616e79206361726e616c20706c656173757265"))).toEqual(
			"any carnal pleasure"
		))
	it("decode standard 4", () =>
		expect(new cryptly.TextDecoder().decode(cryptly.Base16.decode("616e79206361726e616c20706c6561737572"))).toEqual(
			"any carnal pleasur"
		))
})
