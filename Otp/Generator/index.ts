import { isoly } from "isoly"
import { Base16 } from "../../Base16"
import { Base32 } from "../../Base32"
import { Signer } from "../../Signer"
import type { Otp } from "../index"
import { Settings as GeneratorSettings } from "./Settings"

export class Generator {
	#signer: Signer | undefined
	private get signer(): Signer {
		return (this.#signer ??= Signer.create("HMAC", this.settings.hash, new TextEncoder().encode(this.secret)))
	}
	constructor(private readonly secret: string, public readonly settings: Readonly<Generator.Settings>) {}

	async generate(counter: number, count: number): Promise<Otp[]>
	async generate(counter: number | isoly.DateTime): Promise<Otp>
	async generate(counters: number[]): Promise<Otp[]>
	async generate(times: isoly.DateTime[]): Promise<Otp[]>
	async generate(
		counter: number | number[] | isoly.DateTime | isoly.DateTime[] = isoly.DateTime.now(),
		count?: number
	): Promise<Otp | Otp[]> {
		let result: Otp | Otp[]
		if (typeof counter == "number" && typeof count == "number")
			result = await this.generate(Array.from({ length: count }, (_, i) => i + counter))
		else if (Array.isArray(counter))
			result = await Promise.all(counter.map(async t => await this.generate(t)))
		else if (isoly.DateTime.is(counter))
			result = await this.generate(
				Math.floor(isoly.DateTime.epoch(counter, "seconds") / isoly.TimeSpan.toSeconds(this.settings.interval))
			)
		else {
			const hash = await this.signer.sign(Base16.decode(counter.toString(16).padStart(16, "0")))
			const offset = hash[hash.length - 1]! & 0xf // element has to exists by definition of has.length
			const value =
				((hash[offset]! & 0x7f) << 24) | // offset is significantly smaller than hash.length due to the mask
				((hash[offset + 1]! & 0xff) << 16) |
				((hash[offset + 2]! & 0xff) << 8) |
				(hash[offset + 3]! & 0xff)
			// magic numbers explanation:
			// (value % 10^digits).padstart(digits, "0")
			result = (value % +"1".padEnd(this.settings.length + 1, "0")).toString().padStart(this.settings.length, "0")
		}
		return result
	}
	/** for use in QR codes */
	toUrl(issuer: string, username: string): string {
		return `otpauth://totp/${issuer}:${username}?secret=${Base32.encode(this.secret)}&issuer=${issuer}`
	}
	change(settings: Partial<Generator.Settings>): Generator {
		return new Generator(this.secret, { ...this.settings, ...settings })
	}
	static create(secret: string, settings = {}): Generator {
		return new Generator(secret, Generator.Settings.create(settings))
	}
}
export namespace Generator {
	export import Settings = GeneratorSettings
}
