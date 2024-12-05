import { Algorithm as SignerAlgorithm } from "./Algorithm"
import { Base } from "./Base"
import { Ecdsa } from "./Ecdsa"
import { Hash as SignerHash } from "./Hash"
import { Hmac } from "./Hmac"
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
	export function generate(algorithm: "RSA" | "RSA-PSS", hash: SignerHash, length: 1024 | 2048 | 4096): Rsa
	export function generate(algorithm: "RSA" | "RSA-PSS", hash: SignerHash, length: 1024 | 2048 | 4096): Signer {
		let result: Signer
		switch (algorithm) {
			case "RSA":
				result = Rsa.generate("SSA", hash, length)
				break
			case "RSA-PSS":
				result = Rsa.generate("PSS", hash, length)
				break
		}

		return result
	}
	export function create(algorithm: "None"): Signer
	export function create(algorithm: "HMAC", hash: SignerHash, key: string | Uint8Array): Signer
	export function create(algorithm: "RSA", hash: SignerHash, publicKey: string | Uint8Array): Rsa
	export function create(algorithm: "RSA-PSS", hash: SignerHash, publicKey: string | Uint8Array): Rsa
	export function create(algorithm: "ECDSA", hash: SignerHash, publicKey: string | Uint8Array): Signer
	export function create(
		algorithm: "RSA",
		hash: SignerHash,
		publicKey: string | Uint8Array | undefined,
		privateKey: string | Uint8Array | undefined
	): Rsa
	export function create(
		algorithm: "RSA-PSS",
		hash: SignerHash,
		publicKey: string | Uint8Array | undefined,
		privateKey: string | Uint8Array | undefined
	): Rsa
	export function create(
		algorithm: "ECDSA",
		hash: SignerHash,
		publicKey: string | Uint8Array | undefined,
		privateKey: string | Uint8Array | undefined
	): Signer
	export function create(
		algorithm: SignerAlgorithm | "None",
		hash?: SignerHash | undefined,
		...keys: (string | Uint8Array)[]
	): Signer | undefined {
		let result: Signer | undefined
		if (hash != undefined)
			switch (algorithm) {
				case "HMAC":
					result = new Hmac(hash, keys[0])
					break
				case "RSA":
					result = Rsa.import("SSA", hash, keys[0], keys[1])
					break
				case "RSA-PSS":
					result = Rsa.import("PSS", hash, keys[0], keys[1])
					break
				case "ECDSA":
					result = new Ecdsa(hash, keys[0], keys[1])
					break
			}
		else if (algorithm == "None")
			result = new None()
		return result
	}
}
