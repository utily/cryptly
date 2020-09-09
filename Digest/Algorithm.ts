export type Algorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512"

export namespace Algorithm {
	export function is(value: Algorithm | any): value is Algorithm {
		return value == "SHA-1" || value == "SHA-256" || value == "SHA-384" || value == "SHA-512"
	}
}
