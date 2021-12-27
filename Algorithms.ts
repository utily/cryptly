import { Algorithm } from "./Algorithm"

export type Algorithms = Record<string, Algorithm> & {
	current: Algorithm
	export: (parts?: number) => Promise<string[]>
}

function createExport(algorithms: Record<string, Algorithm>): (parts?: number) => Promise<string[]> {
	return async (parts = 1) => {
		const exported = await Promise.all(
			Object.entries(algorithms)
				.filter(([name, _]) => name != "export" && name != "current")
				.map(async ([name, algorithm]) => [name, await algorithm.export(parts)] as const)
		)
		return Array(parts)
			.fill(undefined)
			.map((_, index) => exported.map(([name, secrets]) => name + ": " + secrets[index]).join(", "))
	}
}
export namespace Algorithms {
	export function generate(
		generate: (length: 256) => Algorithm,
		length: 256,
		current: string,
		...keys: string[]
	): Algorithms {
		const result = Object.fromEntries([current, ...keys].map(name => [name, Object.assign(generate(length), { name })]))
		return Object.assign(result, { current: result[current], export: createExport(result) })
	}
	export function create(create: (keys: string[]) => Algorithm, current: string, ...secrets: string[]): Algorithms {
		const [first, ...remainder] = secrets.map(part =>
			Object.fromEntries(part.split(",").map(secret => secret.split(":", 2).map(item => item.trim())))
		)
		const result = Object.assign(
			{},
			...Object.entries(first)
				.map<[string, string[]]>(([name, secret]) => [
					name,
					[secret, ...remainder.map(part => part[name]).filter(part => part)],
				])
				.map(([name, secrets]) => ({
					get [name]() {
						return Object.assign(create(secrets), { name })
					},
				}))
		)
		return { current: result[current], ...result, export: createExport(result) }
	}
}
