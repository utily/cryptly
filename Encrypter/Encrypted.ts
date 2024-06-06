import { isly } from "isly"
import { Aes } from "./Aes"
import { Rsa } from "./Rsa"

export type Encrypted = Aes.Encrypted | Rsa.Encrypted

export namespace Encrypted {
	export const type = isly.named(
		"cryptly.Encrypter.Encrypted",
		isly.union<Encrypted>(Aes.Encrypted.type, Rsa.Encrypted.type)
	)
	export const is = type.is
	export const flaw = type.flaw
}
