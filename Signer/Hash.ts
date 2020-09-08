export type Hash = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512"

export namespace Hash {
	export function is(value: Hash | any): value is Hash {
		return value == "SHA-1" || value == "SHA-256" || value == "SHA-384" || value == "SHA-512"
	}
}
