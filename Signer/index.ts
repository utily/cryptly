import { Algorithm as SignerAlgorithm } from "./Algorithm"
import { Base } from "./Base"
import { ECDSA } from "./ECDSA"
import { Hash as SignerHash } from "./Hash"
import { HMAC } from "./HMAC"
import { None } from "./None"
import { RSA } from "./RSA"
import { RSAPSS } from "./RSAPSS"

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

	export function create(algorithm: "None"): Signer
	export function create(algorithm: "HMAC", hash: SignerHash, key: string | Uint8Array): Signer
	export function create(algorithm: "RSA", hash: SignerHash, publicKey: string | Uint8Array): Signer
	export function create(algorithm: "RSA-PSS", hash: SignerHash, publicKey: string | Uint8Array): Signer
	export function create(algorithm: "ECDSA", hash: SignerHash, publicKey: string | Uint8Array): Signer
	export function create(
		algorithm: "RSA",
		hash: SignerHash,
		publicKey: string | Uint8Array | undefined,
		privateKey: string | Uint8Array
	): Signer
	export function create(
		algorithm: "RSA-PSS",
		hash: SignerHash,
		publicKey: string | Uint8Array | undefined,
		privateKey: string | Uint8Array
	): Signer
	export function create(
		algorithm: "ECDSA",
		hash: SignerHash,
		publicKey: string | Uint8Array | undefined,
		privateKey: string | Uint8Array
	): Signer
	export function create(
		algorithm: SignerAlgorithm | "None",
		hash?: SignerHash | undefined,
		...keys: (string | Uint8Array)[]
	): Signer | undefined {
		let result: Signer | undefined
		switch (algorithm) {
			case "HMAC":
				if (hash != undefined)
					result = new HMAC(hash, keys[0])
				break
			case "RSA":
				if (hash != undefined)
					result = new RSA(hash, keys[0], keys[1])
				break
			case "RSA-PSS":
				if (hash != undefined)
					result = new RSAPSS(hash, keys[0], keys[1])
				break
			case "ECDSA":
				if (hash != undefined)
					result = new ECDSA(hash, keys[0], keys[1])
				break
			case "None":
				result = new None()
		}
		return result
	}
}
