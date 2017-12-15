import jails from 'jails-js'
import flatpickr from 'flatpickr'
import mustache from 'mustache'

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
			onChange: function(dObj, dStr, fp) {
				checking()
			}
			// onClose: function(){
			// }
		});
	}

	function checking() {
		let dateIn = node.querySelector('.check .in span')
		let dateOut = node.querySelector('.check .out span')
    // errado
		let dayIn = document.querySelector('.title-list .date-in')
		let dayOut = document.querySelector('.title-list .date-out')
    // -----
		let btnSearchHotels = node.querySelector('.search-hotels')
		let value = node.querySelector('.form-control').value
		let res = value.split(" to ")

		// comp.publish('days', res)

		dateIn.textContent = res[0]
		dayIn.textContent = res[0]

		if (res.length > 1) {
			dateOut.textContent = res[1]
			dayOut.textContent = res[1]
		}

		btnSearchHotels.classList.add('-active')
	}
}
jails('calendar', calendar)
jails.start()
