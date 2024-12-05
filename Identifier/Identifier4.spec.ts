import { cryptly } from "../index"

describe("Identifier", () => {
	// Identifier4
	it("generate is", () => expect(cryptly.Identifier.is(cryptly.Identifier.generate(4))).toBeTruthy())
	it("generate length", () => expect(cryptly.Identifier.generate(4)).toHaveLength(4))
	const data = [
		{
			identifier: "abcd",
			binary: [105, 183, 29],
			hexadecimal: "69b71d",
			value: 6928157,
			ordered: "",
			reversed: "",
			next: "",
			previous: "",
		},
		{
			identifier: "test",
			binary: [181, 235, 45],
			hexadecimal: "b5eb2d",
			value: 11922221,
			ordered: "",
			reversed: "",
			next: "",
			previous: "",
		},
		{
			identifier: "DEMO",
			binary: [12, 67, 14],
			hexadecimal: "0c430e",
			value: 803598,
			ordered: "",
			reversed: "",
			next: "",
			previous: "",
		},
		{
			identifier: "TEST",
			binary: [76, 68, 147],
			hexadecimal: "4c4493",
			value: 4998291,
			ordered: "",
			reversed: "",
			next: "",
			previous: "",
		},
		{
			identifier: "____",
			binary: [255, 255, 255],
			hexadecimal: "ffffff",
			value: 16777215,
			ordered: "",
			reversed: "",
			next: "",
			previous: "",
		},
		{
			identifier: "zzzz",
			binary: [207, 60, 243],
			hexadecimal: "cf3cf3",
			value: 13581555,
			ordered: "",
			reversed: "",
			next: "",
			previous: "",
		},
		{
			identifier: "AAAA",
			binary: [0, 0, 0],
			hexadecimal: "000000",
			value: 0,
			ordered: "",
			reversed: "",
			next: "",
			previous: "",
		},
		{
			identifier: "aAzZ",
			binary: [104, 12, 217],
			hexadecimal: "680cd9",
			value: 6819033,
			ordered: "",
			reversed: "",
			next: "",
			previous: "",
		},
		{
			identifier: "demo",
			binary: [117, 233, 168],
			hexadecimal: "75e9a8",
			value: 7727528,
			ordered: "",
			reversed: "",
			next: "",
			previous: "",
		},
		{
			identifier: "GX_K",
			binary: [25, 127, 202],
			hexadecimal: "197fca",
			value: 1671114,
			ordered: "",
			reversed: "",
			next: "",
			previous: "",
		},
		{
			identifier: "GDvT",
			binary: [24, 59, 211],
			hexadecimal: "183bd3",
			value: 1588179,
			ordered: "",
			reversed: "",
			next: "",
			previous: "",
		},
		{
			identifier: "tgAg",
			binary: [182, 0, 32],
			hexadecimal: "b60020",
			value: 11927584,
			ordered: "",
			reversed: "",
			next: "",
			previous: "",
		},
		{
			identifier: "LeeT",
			binary: [45, 231, 147],
			hexadecimal: "2de793",
			value: 3008403,
			ordered: "",
			reversed: "",
			next: "",
			previous: "",
		},
	]
	it.each(data)(`toBinary %s`, ({ identifier, binary }) =>
		expect(cryptly.Identifier.toBinary(identifier)).toEqual(new Uint8Array(binary))
	)
	it.each(data)(`fromBinary %s`, ({ identifier, binary }) =>
		expect(cryptly.Identifier.fromBinary(new Uint8Array(binary))).toEqual(identifier)
	)
	it.each(data)(`is %s`, ({ identifier }) => expect(cryptly.Identifier.is(identifier)).toBeTruthy())
	it.each(["!", "/", "=", "."])("is not $s", c => expect(cryptly.Identifier.is(`He${c}0`)).toEqual(false))

	it.each(data)(`toHexadecimal %s`, ({ identifier, hexadecimal }) =>
		expect(cryptly.Identifier.toHexadecimal(identifier)).toEqual(hexadecimal)
	)
	it.each(data)(`fromHexadecimal %s`, ({ identifier, hexadecimal }) =>
		expect(cryptly.Identifier.fromHexadecimal(hexadecimal)).toEqual(identifier)
	)
	it.each(data)(`toUint24 %s`, ({ identifier, value }) =>
		expect(cryptly.Identifier.toUint24(identifier)).toEqual(value)
	)
	it.each(data)(`fromUint24 %s`, ({ identifier, value }) =>
		expect(cryptly.Identifier.fromUint24(value)).toEqual(identifier)
	)
	it.each(data)(`ordered %s`, ({ identifier, ordered }) =>
		expect(cryptly.Identifier..fromUint24(value)).toEqual(identifier)
	)})
