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
import I18n from 'i18x'
import messages from './messages.js' // your translation file. See `sample-data/messages.js`: https://github.com/mirismaili/smart-i18n/blob/main/sample-data/messages.js.

const i18n = new I18n(messages)

const t = i18n.getTranslator('fa') // or easier: `const t = i18n['fa']`

console.log(t`Hello`) // => سلام
```
