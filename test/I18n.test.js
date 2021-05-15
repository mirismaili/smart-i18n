import {strict as assert} from 'assert'
import I18n from '../src/main.js'
import messages from '../sample-data/messages.js'

/**
 * Created on 1400/2/16 (2021/5/6).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const i18n = new I18n(messages)

let t = i18n['en']

assert.equal(t('x'), 'x')
assert.equal(t`x`, 'x')
assert.equal(t(' x'), ' x')
assert.equal(t` x`, ' x')
assert.equal(t('x '), 'x ')
assert.equal(t`x `, 'x ')
assert.equal(t(' x '), ' x ')
assert.equal(t` x `, ' x ')
assert.equal(t('  x  '), '  x  ')
assert.equal(t`  x  `, '  x  ')

assert.equal(t`x${'y'}z`, 'xyz')
assert.equal(t` x${'y'}z`, ' xyz')
assert.equal(t`x ${'y'}z`, 'x yz')
assert.equal(t`x${' y'}z`, 'x yz')
assert.equal(t`x${'y '}z`, 'xy z')
assert.equal(t`x${'y'} z`, 'xy z')
assert.equal(t`x${'y'}z `, 'xyz ')
assert.equal(t`x ${' y'}z`, 'x  yz')
assert.equal(t`x${' y '}z`, 'x y z')
assert.equal(t`x${'y '} z`, 'xy  z')

assert.equal(t('‎'), '‎')
assert.equal(t`‎`, '‎')
assert.equal(t('→'), '→')
assert.equal(t`→`, '→')

t = i18n.getTranslator('fa')

assert.equal(t('galaxy'), 'کهکشان')
assert.equal(t`galaxy`, 'کهکشان')
assert.equal(t(' galaxy'), ' کهکشان')
assert.equal(t` galaxy`, ' کهکشان')
assert.equal(t('galaxy '), 'کهکشان ')
assert.equal(t`galaxy `, 'کهکشان ')
assert.equal(t(' galaxy '), ' کهکشان ')
assert.equal(t` galaxy `, ' کهکشان ')

assert.equal(t`galaxy${'Hello'}water`, 'کهکشانسلامآب')
assert.equal(t`galaxy ${'Hello'}water`, 'کهکشان سلامآب')
assert.equal(t`galaxy${'Hello'} water`, 'کهکشانسلام آب')
assert.equal(t`galaxy ${'Hello'} water`, 'کهکشان سلام آب')
assert.equal(t`galaxy ${'Hello '}water`, 'کهکشان سلام آب')
assert.equal(t`galaxy${' Hello'} water`, 'کهکشان سلام آب')
assert.equal(t`galaxy${' Hello '}water`, 'کهکشان سلام آب')
assert.equal(t`galaxy ${' Hello '}water`, 'کهکشان  سلام آب')
assert.equal(t`galaxy${' Hello '} water`, 'کهکشان سلام  آب')
assert.equal(t`galaxy ${' Hello '} water`, 'کهکشان  سلام  آب')

assert.equal(t('‎'), '‏')
assert.equal(t`‎`, '‏')
assert.equal(t('→'), '←')
assert.equal(t`→`, '←')

assert.equal(t`0`, '۰')
assert.equal(t`01`, '۰۱')
assert.equal(t`23`, '۲۳')
assert.equal(t` 45.6`, ' ۴۵٫۶')
assert.equal(t`7,890,123 `, '۷٬۸۹۰٬۱۲۳ ')
assert.equal(t`  7,890,123.4567 `, '  ۷٬۸۹۰٬۱۲۳٫۴۵۶۷ ')
assert.equal(t`${0}`, '۰')
assert.equal(t`2${3}`, '۲۳')
assert.equal(t`4${5}6`, '۴۵۶')
assert.equal(t`7${'8'}9`, '۷۸۹')
