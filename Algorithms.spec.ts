import * as cryptly from "./index"

describe("Context.PrimarySecrets", () => {
	it("create", async () => {
		const generated = {
			"2020a": cryptly.Algorithm.aesGcm(256),
			"2020b": cryptly.Algorithm.aesGcm(256),
			"2021a": cryptly.Algorithm.aesGcm(256),
		} as const
		const expected = await exportAll(generated)
		const algorithm = {
			"2020a": await generated["2020a"].export(3),
			"2020b": [await generated["2020b"].export()],
			"2021a": await generated["2021a"].export(2),
		} as const
		const secrets = cryptly.Algorithms.create(
			cryptly.Algorithm.aesGcm,
			"2020a",
			`2020a: ${algorithm["2020a"][0]}, 2020b: ${algorithm["2020b"][0]}, 2021a: ${algorithm["2021a"][0]}`,
			`2020a: ${algorithm["2020a"][1]}, 2021a: ${algorithm["2021a"][1]}`,
			`2020a: ${algorithm["2020a"][2]}`
		)
		expect(Object.keys(secrets)).toEqual(["current", "2020a", "2020b", "2021a"])
		expect(await exportAll(secrets)).toEqual({ current: expected["2020a"], ...expected })
	})
})

async function exportAll<T>(secrets: T): Promise<
	{
		[P in keyof T]: string
	}
> {
	return Object.fromEntries(
		await Promise.all(Object.entries(secrets).map(async ([name, algorithm]) => [name, await algorithm.export()]))
	)
}
