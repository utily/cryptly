import * as Base64 from "./Base64"
import { crypto } from "./crypto"

export type Password = string | Password.Hash
export namespace Password {
	export function is(value: any | Password): value is Password {
		return (
			typeof value == "string" ||
			(typeof value == "object" && typeof value.hash == "string" && typeof value.salt == "string")
		)
	}
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
		export function is(value: any | Hash): value is Hash {
			return typeof value == "object" && typeof value.hash == "string" && typeof value.salt == "string"
		}
	}
}
