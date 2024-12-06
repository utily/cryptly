import { isly } from "isly"

export type Algorithm = typeof Algorithm.values[number]

export namespace Algorithm {
	export const values = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const
	export const type = isly.named("cryptly.Digester.Algorithm", isly.string<Algorithm>(values))
	export const is = type.is
	export const flaw = type.flaw
	export function bits(algorithm: Algorithm): 128 | 256 | 384 | 512 {
		return {
			"SHA-1": 128 as const,
			"SHA-256": 256 as const,
			"SHA-384": 384 as const,
			"SHA-512": 512 as const,
		}[algorithm]
	}
}
