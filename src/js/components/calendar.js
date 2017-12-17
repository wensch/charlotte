import jails from 'jails-js'
import flatpickr from 'flatpickr'

const calendar = (comp, node) => {

	comp.init(() => {
		startFlatpickr()
	})

	const startFlatpickr = () => {
		let calendario = node.querySelector('#calendario')

		flatpickr(calendario, {
			mode: "range",
			minDate: "today",
			inline: true,
			altInput: true,
			locale: {
				weekdays: {
					shorthand: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
				}
			},
			onChange: function(dObj, dStr, fp) {
				checking()
			}
		});
	}

	function checking() {
		let dateIn = document.querySelector('.check .in span')
		let dateOut = document.querySelector('.check .out span')
		let btnSearchHotels = document.querySelector('.search-hotels')
		let value = node.querySelector('.form-control').value
		let res = value.split(" to ")

		dateIn.textContent = res[0]
		if (res.length > 1) {
			dateOut.textContent = res[1]
		}

		comp.publish('days', {res})
		btnSearchHotels.classList.add('-active')
	}
}
jails('calendar', calendar)
jails.start()
