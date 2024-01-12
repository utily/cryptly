import { cryptly } from "../../index"

describe("Encrypter.Rsa", () => {
	it("generate RSA OAEP 2048", async () => {
		const encrypter = cryptly.Encrypter.Rsa.generate(2048)
		const key = await encrypter.export("public")
		expect(key).toHaveLength(392)
	})
	it("encrypt & decrypt RSA OAEP with generated key", async () => {
		const encrypter = cryptly.Encrypter.Rsa.generate(2048)
		const encrypted = await encrypter.encrypt("The meaning of life, the universe and everything.")
		expect(encrypted).toBeDefined()
		if (encrypted) {
			expect(encrypted.value).toHaveLength(342)
			const decrypted = await encrypter.decrypt(encrypted)
			expect(decrypted).toEqual("The meaning of life, the universe and everything.")
		}
	})
	it("encrypt & decrypt RSA OAEP with imported key, separate private/public export/import", async () => {
		const generated = cryptly.Encrypter.Rsa.generate(2048)

		const privateKey = await generated.export("private")
		const publicKey = await generated.export("public")
		expect(privateKey).toBeDefined()
		if (publicKey) {
			const encrypterPublic = cryptly.Encrypter.Rsa.import("public", publicKey)
			const encrypted = await encrypterPublic.encrypt("The meaning of life, the universe and everything.")
			expect(encrypted).toBeDefined()
			if (encrypted && privateKey) {
				const encrypterPrivate = cryptly.Encrypter.Rsa.import("private", privateKey)
				expect(encrypted.value).toHaveLength(342)
				const decrypted = await encrypterPrivate.decrypt(encrypted)
				expect(decrypted).toEqual("The meaning of life, the universe and everything.")
			} else {
				fail()
			}
		} else {
			fail()
		}
	})
	it("encrypt & decrypt RSA OAEP with imported key, export/import both keys at once", async () => {
		const generated = cryptly.Encrypter.Rsa.generate(2048)

		const keys = await generated.export()
		const privateKey = keys.private
		const publicKey = keys.public
		expect(keys).toBeDefined()
		if (keys && privateKey && publicKey) {
			const encrypter = cryptly.Encrypter.Rsa.import(publicKey, privateKey)
			const encrypted = await encrypter.encrypt("The meaning of life, the universe and everything.")
			expect(encrypted).toBeDefined()
			if (encrypted) {
				expect(encrypted.value).toHaveLength(342)
				const decrypted = await encrypter.decrypt(encrypted)
				expect(decrypted).toEqual("The meaning of life, the universe and everything.")
			} else {
				fail()
			}
		} else {
			fail()
		}
	})
})
