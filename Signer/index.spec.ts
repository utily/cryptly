import { Signer } from "./index"

const publicKey =
	"MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANHX1PuqVidn8VbHgIGnz7/9ix90PKVm" +
	"Ma2ru4NW2De+95TMP9j6pR2H4UGbOB442hxx6g/2nOMgJemc30J3UR0CAwEAAQ=="

const privateKey =
	"MIIBOwIBAAJBANHX1PuqVidn8VbHgIGnz7/9ix90PKVmMa2ru4NW2De+95TMP9j6" +
	"pR2H4UGbOB442hxx6g/2nOMgJemc30J3UR0CAwEAAQJAOAEli8FLWxsHs0RtjK0P" +
	"6kqt3cg1A2PB8Hr8AbKk5ENsraixAVtBvgrNPp4yjcr2qoeRI9dCagBreCzVktCP" +
	"1QIhAOvqnJBCerVL3/qb2wv+Gl5lCP3RKzQ2GvZkrg1fwVuHAiEA47T/N07HbsSi" +
	"66WZDCzNDlGrwY96P3xuS5Fl/ZvXPzsCICvfqdY6Rs/ImJLmwUntq8G6UH3DlKFV" +
	"HpaMCsJ5+F+pAiEAu2cuGKXEavx4nXonkKaaiOtccSwVT4Sn/ZeHmgaVSxsCIQC9" +
	"8cYSq6dY0IgCIWhJkdWaX7eiz18uWoEBb0wEGE44IQ=="

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
	"MIIEogIBAAKCAQEAnzyis1ZjfNB0bBgKFMSvvkTtwlvBsaJq7S5wA+kzeVOVpVWw" +
	"kWdVha4s38XM/pa/yr47av7+z3VTmvDRyAHcaT92whREFpLv9cj5lTeJSibyr/Mr" +
	"m/YtjCZVWgaOYIhwrXwKLqPr/11inWsAkfIytvHWTxZYEcXLgAXFuUuaS3uF9gEi" +
	"NQwzGTU1v0FqkqTBr4B8nW3HCN47XUu0t8Y0e+lf4s4OxQawWD79J9/5d3Ry0vbV" +
	"3Am1FtGJiJvOwRsIfVChDpYStTcHTCMqtvWbV6L11BWkpzGXSW4Hv43qa+GSYOD2" +
	"QU68Mb59oSk2OB+BtOLpJofmbGEGgvmwyCI9MwIDAQABAoIBACiARq2wkltjtcjs" +
	"kFvZ7w1JAORHbEufEO1Eu27zOIlqbgyAcAl7q+/1bip4Z/x1IVES84/yTaM8p0go" +
	"amMhvgry/mS8vNi1BN2SAZEnb/7xSxbflb70bX9RHLJqKnp5GZe2jexw+wyXlwaM" +
	"+bclUCrh9e1ltH7IvUrRrQnFJfh+is1fRon9Co9Li0GwoN0x0byrrngU8Ak3Y6D9" +
	"D8GjQA4Elm94ST3izJv8iCOLSDBmzsPsXfcCUZfmTfZ5DbUDMbMxRnSo3nQeoKGC" +
	"0Lj9FkWcfmLcpGlSXTO+Ww1L7EGq+PT3NtRae1FZPwjddQ1/4V905kyQFLamAA5Y" +
	"lSpE2wkCgYEAy1OPLQcZt4NQnQzPz2SBJqQN2P5u3vXl+zNVKP8w4eBv0vWuJJF+" +
	"hkGNnSxXQrTkvDOIUddSKOzHHgSg4nY6K02ecyT0PPm/UZvtRpWrnBjcEVtHEJNp" +
	"bU9pLD5iZ0J9sbzPU/LxPmuAP2Bs8JmTn6aFRspFrP7W0s1Nmk2jsm0CgYEAyH0X" +
	"+jpoqxj4efZfkUrg5GbSEhf+dZglf0tTOA5bVg8IYwtmNk/pniLG/zI7c+GlTc9B" +
	"BwfMr59EzBq/eFMI7+LgXaVUsM/sS4Ry+yeK6SJx/otIMWtDfqxsLD8CPMCRvecC" +
	"2Pip4uSgrl0MOebl9XKp57GoaUWRWRHqwV4Y6h8CgYAZhI4mh4qZtnhKjY4TKDjx" +
	"QYufXSdLAi9v3FxmvchDwOgn4L+PRVdMwDNms2bsL0m5uPn104EzM6w1vzz1zwKz" +
	"5pTpPI0OjgWN13Tq8+PKvm/4Ga2MjgOgPWQkslulO/oMcXbPwWC3hcRdr9tcQtn9" +
	"Imf9n2spL/6EDFId+Hp/7QKBgAqlWdiXsWckdE1Fn91/NGHsc8syKvjjk1onDcw0" +
	"NvVi5vcba9oGdElJX3e9mxqUKMrw7msJJv1MX8LWyMQC5L6YNYHDfbPF1q5L4i8j" +
	"8mRex97UVokJQRRA452V2vCO6S5ETgpnad36de3MUxHgCOX3qL382Qx9/THVmbma" +
	"3YfRAoGAUxL/Eu5yvMK8SAt/dJK6FedngcM3JEFNplmtLYVLWhkIlNRGDwkg3I5K" +
	"y18Ae9n7dHVueyslrb6weq7dTkYDi3iOYRW8HRkIQh06wEdbxt0shTzAJvvCQfrB" +
	"jg/3747WSsf/zBTcHihTRBdAv6OmdhV4/dD5YBfLAkLrd+mX7iE="

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
		console.log(signature)
		expect(await signer.verify("Some string", signature)).toEqual(true)
	})
	it("Create ECDSA 256", async () => {
		const signer = Signer.create("ECDSA", "SHA-256", publicKey, privateKey)
		const signature = await signer.sign("Some string")
		expect(await signer.verify("Some string", signature)).toEqual(true)
	})

	it("Create ECDSA 521", async () => {
		const signer = Signer.create("ECDSA", "SHA-512", publicKeyECDSA521, privateKeyECDSA521)
		const signature = await signer.sign("Some string")
		expect(await signer.verify("Some string", signature)).toEqual(true)
	})
})
