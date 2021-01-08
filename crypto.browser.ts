export const crypto =
	typeof window != "undefined"
		? window.crypto || ((window as unknown) as { msCrypto: any }).msCrypto
		: self.crypto || ((self as unknown) as { msCrypto: any }).msCrypto
