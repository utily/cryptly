import * as cryptly from "./index"

describe("Password", () => {
	const hash = {
		hash: "Zaa_9Y8lypNcKhNewi62hpeSlsBLoMcoFT3jY6pqi8KhwKOi6sFcM7bc3eOjvfcw9T8KZJ3jv2jMKWCfWbpnsQ",
		salt: "salt",
	}
	it("hash", async () => {
		const signer = await cryptly.Signer.create("HMAC", "SHA-512", "secret-pepper")
		expect(signer && (await cryptly.Password.hash(signer, "password", "salt"))).toEqual(hash)
	})
	it("verify", async () => {
		const signer = await cryptly.Signer.create("HMAC", "SHA-512", "secret-pepper")
		expect(signer && (await cryptly.Password.verify(signer, hash, "password"))).toBeTruthy()
	})
})
