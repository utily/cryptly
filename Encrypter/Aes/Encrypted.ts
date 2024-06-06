import { isly } from "isly"

export interface Encrypted {
	key?: string
	value: string
	salt: string
}

export namespace Encrypted {
	export const type = isly.object<Encrypted>(
		{ key: isly.string().optional(), value: isly.string(), salt: isly.string() },
		"cryptly.Encrypter.Aes.Encrypted"
	)
	export const is = type.is
	export const flaw = type.flaw
	export function stringify(encrypted: Encrypted): string {
		encrypted.key = encrypted.key && encrypted.key.length != 4 ? encrypted.key.slice(-2) : encrypted.key
		return [encrypted.key, encrypted.salt, encrypted.value].join(".")
	}
	export function parse(encryptedString: string): Encrypted | undefined {
		const splitted = encryptedString.split(".")
		const encrypted = { key: splitted[0], salt: splitted[1], value: splitted[2] }
		return Encrypted.is(encrypted) ? encrypted : undefined
	}
}
