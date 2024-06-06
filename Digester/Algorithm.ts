import { isly } from "isly"

export type Algorithm = typeof Algorithm.values[number]

export namespace Algorithm {
	export const values = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"]
	export const type = isly.named("cryptly.Digester.Algorithm", isly.string<Algorithm>(values))
	export const is = type.is
	export const flaw = type.flaw
}
