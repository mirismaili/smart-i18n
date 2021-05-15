// noinspection JSUnfilteredForInLoop

/**
 * Created on 1400/2/15 (2021/5/5).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */
export default class I18n {
	constructor(messages) {
		this.messages = {}
		
		const $RTLs = messages.$RTLs ?? messages['$rtls'] ?? {}
		if (!$RTLs.$arrows) $RTLs.$arrows = []  // $RTLs.$arrows ??= []
		
		for (const field in messages) {
			if (field.startsWith('$')) continue  // No other directives defined here!
			
			const lang = field
			const tMessages = this.messages[lang] = {}
			
			// fill tMessages (translated-messages) - part 1: BiDi (Bidirectional) characters/strings:
			if (messages[lang].$dir?.toUpperCase() === 'RTL') {
				// part 1.1: adjust Direction-Control characters (only needed for RTLs):
				tMessages['‎'] = '‏'
				tMessages['‏'] = '‎'
				
				// part 1.2: adjust Arrows (only needed for RTLs):
				$RTLs.$arrows?.forEach(leftArrow => {
					const rightArrow = String.fromCharCode(leftArrow.charCodeAt(0) + 2)
					tMessages[leftArrow] = rightArrow
					tMessages[rightArrow] = leftArrow
				})
				
				// part 1.3.1: Regular RTLs:
				for (const m in $RTLs) {
					if (m.startsWith('$')) continue  // No other directives defined here!
					tMessages[m] = $RTLs[m]
				}
			} else // part 1.3.2: Regular LTRs:
				for (const m in $RTLs) {
					if (m.startsWith('$')) continue  // No other directives defined here!
					tMessages[m] = m
				}
			
			// fill tMessages - part 2: Numerical character (digits, decimal separator, etc.):
			if (messages[lang].$numerical) {
				const $numerical = tMessages.$numerical = {...messages[lang].$numerical}
				if ($numerical['0']) {
					const zeroCode = $numerical['0'].charCodeAt(0)
					for (let i = 1; i < 10; i++)
						if (!$numerical[i]) $numerical[i] = String.fromCharCode(zeroCode + i) // $numerical[i] ??= ...
				}
			}
			
			// fill tMessages - part 3: Regular Translations:
			// Note: Each part can override its prior parts!
			for (const m in messages[lang]) {
				if (m.startsWith('$')) continue  // No other directives defined here!
				
				tMessages[m] = messages[lang][m]
			}
			
			// Create Full-Translator:
			this[lang] = (stringOrStrings, ...values) => {
				const strings = stringOrStrings instanceof Array ? stringOrStrings : [stringOrStrings]
				
				return strings.map((string, i) =>
						this.partialTranslator(string, lang) +
						this.partialTranslator(i in values ? values[i] : '', lang),
				).join('')
			}
			
			try {
				this[lang].$intlFormatter = new Intl.NumberFormat(messages[lang].$locale ?? lang)
			} catch (err) {
				console.error(err)
			}
		}
	}
	
	getTranslator(lang) {
		return this[lang]
	}
	
	partialTranslator(stringOrNumber, lang) {
		if (typeof stringOrNumber === 'number' || stringOrNumber instanceof Number) {
			const number = stringOrNumber
			
			if (this[lang].$intlFormatter)
				return this[lang].$intlFormatter.format(number)
			
			stringOrNumber = String(stringOrNumber)
		}
		
		if (!(typeof stringOrNumber === 'string' || stringOrNumber instanceof String))
			throw Error(
					'Argument can only be string or number. Boolean, null, undefined, etc. is not acceptable!\n' +
					`stringOrNumber: ${stringOrNumber}\n` +
					`type: ${typeof stringOrNumber}\n` +
					`object-type: ${Object.prototype.toString.call(stringOrNumber)}`,
			)
		
		const string = stringOrNumber
		const message = string.trim()
		const a = string.indexOf(message)
		const b = a + message.length
		const leadingSpaces = string.slice(0, a)
		const trailingSpaces = string.slice(b)
		
		const tMessage = this.messages[lang][message]
		
		if (tMessage)
			return leadingSpaces + tMessage + trailingSpaces
		
		// https://regex101.com/r/xnyZDa/2
		const isPotentialNumber = /^(\d{1,3}(,\d{3})*|\d+)(\.\d+)?$/.test(message)
		
		if (isPotentialNumber)
			return leadingSpaces +
					[...message].map(ch => this.messages[lang].$numerical[ch]).join('')
					+ trailingSpaces
		
		return string
	}
}
