import { cryptly } from "../index"

describe("Base16", () => {
	it.each(["1337", "1ee7", "1EE7", "", "0", "ffff"])("is %s", value => expect(cryptly.Base16.is(value)).toEqual(true))
	it.each(["13.37", "1eet", "1EET", "O"])("is not %s", value => expect(cryptly.Base16.is(value)).toEqual(false))
	it("encode standard 1", () =>
		expect(cryptly.Base16.encode("This is the data (*)")).toEqual("5468697320697320746865206461746120282a29"))
	it("encode standard 2", () =>
		expect(cryptly.Base16.encode("any carnal pleasure.")).toEqual("616e79206361726e616c20706c6561737572652e"))
	it("encode standard 3", () =>
		expect(cryptly.Base16.encode("any carnal pleasure")).toEqual("616e79206361726e616c20706c656173757265"))
	it("encode standard 4", () =>
		expect(cryptly.Base16.encode("any carnal pleasur")).toEqual("616e79206361726e616c20706c6561737572"))
	it("decode standard 1", () =>
		expect(new TextDecoder().decode(cryptly.Base16.decode("5468697320697320746865206461746120282a29"))).toEqual(
			"This is the data (*)"
		))
	it("decode standard 2", () =>
		expect(new TextDecoder().decode(cryptly.Base16.decode("616e79206361726e616c20706c6561737572652e"))).toEqual(
			"any carnal pleasure."
		))
	it("decode standard 3", () =>
		expect(new TextDecoder().decode(cryptly.Base16.decode("616e79206361726e616c20706c656173757265"))).toEqual(
			"any carnal pleasure"
		))
	it("decode standard 4", () =>
		expect(new TextDecoder().decode(cryptly.Base16.decode("616e79206361726e616c20706c6561737572"))).toEqual(
			"any carnal pleasur"
		))
	it("xor", () =>
		expect(
			cryptly.Base16.xor(["5468697320697320746865206461746120282a29", "616e79206361726e616c20706c656173757265"])
		).toMatchInlineSnapshot(`"5409070a000a12521a090900140d1100535d584c"`))
	it("bytewiseAdd", () =>
		expect(
			cryptly.Base16.bytewiseAdd(["5468697320697320746865206461746120282a29", "616e79206361726e616c20706c656173757265"])
		).toMatchInlineSnapshot(`"54c9d7ec40ccd492e2c9d140d4cdd9c2939d9c8e"`))
	it("add", () =>
		expect(
			cryptly.Base16.add(["5468697320697320746865206461746120282a29", "616e79206361726e616c20706c656173757265"])
		).toMatchInlineSnapshot(`"54c9d7ec40ccd492e2c9d140d4cdd9c2939d9c8e"`))
	it("combine", () =>
		expect(
			cryptly.Base16.combine(["5468697320697320746865206461746120282a29", "616e79206361726e616c20706c656173757265"])
		).toMatchInlineSnapshot(`"549aaad2819fbad3cb9a9b819d90c284d3edf0e0"`))
})
