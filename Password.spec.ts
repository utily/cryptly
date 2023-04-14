import { cryptly } from "./index"

describe("Password", () => {
	const hash = {
		hash: "Zaa_9Y8lypNcKhNewi62hpeSlsBLoMcoFT3jY6pqi8KhwKOi6sFcM7bc3eOjvfcw9T8KZJ3jv2jMKWCfWbpnsQ",
		salt: "salt",
	}
	it("hash", async () => {
		expect(
			await cryptly.Password.hash(cryptly.Signer.create("HMAC", "SHA-512", "secret-pepper"), "password", "salt")
		).toEqual(hash)
	})
	it("verify", async () => {
		expect(
			await cryptly.Password.verify(cryptly.Signer.create("HMAC", "SHA-512", "secret-pepper"), hash, "password")
		).toBeTruthy()
	})
})
