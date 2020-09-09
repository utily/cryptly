import { Password } from "./Password"
import { Signer } from "./Signer"

describe("Password", () => {
	const hash = {
		hash: "Zaa_9Y8lypNcKhNewi62hpeSlsBLoMcoFT3jY6pqi8KhwKOi6sFcM7bc3eOjvfcw9T8KZJ3jv2jMKWCfWbpnsQ",
		salt: "salt",
	}
	it("hash", async () => {
		expect(await Password.hash(Signer.create("HMAC", "SHA-512", "secret-pepper"), "password", "salt")).toEqual(hash)
	})
	it("verify", async () => {
		expect(await Password.verify(Signer.create("HMAC", "SHA-512", "secret-pepper"), hash, "password")).toBeTruthy()
	})
})
