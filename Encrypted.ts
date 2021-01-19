export interface Encrypted {
	key?: string
	value: string
	salt: string
}

export namespace Encrypted {
	export function is(value: any | Encrypted): value is Encrypted {
		return (
			typeof value == "object" &&
			(value.key == undefined || typeof value.key == "string") &&
			typeof value.value == "string" &&
			typeof value.salt == "string"
		)
	}
	export function stringify(encrypted: Encrypted): string {
		encrypted.key = encrypted.key && encrypted.key.length != 4 ? encrypted.key.slice(-2) : encrypted.key
		return [encrypted.key, encrypted.salt, encrypted.value].join(".")
	}
	export function parse(encryptedString: string): Encrypted | undefined {
		const splitted = encryptedString.split(".")
		const encrypted = { name: splitted[0], salt: splitted[1], value: splitted[2] }
		return Encrypted.is(encrypted) ? encrypted : undefined
	}
}
