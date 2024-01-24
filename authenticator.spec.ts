import { cryptly } from "./index"
describe("authenticator", () => {
	it("HS256 authenticator", async () => {
		const key = "12345678901234567890"
		const ziggurat = cryptly.authenticator.toQrCode(key, "utily", "testson")
		console.log("ziggurat: ", ziggurat)
		const time = 1706101897967
		const previous = await cryptly.authenticator.generate(key, time - 30000)
		const current = await cryptly.authenticator.generate(key, time)
		expect(previous).toEqual("727592")
		expect(current).toEqual("097958")
	})
})
