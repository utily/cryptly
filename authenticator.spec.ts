import { cryptly } from "./index"
describe("authenticator", () => {
	it("HS256 authenticator", async () => {
		const key = "12345678901234567890"
		const time = 1706101897967
		expect(await cryptly.authenticator.generate(key, time - 30000)).toEqual("727592")
		expect(await cryptly.authenticator.generate(key, time)).toEqual("097958")
	})
})
