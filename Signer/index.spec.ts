import { Signer } from "./index"

const publicKey =
	"MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANHX1PuqVidn8VbHgIGnz7/9ix90PKVm" +
	"Ma2ru4NW2De+95TMP9j6pR2H4UGbOB442hxx6g/2nOMgJemc30J3UR0CAwEAAQ=="

const privateKey =
	"MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEA0dfU+6pWJ2fxVseA" +
	"gafPv/2LH3Q8pWYxrau7g1bYN773lMw/2PqlHYfhQZs4HjjaHHHqD/ac4yAl6Zzf" +
	"QndRHQIDAQABAkA4ASWLwUtbGwezRG2MrQ/qSq3dyDUDY8HwevwBsqTkQ2ytqLEB" +
	"W0G+Cs0+njKNyvaqh5Ej10JqAGt4LNWS0I/VAiEA6+qckEJ6tUvf+pvbC/4aXmUI" +
	"/dErNDYa9mSuDV/BW4cCIQDjtP83TsduxKLrpZkMLM0OUavBj3o/fG5LkWX9m9c/" +
	"OwIgK9+p1jpGz8iYkubBSe2rwbpQfcOUoVUelowKwnn4X6kCIQC7Zy4YpcRq/Hid" +
	"eieQppqI61xxLBVPhKf9l4eaBpVLGwIhAL3xxhKrp1jQiAIhaEmR1Zpft6LPXy5a" +
	"gQFvTAQYTjgh"

const publicKeyECDSA521 =
	"MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE5FCaqhKm7af7Jar/qw1ii5ayIMoTOwlD" +
	"LsKyXQyOio2di2hWvVRpBVs3ESLi85Sk2YqLKUh1JOGW+KQGpcAPTg=="

const privateKeyECDSA521 =
	"MHQCAQEEIEGmJObKJLXhUXkWZbdtZ1Whe5WKojkcaDFo6TvaH8JBoAcGBSuBBAAK" +
	"oUQDQgAE5FCaqhKm7af7Jar/qw1ii5ayIMoTOwlDLsKyXQyOio2di2hWvVRpBVs3" +
	"ESLi85Sk2YqLKUh1JOGW+KQGpcAPTg=="

const publicKeyPSS =
	"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzyis1ZjfNB0bBgKFMSv" +
	"vkTtwlvBsaJq7S5wA+kzeVOVpVWwkWdVha4s38XM/pa/yr47av7+z3VTmvDRyAHc" +
	"aT92whREFpLv9cj5lTeJSibyr/Mrm/YtjCZVWgaOYIhwrXwKLqPr/11inWsAkfIy" +
	"tvHWTxZYEcXLgAXFuUuaS3uF9gEiNQwzGTU1v0FqkqTBr4B8nW3HCN47XUu0t8Y0" +
	"e+lf4s4OxQawWD79J9/5d3Ry0vbV3Am1FtGJiJvOwRsIfVChDpYStTcHTCMqtvWb" +
	"V6L11BWkpzGXSW4Hv43qa+GSYOD2QU68Mb59oSk2OB+BtOLpJofmbGEGgvmwyCI9" +
	"MwIDAQAB"

const privateKeyPSS =
	"MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCfPKKzVmN80HRs" +
	"GAoUxK++RO3CW8GxomrtLnAD6TN5U5WlVbCRZ1WFrizfxcz+lr/Kvjtq/v7PdVOa" +
	"8NHIAdxpP3bCFEQWku/1yPmVN4lKJvKv8yub9i2MJlVaBo5giHCtfAouo+v/XWKd" +
	"awCR8jK28dZPFlgRxcuABcW5S5pLe4X2ASI1DDMZNTW/QWqSpMGvgHydbccI3jtd" +
	"S7S3xjR76V/izg7FBrBYPv0n3/l3dHLS9tXcCbUW0YmIm87BGwh9UKEOlhK1NwdM" +
	"Iyq29ZtXovXUFaSnMZdJbge/jepr4ZJg4PZBTrwxvn2hKTY4H4G04ukmh+ZsYQaC" +
	"+bDIIj0zAgMBAAECggEAKIBGrbCSW2O1yOyQW9nvDUkA5EdsS58Q7US7bvM4iWpu" +
	"DIBwCXur7/VuKnhn/HUhURLzj/JNozynSChqYyG+CvL+ZLy82LUE3ZIBkSdv/vFL" +
	"Ft+VvvRtf1EcsmoqenkZl7aN7HD7DJeXBoz5tyVQKuH17WW0fsi9StGtCcUl+H6K" +
	"zV9Gif0Kj0uLQbCg3THRvKuueBTwCTdjoP0PwaNADgSWb3hJPeLMm/yII4tIMGbO" +
	"w+xd9wJRl+ZN9nkNtQMxszFGdKjedB6goYLQuP0WRZx+YtykaVJdM75bDUvsQar4" +
	"9Pc21Fp7UVk/CN11DX/hX3TmTJAUtqYADliVKkTbCQKBgQDLU48tBxm3g1CdDM/P" +
	"ZIEmpA3Y/m7e9eX7M1Uo/zDh4G/S9a4kkX6GQY2dLFdCtOS8M4hR11Io7MceBKDi" +
	"djorTZ5zJPQ8+b9Rm+1GlaucGNwRW0cQk2ltT2ksPmJnQn2xvM9T8vE+a4A/YGzw" +
	"mZOfpoVGykWs/tbSzU2aTaOybQKBgQDIfRf6OmirGPh59l+RSuDkZtISF/51mCV/" +
	"S1M4DltWDwhjC2Y2T+meIsb/Mjtz4aVNz0EHB8yvn0TMGr94Uwjv4uBdpVSwz+xL" +
	"hHL7J4rpInH+i0gxa0N+rGwsPwI8wJG95wLY+Kni5KCuXQw55uX1cqnnsahpRZFZ" +
	"EerBXhjqHwKBgBmEjiaHipm2eEqNjhMoOPFBi59dJ0sCL2/cXGa9yEPA6Cfgv49F" +
	"V0zAM2azZuwvSbm4+fXTgTMzrDW/PPXPArPmlOk8jQ6OBY3XdOrz48q+b/gZrYyO" +
	"A6A9ZCSyW6U7+gxxds/BYLeFxF2v21xC2f0iZ/2faykv/oQMUh34en/tAoGACqVZ" +
	"2JexZyR0TUWf3X80YexzyzIq+OOTWicNzDQ29WLm9xtr2gZ0SUlfd72bGpQoyvDu" +
	"awkm/UxfwtbIxALkvpg1gcN9s8XWrkviLyPyZF7H3tRWiQlBFEDjnZXa8I7pLkRO" +
	"Cmdp3fp17cxTEeAI5feovfzZDH39MdWZuZrdh9ECgYBTEv8S7nK8wrxIC390kroV" +
	"52eBwzckQU2mWa0thUtaGQiU1EYPCSDcjkrLXwB72ft0dW57KyWtvrB6rt1ORgOL" +
	"eI5hFbwdGQhCHTrAR1vG3SyFPMAm+8JB+sGOD/fvjtZKx//MFNweKFNEF0C/o6Z2" +
	"FXj90PlgF8sCQut36ZfuIQ=="

