import { isly } from "isly"

export type Length = typeof Length.values[number]
export namespace Length {
	export const values = [
		4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112,
		116, 120, 124, 128,
	] as const
	export const type = isly.named("cryptly.Identifier.Length", isly.number<Length>(values as any as number[]))
	export const is = type.is
	export const flaw = type.flaw
}
