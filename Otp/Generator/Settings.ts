import { isoly } from "isoly"
import { Digester } from "../../Digester"

export interface Settings {
	length: 6 | 7 | 8 | 9 | 10
	interval: isoly.TimeSpan
	epoch: isoly.DateTime
	hash: Digester.Algorithm
}
export namespace Settings {
	export function create(settings: Partial<Settings>): Settings {
		return { length: 6, interval: { seconds: 30 }, epoch: isoly.DateTime.create(0), hash: "SHA-1", ...settings }
	}
}
