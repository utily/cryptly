import { isly } from "isly"

export interface Hash {
	hash: string
	salt: string
}
export namespace Hash {
	export const type = isly.object<Hash>({ hash: isly.string(), salt: isly.string() }, "cryptly.Password.Hash")
	export const is = type.is
	export const flaw = type.flaw
}
