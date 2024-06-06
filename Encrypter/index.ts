import { Aes as EncrypterAes } from "./Aes"
import { Encrypted as EncrypterEncrypted } from "./Encrypted"
import { Rsa as EncrypterRsa } from "./Rsa"

export type Encrypter = Encrypter.Aes | Encrypter.Rsa

export namespace Encrypter {
	export import Aes = EncrypterAes
	export import Rsa = EncrypterRsa
	export import Encrypted = EncrypterEncrypted
}
