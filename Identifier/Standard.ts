import { isly } from "isly"

export type Standard = typeof Standard.values[number]

export namespace Standard {
	export const values = ["url", "ordered", "reversed"] as const
	export const type = isly.named<Standard>("cryptly.Identifier.Standard", isly.string(values))
	export const is = type.is
	export const flaw = type.flaw
}
