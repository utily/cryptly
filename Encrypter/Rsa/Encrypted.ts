import { isly } from "isly"
import { Base64 } from "../../Base64"

export interface Encrypted {
	key?: string
	value: Base64
}

export namespace Encrypted {
	export const type = isly.object<Encrypted>(
		{ key: isly.string().optional(), value: Base64.type },
		"cryptly.Encrypter.Rsa.Encrypted"
	)
	export const is = type.is
	export const flaw = type.flaw
	export function stringify(encrypted: Encrypted): string {
		encrypted.key = encrypted.key && encrypted.key.length != 4 ? encrypted.key.slice(-2) : encrypted.key
		return [encrypted.key, encrypted.value].join(".")
	}
	export function parse(encryptedString: string): Encrypted | undefined {
		const splitted = encryptedString.split(".")
		const encrypted = { key: splitted[0], value: splitted[2] }
		return Encrypted.is(encrypted) ? encrypted : undefined
	}
}
