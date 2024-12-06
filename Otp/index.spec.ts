import { isoly } from "isoly"
import { cryptly } from "../index"

describe("Authenticator", () => {
	const generator = cryptly.Otp.Generator.create("12345678901234567890")
	it("seconds to DateTime", async () =>
		expect(isoly.DateTime.create(1706101897967, "milliseconds")).toEqual("2024-01-24T13:11:37.967Z"))
	it("DateTime to seconds", async () =>
		expect(isoly.DateTime.epoch("2024-01-24T13:11:37.967Z", "milliseconds")).toEqual(1706101897967))
	it("Generate 6 digits TOTP", async () => {
		expect(await generator.generate("2024-01-24T13:11:07.967Z")).toEqual("727592")
		expect(await generator.generate("2024-01-24T13:11:37.967Z")).toEqual("097958")
	})
	it("as URL for QR Code", async () =>
		expect(generator.toUrl("TestApp", "test.testsson@test.test")).toEqual(
			"otpauth://totp/TestApp:test.testsson@test.test?secret=GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ&issuer=TestApp"
		))
	it("Generate 8 digits TOTP", async () => {
		const g = generator.change({ length: 8 })
		expect(await g.generate("2024-01-24T13:11:07.967Z")).toEqual("22727592")
		expect(await g.generate("2024-01-24T13:11:37.967Z")).toEqual("30097958")
	})
	it("old backup codes", async () =>
		expect(
			await generator
				.change({ length: 8 })
				.generate([123456, 234567, 345678].map(t => isoly.DateTime.create(t, "milliseconds")))
		).toEqual(["40338314", "82162583", "43481090"]))
	it("correct backup codes", async () =>
		expect(await generator.change({ length: 8 }).generate(1, 3)).toEqual(["94287082", "37359152", "26969429"]))
})
