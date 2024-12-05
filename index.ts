import { ArrayBuffer as cryptlyArrayBuffer } from "./ArrayBuffer"
import { Base16 as cryptlyBase16 } from "./Base16"
import { Base32 as cryptlyBase32 } from "./Base32"
import { Base64 as cryptlyBase64 } from "./Base64"
import { Digester as cryptlyDigester } from "./Digester"
import { Encrypter as cryptlyEncrypter } from "./Encrypter"
import { Encrypters as cryptlyEncrypters } from "./Encrypters"
import { Identifier as cryptlyIdentifier } from "./Identifier"
import { Otp as cryptlyOtp } from "./Otp"
import { Password as cryptlyPassword } from "./Password"
import { Signer as cryptlySigner } from "./Signer"

export namespace cryptly {
	export import ArrayBuffer = cryptlyArrayBuffer
	export import Base16 = cryptlyBase16
	export import Base32 = cryptlyBase32
	export import Base64 = cryptlyBase64
	export import Digester = cryptlyDigester
	export import Encrypter = cryptlyEncrypter
	export import Encrypters = cryptlyEncrypters
	export import Identifier = cryptlyIdentifier
	export import Otp = cryptlyOtp
	export import Password = cryptlyPassword
	export import Signer = cryptlySigner
}
