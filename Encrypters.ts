import { Encrypter } from "./Encrypter"
import { Tuple2 } from "./Tuple"

export type Encrypters = Record<string, Encrypter.Aes> & { current: Encrypter.Aes }

export namespace Encrypters {
	export function create(
		create: (keys: string[]) => Encrypter.Aes,
		current: string,
		...secrets: string[] | Record<string, any>[]
	): Encrypters {
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
