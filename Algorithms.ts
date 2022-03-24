import { Algorithm } from "./Algorithm"
import { Tuple2 } from "./Tuple"

export type Algorithms = Record<string, Algorithm> & { current: Algorithm }

export namespace Algorithms {
	export function create(
		create: (keys: string[]) => Algorithm,
		current: string,
		...secrets: string[] | Record<string, any>[]
	): Algorithms {
		const [first, ...remainder] = isStringArray(secrets)
			? secrets.map(part =>
					Object.fromEntries(part.split(",").map(secret => secret.split(":", 2).map(item => item.trim())))
			  )
			: secrets
		const result = Object.assign(
			{},
			...Object.entries(first)
				.map<Tuple2<string, string[]>>(([name, secret]) => [
					name,
					[secret, ...remainder.map(part => part[name]).filter(part => part)],
				])
				.map(([name, secrets]) => ({
					get [name]() {
						return Object.assign(create(secrets), { name })
					},
				}))
		)
		return { current: result[current], ...result }
	}
}

function isStringArray(value: string[] | any): value is string[] {
	return Array.isArray(value) && value.length > 0 && typeof value[0] == "string"
}
