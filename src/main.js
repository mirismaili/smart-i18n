// noinspection JSUnfilteredForInLoop

/**
 * Created on 1400/2/15 (2021/5/5).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */
export default class I18n {
	sortedMessagesByLengthDesc = {}
	
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
						if (!$numerical[i])
							$numerical[i] = String.fromCharCode(zeroCode + i) // $numerical[i] ??= ...
				}
			}
			
			// fill tMessages - part 3: Regular Translations:
			// Note: Each part can override its prior parts!
			
			// noinspection JSMismatchedCollectionQueryUpdate
			const sortedMessages = this.sortedMessagesByLengthDesc[lang] = []
			for (const m in messages[lang]) {
				if (m.startsWith('$') /* No other directives defined here! */
						|| !m)
					continue
				
				sortedMessages.push(m)
				tMessages[m] = messages[lang][m]
			}
			
			// Make smart translation ready (this will work if none of above parts can translate):
			sortedMessages.sort((a, b) => b.length - a.length)
			
			// Create Full-Translator:
			this[lang] = (stringOrStrings, ...values) => {
				const strings = stringOrStrings instanceof Array ? stringOrStrings : [stringOrStrings]
				
				return strings.map((string, i) =>
						this.partialTranslator(string, lang) +
						(i in values ? this.partialTranslator(values[i], lang) : ''),
				).join('')
			}
			
			try {
				let locale = messages[lang].$locale ?? lang
				this[lang].$numberFormatter = new Intl.NumberFormat(locale, messages[lang]['$numberFormatOptions'])
				this[lang].$dateTimeFormatter = new Intl.DateTimeFormat(locale, messages[lang]['$dateTimeFormatOptions'])
			} catch (err) {
				console.error(err)
			}
		}
	}
	
	partialTranslator(input, lang) {
		// console.debug({input});
		if (typeof input === 'number' || input instanceof Number) {
			const number = input
			
			if (this[lang].$numberFormatter)
				return this[lang].$numberFormatter.format(number)
			
			input = String(input)
		} else if (input instanceof Date) {
			const number = input
			
			if (this[lang].$dateTimeFormatter)
				return this[lang].$dateTimeFormatter.format(number)
			
			input = String(input)
		}
		
		if (!(typeof input === 'string' || input instanceof String)) {
			console.trace(
					'Argument can only be string or number or Date. ' +
					'Boolean, null, undefined, etc. are not acceptable!\n' +
					`stringOrNumber: ${input}\n` +
					`type: ${typeof input}\n` +
					`object-type: ${Object.prototype.toString.call(input)}`,
			)
			return String(input)
		}
		
		const string = input
		const {leadingSpaces, trimmedMessage, trailingSpaces} = purifyMessage(string)
		// console.debug({trimmedMessage});
		
		const tMessage = trimmedMessage && this.messages[lang][trimmedMessage]
		
		if (tMessage !== undefined)
			return leadingSpaces + tMessage + trailingSpaces
		
		// https://regex101.com/r/xnyZDa/2
		const isPotentialNumber = /^(\d{1,3}(,\d{3})*|\d+)(\.\d+)?$/.test(trimmedMessage)
		// console.debug({isPotentialNumber});
		
		if (isPotentialNumber)
			return leadingSpaces +
					[...trimmedMessage].map(ch => this.messages[lang].$numerical[ch]).join('')
					+ trailingSpaces
		
		return leadingSpaces + this.smartTranslation(trimmedMessage, lang) + trailingSpaces
	}
	
	smartTranslation(string, lang) {
		const sortedMessages = this.sortedMessagesByLengthDesc[lang]
		const tMessages = this.messages[lang]
		return smartTranslationR(string)
		
		function smartTranslationR(string) {
			for (const m of sortedMessages) {
				
				const match = new RegExp(
						(/\w/.test(m[0]) ? '\\b' : '') +    // m !== ''
						m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
						(/\w/.test(m.slice(-1)) ? '\\b' : ''),      // m !== ''
						'i',
				).exec(string)
				
				if (match) {
					const offset = match.index
					
					const beforeM = string.slice(0, offset)
					const afterM = string.slice(offset + m.length)
					let tBeforeM, tAfterM  // translated-...
					{
						const {leadingSpaces, trimmedMessage, trailingSpaces} = purifyMessage(beforeM)
						tBeforeM = leadingSpaces + (trimmedMessage && smartTranslationR(trimmedMessage)) + trailingSpaces
					}
					{
						const {leadingSpaces, trimmedMessage, trailingSpaces} = purifyMessage(afterM)
						tAfterM = leadingSpaces + (trimmedMessage && smartTranslationR(trimmedMessage)) + trailingSpaces
					}
					
					return tBeforeM + tMessages[m] + tAfterM
				}
			}
			return string
		}
	}
	
	getTranslator(lang) {
		return this[lang]
	}
}

function purifyMessage(message) {
	const trimmedMessage = message.trim()
	const a = message.indexOf(trimmedMessage)
	const b = a + trimmedMessage.length
	const leadingSpaces = message.slice(0, a)
	const trailingSpaces = message.slice(b)
	return {leadingSpaces, trimmedMessage, trailingSpaces}
}
