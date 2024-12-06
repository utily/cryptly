import { isly } from "isly"
import { Base64 } from "../Base64"

export interface Hash {
	hash: Base64
	salt: Base64
}
export namespace Hash {
	export const type = isly.object<Hash>({ hash: Base64.type, salt: Base64.type }, "cryptly.Password.Hash")
	export const is = type.is
	export const flaw = type.flaw
}
