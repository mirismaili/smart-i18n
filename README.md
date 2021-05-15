# Smart i18n (i18x)

> Smart easy-to-use i18n library

[![npm (scoped)](https://img.shields.io/npm/v/i18x.svg)](https://npmjs.com/package/i18x)
[![install size](https://packagephobia.now.sh/badge?p=i18x)](https://packagephobia.now.sh/result?p=i18x)
[![downloads](https://img.shields.io/npm/dt/i18x.svg)](https://npmjs.com/package/i18x) <br>
[![dependencies](https://david-dm.org/mirismaili/smart-i18n.svg)](https://david-dm.org/mirismaili/smart-i18n)
[![devDependencies](https://david-dm.org/mirismaili/smart-i18n/dev-status.svg)](https://david-dm.org/mirismaili/smart-i18n?type=dev) <br>
[![license](https://img.shields.io/github/license/mirismaili/smart-i18n.svg)](https://github.com/mirismaili/smart-i18n/blob/master/LICENSE)
[![Forks](https://img.shields.io/github/forks/mirismaili/smart-i18n.svg?style=social)](https://github.com/mirismaili/smart-i18n/fork)
[![Stars](https://img.shields.io/github/stars/mirismaili/smart-i18n.svg?style=social)](https://github.com/mirismaili/smart-i18n)

```bash
npm i i18x
```

or:

```bash
yarn add i18x
```

## Usage

```javascript
import I18n     from 'i18x'
import messages from './messages.js' // your translation file. See below example: https://github.com/mirismaili/smart-i18n#example

const i18n = new I18n(messages)

const t = i18n.getTranslator('fa') // or easier: `const t = i18n.fa`

console.log(t`Hello`) // => سلام
```

## Example

First create your translation file (we call it as `messages.js`) file, based to this template:

```javascript
export default {
    en: {
        // Meta-data-s won't be translated. They should start with `$`.
        $dir: 'LTR',
        $locale: 'en-US',   // default to preset-name (here: 'en'). 
                            // can be used with unicode extension (e.g. 'en-US-u-ca-persian'). See: 
                            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

        // $numberFormatOptions:  { style: 'currency', currency: 'EUR' },  // optional

        // Hello: "Hello",  // doesn't need when key == value
    },

    fa: {
        $dir: 'RTL',
        $locale: 'fa-IR',   // default to preset-name (here: 'fa'). can be used with unicode extension (-u-...)
        // $dateTimeFormatOptions: { dateStyle: 'full', timeStyle: 'long' },  // optional

        // punctuations:
        ',': '،',  // comma
        ';': '‌؛',  // semicolon

        // single words:
        Hello: 'سلام',
        world: 'دنیا',
        Human: 'انسان',
        water: 'آب',
        Earth: 'زمین',
        Sun: 'خورشید',
        Moon: 'ماه',
        star: 'ستاره',
        galaxy: 'کهکشان',
        Venus: 'ناهید',
        Mars: 'بهرام',
        and: 'و',
        or: 'یا',

        // phrases and sentences:
        'In the name of God': 'به نام خدا',
        'the stars': 'ستارگان',
        'is very nice': 'خیلی خوبه',

        $numerical: {
            0: '۰',    // zero digit (next digits will automatically derived)
            '.': '٫',  // decimal separator
            ',': '٬',  // thousands separator
        },
    },

    $RTLs: {  // all translations automatically considered TWO-DIRECTIONAL: { x: 'y' <=> y: 'x' }
        '\u200E': '\u200F',  // LRM ⇔ RLM  // This special case will be defined automatically and can be omitted

        // Each left-arrow that "its-unicode + 2" is the corresponding right-arrow, can be listed here:
        // (notice TWO-DIRECTIONAL rule: left-arrow ⇔ right-arrow)
        $arrows: [
            '←',
            '⇐',
        ],
    },
}
```

Then create a new instance of `I18n` class using that file and get your translators (`t`):

```javascript
import I18n     from 'i18x'
import messages from './messages.js' // your translation file. See `example/messages.js`: https://github.com/mirismaili/smart-i18n/blob/main/example/messages.js.

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
```

*See [example](https://github.com/mirismaili/smart-i18n/tree/main/example).*
