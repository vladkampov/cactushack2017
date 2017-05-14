/**
 * Returning date in a human readable format.
 * @param {Date} dateObj - Javascript Date object.
 * @returns {string}
 */
export default function getPreetyDate(dateObj) {
	if (Object.prototype.toString.call(dateObj) === '[object Date]') {
		if (isNaN(dateObj.getTime())) {
			throw new Error('Invalid date');
		}
		else {
			const month   = dateObj.getMonth() + 1,
				  day     = dateObj.getDate(),
				  hours   = dateObj.getHours(),
				  minutes = dateObj.getMinutes(),
				  seconds = dateObj.getSeconds(),

				  date    = ` ${[
					(day > 9 ? '' : '0') + day,
					(month > 9 ? '' : '0') + month,
					dateObj.getFullYear()
				].join('/')}`;

			return [
				(hours > 9 ? '' : '0') + hours,
				(minutes > 9 ? '' : '0') + minutes,
				(seconds > 9 ? '' : '0') + seconds
			].join(':') + date;
		}
	}
	else {
		throw new Error('Date object required');
	}
}
