import { Base } from "./Base"
import { HMAC } from "./HMAC"
import { RSA } from "./RSA"
import { Algorithm as SignerAlgorithm } from "./Algorithm"
import { Hash as SignerHash } from "./Hash"

export type Signer = Base

export namespace Signer {
	export type Algorithm = SignerAlgorithm
	export type Hash = SignerHash
	export function create(algorithm: "HMAC", hash: SignerHash, key: string | Uint8Array): Signer
	export function create(
		algorithm: "RSA",
		hash: SignerHash,
		publicKey: string | Uint8Array | undefined,
		privateKey: string | Uint8Array
	): Signer
	export function create(algorithm: SignerAlgorithm, hash: SignerHash, ...keys: (string | Uint8Array)[]): Signer {
		let result: Signer
		switch (algorithm) {
			case "HMAC":
				result = new HMAC(hash, keys[0])
				break
			case "RSA":
				result = new RSA(hash, keys[0], keys[1])
				break
		}
		return result
	}
}
