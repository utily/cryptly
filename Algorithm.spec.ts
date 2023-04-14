import { cryptly } from "./index"

describe("Algorithm", () => {
	it("generate AES CBC 256", async () => {
		const algorithm = cryptly.Algorithm.aesCbc(256)
		const key = await algorithm.export()
		expect(key).toHaveLength(43)
	})
	it("generate AES GCM 256", async () => {
		const algorithm = cryptly.Algorithm.aesGcm(256)
		const key = await algorithm.export()
		expect(key).toHaveLength(43)
	})
	it("generate splitted AES CBC 256", async () => {
		const algorithm = cryptly.Algorithm.aesCbc(256)
		const keys = await algorithm.export(2)
		expect(keys).toHaveLength(2)
	})
	it("encrypt & decrypt AES CBC", async () => {
		const algorithm = cryptly.Algorithm.aesCbc(256)
		const encrypted = await algorithm.encrypt("The meaning of life, the universe and everything.")
		expect(encrypted.salt).toHaveLength(22)
		expect(encrypted.value).toHaveLength(86)
		const decrypted = await algorithm.decrypt(encrypted)
		expect(decrypted).toEqual("The meaning of life, the universe and everything.")
	})
	it("encrypt & decrypt AES GCM", async () => {
		const algorithm = cryptly.Algorithm.aesGcm("25ji7n8YAKwPvyWrtR3lUUbxABzAHA2zzdIG_Zb13Iw")
		const encrypted = await algorithm.encrypt("The meaning of life, the universe and everything.")
		expect(encrypted.salt).toHaveLength(22)
		expect(encrypted.value).toHaveLength(87)
		const decrypted = await algorithm.decrypt(encrypted)
		expect(decrypted).toEqual("The meaning of life, the universe and everything.")
	})
	it("encrypt & decrypt AES CBC with fixed salt", async () => {
		const algorithm = cryptly.Algorithm.aesCbc("VaVdZS5E6s9oEdLonNVTgSKv5zAW0LNvjBSdrmnEBS8")
		const encrypted = await algorithm.encrypt(
			"The meaning of life, the universe and everything.",
			"K1LVSh3fzl_UTQl02fIMzg"
		)
		expect(encrypted.salt).toEqual("K1LVSh3fzl_UTQl02fIMzg")
		expect(encrypted.value).toEqual(
			"VSzGsuBi-Y2L719u3ALxpvnxeAjfJxwcXsSfJSRtwWYA8-qUXBeyQo6A0ZX7QkDgnTEqM70Cdb1-eVa7izHyFQ"
		)
		expect(await algorithm.encrypt("The meaning of life, the universe and everything.")).not.toEqual(encrypted.value)
		const decrypted = await algorithm.decrypt(encrypted)
		expect(decrypted).toEqual("The meaning of life, the universe and everything.")
		const decrypted2 = await algorithm.decrypt(encrypted.value, encrypted.salt)
		expect(decrypted2).toEqual("The meaning of life, the universe and everything.")
	})
	it("split keys", async () => {
		const algorithm = cryptly.Algorithm.aesCbc(256)
		const master = await algorithm.export()
		expect(master).toHaveLength(43)
		const keys = await algorithm.export(3)
		expect(keys).toHaveLength(3)
		keys.map(key => expect(key).toHaveLength(43))
		const imported = await cryptly.Algorithm.aesCbc(keys).export()
		expect(imported).toHaveLength(43)
		expect(imported).toEqual(master)
	})

	it("export left/right key", async () => {
		const algorithm = cryptly.Algorithm.aesGcm(256)
		const key = await algorithm.export()
		expect(key).toHaveLength(43)
		const left = cryptly.Algorithm.random(256)

		const right = await algorithm.export(left)
		const testValueLeft = await algorithm.export(right)
		const testValueRight = await algorithm.export(testValueLeft)
		expect(testValueLeft).toEqual(left)
		expect(testValueRight).toEqual(right)
	})

	it("random", async () => {
		const random1 = cryptly.Algorithm.random(256)
		const random2 = cryptly.Algorithm.random(256, 2)
		const random3 = cryptly.Algorithm.random(256, 3)

		expect(typeof random1 == "string").toBeTruthy()
		expect(random2).toHaveLength(2)
		expect(random3).toHaveLength(3)
	})
})
