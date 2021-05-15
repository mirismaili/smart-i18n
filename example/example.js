import I18n from 'i18x'
import messages from './messages.js' // your translation file. See `example/messages.js`:
									 // https://github.com/mirismaili/smart-i18n/blob/main/example/messages.js.

/**
 * Created on 1400/2/26 (2021/5/16).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const i18n = new I18n(messages)

const t = i18n['fa']

// simple translation:
console.log(t('Hello'))  // سلام
console.log(t`Hello`)    // سلام

const world = 'world'
console.log(t`Hello ${world}`)   // سلام دنیا

// include numbers and dates:
console.log(t`${1 + 2}. Earth`)  //  ۳. زمین
console.log(t`1,234,567.890`)    //  ۱٬۲۳۴٬۵۶۷٫۸۹۰
console.log(t`Today: ${new Date()}`)  // Today: ۱۴۰۰/۲/۲۶  // Note: "Today" hasn't been translated in `messages.js` file

// smart translation (detect translatable parts between a bigger string):
console.log(t`Hello, world`)     //  سلام، دنیا

// LTR <=> RTL
const LRM = '\u200E'
console.log(t`${LRM}Javascript is very nice!`) // ‏Javascript خیلی خوبه!
											   // should be viewed in the right order and direction in real environments
