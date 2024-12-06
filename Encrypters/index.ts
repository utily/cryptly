import { Base64 } from "../Base64"
import { Encrypter } from "../Encrypter"

export type Encrypters = Record<string, Encrypter.Aes> & { current: Encrypter.Aes }

export namespace Encrypters {
	export function create(
		create: (keys: string[]) => Encrypter.Aes,
		current: string,
		...secrets: Base64[] | Record<Base64, any>[]
	): Encrypters {
		const [first, ...remainder] = isBase64Array(secrets)
			? secrets.map(part =>
					Object.fromEntries(part.split(",").map(secret => secret.split(":", 2).map(item => item.trim())))
			  )
			: secrets
		const result = Object.assign(
			{},
			...Object.entries(first)
				.map<[Base64, Base64[]]>(([name, secret]) => [
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

function isBase64Array(value: Base64[] | any): value is Base64[] {
	return Array.isArray(value) && value.length > 0 && typeof value[0] == "string"
}
