export interface Encrypted {
	key?: string
	value: string
	salt: string
}

export namespace Encrypted {
	export function is(value: any | Encrypted): value is Encrypted {
		return typeof(value) == "object" &&
			(value.key == undefined || typeof value.key == "string") &&
			typeof value.value == "string" &&
			typeof value.salt == "string"
	}
}
