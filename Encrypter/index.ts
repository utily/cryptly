import { isly } from "isly"
import { Aes as EncrypterAes } from "./Aes"
import { Rsa as EncrypterRsa } from "./Rsa"

export type Encrypter = Encrypter.Aes | Encrypter.Rsa

export namespace Encrypter {
	export type Encrypted = Encrypter.Aes.Encrypted | Encrypter.Rsa.Encrypted
	export namespace Encrypted {
		export const type = isly.named(
			"cryptly.Encrypter.Encrypted",
			isly.union<Encrypted>(Encrypter.Aes.Encrypted.type, Encrypter.Rsa.Encrypted.type)
		)
		export const is = type.is
		export const flaw = type.flaw
	}
	export import Aes = EncrypterAes
	export import Rsa = EncrypterRsa
}
