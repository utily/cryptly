import { Identifier } from "../Identifier"
import { Signer } from "./index"

describe("Algorithm.RS256", () => {
const privateKey =
"MIICWgIBAAKBgHnO3UfN39Tb49M4ZWX8o4ZDSBl7OO2V+yLvJ08k3DruJ+Jl+bdu"+
"Hp+oOFHLhqF8t9ux+CHdTDQu87VSDwC9arYT4jlc1NyxonL0huagEhvt6zReKi+F"+
"Ju/RYLqQMhXRAE888tnRf1h93TAd0UGgMQJoy5LymjJxqtWSxu4VAKvfAgMBAAEC"+
"gYAYRB3RMDJnNWctrQ6GQs5Q8RZr/SBaNIbTbtFl8vHsy4UmlSoqYMW5CMovgVxQ"+
"z4fRPKMyG+QSgUgL100l2JZpaL4MCBxh0UhxXZdw1V4ntgQcuBpLJPJlipUyQKx7"+
"7SYQz+TSZHzMKx3DCRhlL1C9JxZOBtz8O7GaI2S4ZfbQAQJBAMWtlbWXt+buRIkN"+
"Nnexei66p50ssh9/92y8/j7fySuHkUCRKwtGc6JYTS+k3VUVz1KinwekLEhiBjEF"+
"jZB02ykCQQCdvuYK1qyuRHFwUoDZBlYOpONqlAOvvVpVrxd/JnHKc8MzzO6Xfjbl"+
"/bT98wODxj/LvT6j19iAOpP9YrblgLfHAkBLDdxAxWkiuia1bpnWmkEMyvvm9lhv"+
"E1QrKhrSXn9wEpn4zOVt84LmCebMhykuLAi6lFoTOadCmE1HgZc9WND5AkAg85Gm"+
"TfXAaXew2Oslapdrc7I1vzmN6mYGZA7qdqNqgQgTuAlXB/x7yqWWLr9bNXx6GMwO"+
"+bW2A4aKdaZzBpJdAkA5XkBY905rq+9HDyOSOTDDTRHmq9i4yLckhVNMYoce+0bL"+
"jWV3PSEr8/ttDHb+UeUeNkqSbOyMCwxKch5u2I3n"

	it("sign", async () => {
		const algorithm = Signer.create("RSA", "SHA-256", undefined, privateKey)
		// const signature = await algorithm.sign(
		// 	"amount=2050&currency=EUR&ip=1.1.1.1&card[pan]=4111111111111111&card[expire_month]=06&card[expire_year]=2022&card[csc]=123"
		// )
		// const hexadecimalSignature = Identifier.toHexadecimal(signature)
		// expect(hexadecimalSignature).toEqual(
		// 	"7ae0e14d35b2a15a7ff812a1899d7f0a5d28063f0c276081876a51fc3773f499459f944f8b57c6e0e76b47c218b20ebaad7c6250dcd1804dd19c87fb7f1216ba"
		// )
	})
})
