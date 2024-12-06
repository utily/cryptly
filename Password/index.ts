import { isly } from "isly"
import { Base64 } from "../Base64"
import { Hash as PasswordHash } from "./Hash"

export type Password = string | Password.Hash

export namespace Password {
	export import Hash = PasswordHash
	export const type = isly.named("cryptly.Password", isly.union<Password>(isly.string(), Hash.type))
	export const is = type.is
	export const flaw = type.flaw
	export async function hash(
		algorithm: { sign: (data: string) => Promise<string> },
		password: string,
		salt?: string,
		pepper = ""
	): Promise<Hash> {
		return {
			hash: await algorithm.sign(pepper + (salt ??= Base64.random(64)) + password),
			salt,
		}
	}
	export async function verify(
		algorithm: { sign: (data: string) => Promise<string> },
		password: string,
		hash: Hash,
		pepper = ""
	): Promise<boolean> {
		return (await Password.hash(algorithm, password, hash.salt, pepper)).hash == hash.hash
	}
}
