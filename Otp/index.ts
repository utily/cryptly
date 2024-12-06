import { isly } from "isly"
import { Generator as OtpGenerator } from "./Generator"

export type Otp = string

export namespace Otp {
	export import Generator = OtpGenerator
	export const type = isly.named<Otp>("cryptly.Otp", isly.string(/\d{6,10}/))
	export const is = type.is
	export const flaw = type.flaw
}
