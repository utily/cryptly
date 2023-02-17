import { Algorithm as SignerAlgorithm } from "./Algorithm"
import { Base } from "./Base"
import { ECDSA } from "./ECDSA"
import { Hash as SignerHash } from "./Hash"
import { HMAC } from "./HMAC"
import { None } from "./None"
import { Rsa } from "./Rsa"

export type Signer = Base

export namespace Signer {
	export type Algorithm = SignerAlgorithm
	export namespace Algorithm {
		export const is = SignerAlgorithm.is
	}
	export type Hash = SignerHash
	export namespace Hash {
		export const is = SignerHash.is
	}
	export async function generate(
		algorithm: "RSA" | "RSA-PSS",
		hash: SignerHash,
		length: 1024 | 2048 | 4096
	): Promise<Rsa>
	export async function generate(
		algorithm: "RSA" | "RSA-PSS",
		hash: SignerHash,
		length: 1024 | 2048 | 4096
	): Promise<Signer> {
		let result: Signer
		switch (algorithm) {
			case "RSA":
				result = await Rsa.generate("SSA", hash, length)
				break
			case "RSA-PSS":
				result = await Rsa.generate("PSS", hash, length)
				break
		}

		return result
	}
	export async function create(algorithm: "None"): Promise<Signer>
	export async function create(algorithm: "HMAC", hash: SignerHash, key: string | Uint8Array): Promise<Signer>
	export async function create(
		algorithm: "RSA",
		hash: SignerHash,
		publicKey: string | Uint8Array
	): Promise<Rsa | undefined>
	export async function create(
		algorithm: "RSA-PSS",
		hash: SignerHash,
		publicKey: string | Uint8Array
	): Promise<Rsa | undefined>
	export async function create(algorithm: "ECDSA", hash: SignerHash, publicKey: string | Uint8Array): Promise<Signer>
	export async function create(
		algorithm: "RSA",
		hash: SignerHash,
		publicKey: string | Uint8Array | undefined,
		privateKey: string | Uint8Array | undefined
	): Promise<Rsa | undefined>
	export async function create(
		algorithm: "RSA-PSS",
		hash: SignerHash,
		publicKey: string | Uint8Array | undefined,
		privateKey: string | Uint8Array | undefined
	): Promise<Rsa | undefined>
	export async function create(
		algorithm: "ECDSA",
		hash: SignerHash,
		publicKey: string | Uint8Array | undefined,
		privateKey: string | Uint8Array | undefined
	): Promise<Signer>
	export async function create(
		algorithm: SignerAlgorithm | "None",
		hash?: SignerHash | undefined,
		...keys: (string | Uint8Array)[]
	): Promise<Signer | undefined> {
		let result: Signer | undefined
		if (hash != undefined)
			switch (algorithm) {
				case "HMAC":
					result = new HMAC(hash, keys[0])
					break
				case "RSA":
					result = await Rsa.import("SSA", hash, keys[0], keys[1])
					break
				case "RSA-PSS":
					result = await Rsa.import("PSS", hash, keys[0], keys[1])
					break
				case "ECDSA":
					result = new ECDSA(hash, keys[0], keys[1])
					break
			}
		else if (algorithm == "None")
			result = new None()
		return result
	}
}
