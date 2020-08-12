export default function dateFilter(value, format = 'date') {
	const options = {}
	if ( format.includes('date') ) {
		options.day = '2-digit'
		options.weekday = 'long'
		options.month = 'long'
	}
	return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
}