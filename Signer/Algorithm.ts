export type Algorithm = "HMAC" | "RSA"

export namespace Algorithm {
	export function is(value: Algorithm | any): value is Algorithm {
		return value == "HMAC" || value == "RSA"
	}
}
