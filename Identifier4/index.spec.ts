import { cryptly } from "../index"

describe("Identifier4", () => {
	it("generate is", () => expect(cryptly.Identifier4.is(cryptly.Identifier4.generate())).toEqual(true))
	it("generate length", () => expect(cryptly.Identifier4.generate()).toHaveLength(4))
	it("min", () => expect(cryptly.Identifier4.min("ordered")).toEqual("----"))
	it("max", () => expect(cryptly.Identifier4.max("ordered")).toEqual("zzzz"))
	it.each(["url", "ordered", "reversed"] as const)("generate is %s", standard =>
		expect(cryptly.Identifier4.is(cryptly.Identifier4.generate(standard))).toEqual(true)
	)
	const data = [
		{
			identifier: "abcd",
			binary: [105, 183, 29],
			hexadecimal: "69b71d",
			value: 6_928_157,
			ordered: "PQRS",
			reversed: "_ZYX",
			next: "PQRT",
			previous: "PQRR",
		},
		{
			identifier: "test",
			binary: [181, 235, 45],
			hexadecimal: "b5eb2d",
			value: 11_922_221,
			ordered: "hTgh",
			reversed: "HWIH",
			next: "hTgi",
			previous: "hTgg",
		},
		{
			identifier: "DEMO",
			binary: [12, 67, 14],
			hexadecimal: "0c430e",
			value: 803_598,
			ordered: "23BD",
			reversed: "wvnl",
			next: "23BE",
			previous: "23BC",
		},
		{
			identifier: "TEST",
			binary: [76, 68, 147],
			hexadecimal: "4c4493",
			value: 4_998_291,
			ordered: "I3HI",
			reversed: "gvhg",
			next: "I3HJ",
			previous: "I3HH",
		},
		{
			identifier: "____",
			binary: [255, 255, 255],
			hexadecimal: "ffffff",
			value: 16_777_215,
			ordered: "zzzz",
			reversed: "----",
			next: "----",
			previous: "zzzy",
		},
		{
			identifier: "zzzz",
			binary: [207, 60, 243],
			hexadecimal: "cf3cf3",
			value: 13_581_555,
			ordered: "nnnn",
			reversed: "BBBB",
			next: "nnno",
			previous: "nnnm",
		},
		{
			identifier: "AAAA",
			binary: [0, 0, 0],
			hexadecimal: "000000",
			value: 0,
			ordered: "----",
			reversed: "zzzz",
			next: "---0",
			previous: "zzzz",
		},
		{
			identifier: "aAzZ",
			binary: [104, 12, 217],
			hexadecimal: "680cd9",
			value: 6_819_033,
			ordered: "P-nO",
			reversed: "_zBa",
			next: "P-nP",
			previous: "P-nN",
		},
		{
			identifier: "demo",
			binary: [117, 233, 168],
			hexadecimal: "75e9a8",
			value: 7_727_528,
			ordered: "STac",
			reversed: "XWOM",
			next: "STad",
			previous: "STab",
		},
		{
			identifier: "GX_K",
			binary: [25, 127, 202],
			hexadecimal: "197fca",
			value: 1_671_114,
			ordered: "5Mz9",
			reversed: "tc-p",
			next: "5MzA",
			previous: "5Mz8",
		},
		{
			identifier: "GDvT",
			binary: [24, 59, 211],
			hexadecimal: "183bd3",
			value: 1_588_179,
			ordered: "52jI",
			reversed: "twFg",
			next: "52jJ",
			previous: "52jH",
		},
		{
			identifier: "tgAg",
			binary: [182, 0, 32],
			hexadecimal: "b60020",
			value: 11_927_584,
			ordered: "hV-V",
			reversed: "HUzU",
			next: "hV-W",
			previous: "hV-U",
		},
		{
			identifier: "LeeT",
			binary: [45, 231, 147],
			hexadecimal: "2de793",
			value: 3_008_403,
			ordered: "ATTI",
			reversed: "oWWg",
			next: "ATTJ",
			previous: "ATTH",
		},
		{
			identifier: "AAA_",
			binary: [0, 0, 63],
			hexadecimal: "00003f",
			value: 63,
			ordered: "---z",
			reversed: "zzz-",
			next: "--0-",
			previous: "---y",
		},
		{
			identifier: "___A",
			binary: [255, 255, 192],
			hexadecimal: "ffffc0",
			value: 16_777_152,
			ordered: "zzz-",
			reversed: "---z",
			next: "zzz0",
			previous: "zzyz",
		},
	]
	it.each(data)(`is %s`, ({ identifier }) => expect(cryptly.Identifier4.is(identifier)).toBeTruthy())
	it.each(data)(`toBinary %s`, ({ identifier, binary }) =>
		expect(cryptly.Identifier4.toBinary(identifier)).toEqual(new Uint8Array(binary))
	)
	it.each(data)(`fromBinary %s`, ({ identifier, binary }) =>
		expect(cryptly.Identifier4.fromBinary(new Uint8Array(binary))).toEqual(identifier)
	)
	it.each(data)(`toBase16 %s`, ({ identifier, hexadecimal }) =>
		expect(cryptly.Identifier4.toBase16(identifier)).toEqual(hexadecimal)
	)
	it.each(data)(`fromBase16 %s`, ({ identifier, hexadecimal }) =>
		expect(cryptly.Identifier4.fromBase16(hexadecimal)).toEqual(identifier)
	)
	it.each(data)(`toUint24 %s`, ({ identifier, value }) =>
		expect(cryptly.Identifier4.toUint24(identifier)).toEqual(value)
	)
	it.each(data)(`fromUint24 %s`, ({ identifier, value }) =>
		expect(cryptly.Identifier4.fromUint24(value)).toEqual(identifier)
	)
	it.each(data)(`ordered %s`, ({ identifier, ordered }) =>
		expect(cryptly.Identifier4.convert(identifier, "url", "ordered")).toEqual(ordered)
	)
	it.each(data)(`reversed %s`, ({ identifier, reversed }) =>
		expect(cryptly.Identifier4.convert(identifier, "url", "reversed")).toEqual(reversed)
	)
	it.each(data)(`next %s`, ({ ordered, next }) => expect(cryptly.Identifier4.next(ordered, "ordered")).toEqual(next))
	it.each(data)(`previous %s`, ({ ordered, previous }) =>
		expect(cryptly.Identifier4.previous(ordered, "ordered")).toEqual(previous)
	)
	it.each(["!", "/", "=", "."])("is not $s", c => expect(cryptly.Identifier4.is(`He${c}0`)).toEqual(false))
	it.each([
		["ordered", 1_691_418_818_480, /^---0$/],
		["reversed", 1_691_418_818_480, /^zzzy$/],
	] as const)(`generate ordered w/ prefix %s`, (standard, prefix, result) =>
		expect(cryptly.Identifier4.generate(standard, prefix)).toMatch(result)
	)
	const time = 1_691_418_818_480
	it.each([
		[0, 1],
		[1, 21111],
		[2, 344546],
		[3, 41112],
		[4, 5434],
	])("order of ordered", (left, right) =>
		expect(
			cryptly.Identifier4.generate("ordered", time + left) <= cryptly.Identifier4.generate("ordered", time + right)
		).toEqual(true)
	)
	it.each([
		[0, 1],
		[0, 1666],
		[1, 21111],
		[2, 32323],
		[3, 434],
	])("order of reversed", (left, right) =>
		expect(
			cryptly.Identifier4.generate("reversed", time + left) >= cryptly.Identifier4.generate("reversed", time + right)
		).toEqual(true)
	)
})
