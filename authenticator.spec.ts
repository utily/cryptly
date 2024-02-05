import { cryptly } from "./index"

describe("authenticator", () => {
	const key = "12345678901234567890"
	it("HS256 authenticator", async () => {
		const time = 1706101897967
		expect(await cryptly.authenticator.generate(key, time - 30000)).toEqual("727592")
		expect(await cryptly.authenticator.generate(key, time)).toEqual("097958")
		expect(cryptly.authenticator.toQrCode(key, "TestApp", "test.testsson@test.test")).toEqual(
			"otpauth://totp/TestApp:test.testsson@test.test?secret=GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ&issuer=TestApp"
		)
		expect(await cryptly.authenticator.generate(key, time - 30000, 8)).toEqual("22727592")
		expect(await cryptly.authenticator.generate(key, time, 8)).toEqual("30097958")
	})
	it("Backup codes", async () => {
		const times = [123456, 234567, 345678]
		const backups = await cryptly.authenticator.generateRecoveryCodes(key, times)
		expect(backups).toEqual(["40338314", "82162583", "43481090"])
	})
})