describe("Signer", () => {
	it("Create None", async () => {
		const signer = Signer.create("None")
		const signature = await signer.sign("Some string")
		expect(await signer.verify("Some string", signature)).toEqual(true)
	})
	it("Create HMAC", async () => {
		const signer = Signer.create("HMAC", "SHA-256", "Super Secret Encryption Key")
		const signature = await signer.sign("Some string")
		expect(await signer.verify("Some string", signature)).toEqual(true)
	})
	it("Create RSA from public Key", async () => {
		const signer = Signer.create("RSA", "SHA-256", publicKey)
		const signature = "Mt_9lCR7XgmVg0PZIN3xJJtHELMx73WynaEyU03eqX2FNUr10tG5P4PmsoSESbb_5BhSKjTqOjoHDCH96njqpg"
		expect(await signer.verify("Some string", signature)).toEqual(true)
	})
	it("Create RSA from private Key", async () => {
		const signer = Signer.create("RSA", "SHA-256", publicKey, privateKey)
		console.log({ private: await signer.export("private"), public: await signer.export("public") })
		const signature = await signer.sign("Some string")
		expect(await signer.verify("Some string", signature)).toEqual(true)
	})
	it("Create RSA-PSS from public Key", async () => {
		const signer = Signer.create("RSA-PSS", "SHA-256", publicKeyPSS)
		const signature =
			"ncd0q-5A-UuGcI0Piic7JnmUneX3rWoko9B_-iFxBSxNHnPwsWLGVVSCIAEs1EWfgVc9U5PDAYMDRwmrAl_BIxbmsYzLDTTm1xSaUTzAiEPZ1ya3GXKUU6g-N7muI0eJwg5hgV-H5i-t8vqQuSgxPdovZIc30X445PSRp3BpgNGKqR_SU-6DQj95fkW3lvDjeqzzG4et5ZXyp9LQuafI4wWGzdpzmLoPDmFvgl0YcCMx3JCTkuD1GgpkFbZewGJuTxhppX2JcmKQANeU5qN9KLZyP0Vh5tJYttXz5wy1FqK34OlkGTgjFre1VCuxb2yJ4ALL5mtpKEqXS8YqnoKdTw"
		expect(await signer.verify("Some string", signature)).toEqual(true)
	})
	it("Create RSA-PSS from private Key", async () => {
		const signer = Signer.create("RSA-PSS", "SHA-256", publicKeyPSS, privateKeyPSS)
		const signature = await signer.sign("Some string")
		expect(await signer.verify("Some string", signature)).toEqual(true)
	})
	it.skip("Create ECDSA 256", async () => {
		// does not work currently on Node
		const signer = Signer.create("ECDSA", "SHA-256", publicKey, privateKey)
		const signature = await signer.sign("Some string")
		expect(await signer.verify("Some string", signature)).toEqual(true)
	})

	it.skip("Create ECDSA 512", async () => {
		// does not work currently on Node
		const signer = Signer.create("ECDSA", "SHA-512", publicKeyECDSA521, privateKeyECDSA521)
		const signature = await signer.sign("Some string")
		expect(await signer.verify("Some string", signature)).toEqual(true)
	})
})
