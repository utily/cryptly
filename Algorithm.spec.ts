import * as pgp from "openpgp"
import { crypto } from "./crypto"
import * as cryptly from "./index"
import { keyblock, keyblock2 } from "./keyblock"

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

	// it("card export", async () => {
	// 	const cards = [
	// 		{ pan: "4111111111111111", expires: [1, 25], reference: "reference1" },
	// 		{ pan: "5111111111111111", expires: [2, 25], reference: "reference2" },
	// 		{ pan: "6111111111111111", expires: [3, 25], reference: "reference3" },
	// 		{ pan: "7111111111111111", expires: [4, 25], reference: "reference4" },
	// 	]
	// 	const key = await crypto.subtle.generateKey(
	// 		{
	// 			name: "AES-GCM",
	// 			length: 256,
	// 		},
	// 		true,
	// 		["encrypt", "decrypt"]
	// 	)
	// 	console.log("key", key)
	// 	// const a = JSON.stringify(await crypto.subtle.exportKey("jwk", key))
	// 	// console.log("a", a)
	// 	// const i = await crypto.subtle.importKey(
	// 	// 	"jwk",
	// 	// 	JSON.parse(a),
	// 	// 	{
	// 	// 		name: "AES-GCM",
	// 	// 	},
	// 	// 	false,
	// 	// 	["encrypt", "decrypt"]
	// 	// )
	// 	// console.log("i",i)
	// 	// const stringi = JSON.stringify(key)
	// 	// const parsed = JSON.parse(stringi)
	// 	// console.log("parsed", parsed)

	// 	// encrypt
	// 	const encoded = new TextEncoder().encode(JSON.stringify(cards))
	// 	const iv = crypto.getRandomValues(new Uint8Array(12)).toString()
	// 	console.log("iv", iv)

	// 	const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded)
	// 	console.log("encrypted", encrypted)
	// 	// decrypt
	// 	const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encrypted)
	// 	const decoded = new TextDecoder().decode(decrypted)
	// 	expect(decoded).toBe(JSON.stringify(cards))
	// })
	it("pgp encrypt", async () => {
		const cards = [
			{ pan: "4111111111111111", expires: [1, 25], reference: "reference1" },
			{ pan: "5111111111111111", expires: [2, 25], reference: "reference2" },
			{ pan: "6111111111111111", expires: [3, 25], reference: "reference3" },
			{ pan: "7111111111111111", expires: [4, 25], reference: "reference4" },
		]
		const keys = await pgp.generateKey({
			userIDs: [{ name: "person", email: "person@somebody.com" }],
			curve: "ed25519",
		})
		const publicKeys = await pgp.readKey({
			armoredKey: keyblock2,
		})
		const message = await pgp.createMessage({ text: JSON.stringify(cards) })
		// const message = await pgp.readMessage({ armoredMessage: JSON.stringify(cards) })
		const encrypted = await pgp.encrypt({
			message,
			encryptionKeys: publicKeys,
		})
		// console.log("key", keys)
		console.log("encrypted", encrypted)
		// const a = JSON.stringify(await crypto.subtle.exportKey("jwk", key))
		// console.log("a", a)
		// const i = await crypto.subtle.importKey(
		// 	"jwk",
		// 	JSON.parse(a),
		// 	{
		// 		name: "AES-GCM",
		// 	},
		// 	false,
		// 	["encrypt", "decrypt"]
		// )
		// console.log("i",i)
		// const stringi = JSON.stringify(key)
		// const parsed = JSON.parse(stringi)
		// console.log("parsed", parsed)

		// encrypt
		// const encoded = new TextEncoder().encode(JSON.stringify(cards))
		// const iv = crypto.getRandomValues(new Uint8Array(12)).toString()
		// console.log("iv", iv)

		// const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded)
		// console.log("encrypted", encrypted)
		// // decrypt
		// const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encrypted)
		// const decoded = new TextDecoder().decode(decrypted)
		// expect(decoded).toBe(JSON.stringify(cards))
	})
})
