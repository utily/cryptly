import { Digest } from "./index"


describe("Digest", () => {
	it("Get Length 256", async () => {
		expect(new Digest("SHA-256").length).toEqual(256)
	})
	it("Get Length 512", async () => {
		expect(new Digest("SHA-512").length).toEqual(512)
	})
	it("Test SHA-1 digest Hex", async () => {
		const digest = new Digest("SHA-1")
		expect(await digest.digest("Test", 16)).toEqual("640ab2bae07bedc4c163f679a746f7ab7fb5d1fa")
	})
	it("Test SHA-256 digest Hex", async () => {
		const digest = new Digest("SHA-256")
		expect(await digest.digest("Test", 16)).toEqual("532eaabd9574880dbf76b9b8cc00832c20a6ec113d682299550d7a6e0f345e25")
	})
	it("Test SHA-384 digest Hex", async () => {
		const digest = new Digest("SHA-384")
		expect(await digest.digest("Test", 16)).toEqual(
			"7b8f4654076b80eb963911f19cfad1aaf4285ed48e826f6cde1b01a79aa73fadb5446e667fc4f90417782c91270540f3"
		)
	})
	it("Test SHA-512 digest Hex", async () => {
		const digest = new Digest("SHA-512")
		expect(await digest.digest("Test", 16)).toEqual(
			"c6ee9e33cf5c6715a1d148fd73f7318884b41adcb916021e2bc0e800a5c5dd97f5142178f6ae88c8fdd98e1afb0ce4c8d2c54b5f37b30b7da1997bb33b0b8a31"
		)
	})
	it("Test SHA-1 digest Standard", async () => {
		const digest = new Digest("SHA-1")
		expect(await digest.digest("Test", "standard")).toEqual("ZAqyuuB77cTBY/Z5p0b3q3+10fo")
	})
	it("Test SHA-256 digest Standard", async () => {
		const digest = new Digest("SHA-256")
		expect(await digest.digest("Test", "standard")).toEqual("Uy6qvZV0iA2/drm4zACDLCCm7BE9aCKZVQ16bg80XiU")
	})
	it("Test SHA-384 digest Standard", async () => {
		const digest = new Digest("SHA-384")
		expect(await digest.digest("Test", "standard")).toEqual(
			"e49GVAdrgOuWORHxnPrRqvQoXtSOgm9s3hsBp5qnP621RG5mf8T5BBd4LJEnBUDz"
		)
	})
	it("Test SHA-512 digest Standard", async () => {
		const digest = new Digest("SHA-512")
		expect(await digest.digest("Test", "standard")).toEqual(
			"xu6eM89cZxWh0Uj9c/cxiIS0Gty5FgIeK8DoAKXF3Zf1FCF49q6IyP3Zjhr7DOTI0sVLXzezC32hmXuzOwuKMQ"
		)
	})
})
