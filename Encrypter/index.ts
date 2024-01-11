import { Aes as EncrypterAes } from "./Aes"
import { Rsa as EncrypterRsa } from "./Rsa"

export type Encrypter = Encrypter.Aes | Encrypter.Rsa

export namespace Encrypter {
	export type Aes = EncrypterAes
	export const Aes = EncrypterAes
	export namespace Aes {
		export type Encrypted = EncrypterAes.Encrypted
	}
	export type Rsa = EncrypterRsa
	export const Rsa = EncrypterRsa
	export namespace Rsa {
		export type Encrypted = EncrypterRsa.Encrypted
	}
}
