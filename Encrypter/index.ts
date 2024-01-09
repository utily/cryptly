import { Aes as EncrypterAes } from "./Aes"

export type Encrypter = Encrypter.Aes

export namespace Encrypter {
	export type Aes = EncrypterAes
	export const Aes = EncrypterAes
}
