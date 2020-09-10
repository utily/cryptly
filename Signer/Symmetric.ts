import * as Base64 from "../Base64"
import { Base } from "./Base"

export abstract class Symmetric extends Base {
	async verifyBinary(data: Uint8Array, signature: Uint8Array): Promise<boolean> {
		return Base64.encode(await this.signBinary(data), "url") == Base64.encode(signature, "url")
	}
}
