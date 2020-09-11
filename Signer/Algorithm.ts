export type Algorithm = "HMAC" | "RSA" | "ECDSA" | "RSA-PSS"

export namespace Algorithm {
	export function is(value: Algorithm | any): value is Algorithm {
		return value == "HMAC" || value == "RSA" || value == "ECDSA" || value == "RSA-PSS"
	}
}
