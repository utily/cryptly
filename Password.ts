import { isly } from "isly"
import * as Base64 from "./Base64"
import { crypto } from "./crypto"

export type Password = string | Password.Hash
export namespace Password {
	export const type = isly.named("cryptly.Password", isly.union<Password>(isly.string(), Hash.type))
	export const is = type.is
	export const flaw = type.flaw
	export async function hash(
		algorithm: { sign: (data: string) => Promise<string> },
		password: string,
		salt?: string
	): Promise<Hash> {
		if (!salt)
			salt = Base64.encode(crypto.getRandomValues(new Uint8Array(64)))
		return {
			hash: await algorithm.sign(salt + password),
			salt,
		}
	}
	export async function verify(
		algorithm: { sign: (data: string) => Promise<string> },
		hash: Hash,
		password: string
	): Promise<boolean> {
		return (await Password.hash(algorithm, password, hash.salt)).hash == hash.hash
	}
	export interface Hash {
		hash: string
		salt: string
	}
	export namespace Hashed {
		/**
		 * @deprecated since version 4.0.5
		 */
		export const is = type.is
	}
	export namespace Hash {
		export const type = isly.object<Hash>({ hash: isly.string(), salt: isly.string() }, "cryptly.Password.Hash")
		export const is = type.is
		export const flaw = type.flaw
	}
}
