import { crypto } from "./crypto"
import { Encrypted } from "./Encrypted"
import * as Base64 from "./Base64"
import { TextDecoder } from "./TextDecoder"
import { TextEncoder } from "./TextEncoder"

export class Algorithm {
	private constructor(private readonly key: PromiseLike<CryptoKey>) { }
	async encrypt(data: string, salt?: string): Promise<Encrypted> {
		const iv = salt ? Base64.decode(salt, "url") : crypto.getRandomValues(new Uint8Array(16))
		return { salt: salt || Base64.encode(iv, "url"), value: Base64.encode(new Uint8Array(await crypto.subtle.encrypt({ name: (await this.key).algorithm.name, iv }, await this.key, new TextEncoder().encode(data))), "url") }
	}
	async decrypt(encrypted: Encrypted): Promise<string> {
		return new TextDecoder().decode(new Uint8Array(await crypto.subtle.decrypt({ name: (await this.key).algorithm.name, iv: Base64.decode(encrypted.salt, "url") }, await this.key, Base64.decode(encrypted.value, "url"))))
	}
	async export(): Promise<string> {
		return Base64.encode(new Uint8Array(await crypto.subtle.exportKey("raw", await this.key)), "url")
	}
	static AesCbc(key: string | 256): Algorithm {
		return new Algorithm(typeof key == "number" ? crypto.subtle.generateKey({ name: "AES-CBC", length: key }, true, ["encrypt", "decrypt"]) : crypto.subtle.importKey("raw", Base64.decode(key, "url"), "AES-CBC", true, ["encrypt", "decrypt"]))
	}
}
