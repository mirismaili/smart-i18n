// noinspection NonAsciiCharacters
/**
 * Created on 1400/2/16 (2021/5/6).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */
export default {
	en: {
		// Meta-data-s won't be translated. They should start with `$`.
		$dir: 'LTR',
		$locale: 'en-US',   // default to preset-name (here: 'en') 
		
		// Hello: "Hello",  // doesn't need when key == value
	},
	
	fa: {
		$dir: 'RTL',
		$locale: 'fa-IR',   // default to preset-name (here: 'fa')
		
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
