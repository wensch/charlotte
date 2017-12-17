import jails from 'jails-js'
import mustache from 'mustache'

const listHotels = (comp, node) => {

	comp.init(() => {
		comp.on('click', {'.search-hotels': listHotels})
		comp.subscribe('days', ({res})=> titleDate(res));
	})

	function listHotels(e) {
		let listHotels = node.querySelector('.list-hotels')
		let hotels = node.querySelector('.col-hotels')
		let template = hotels.innerHTML

		if (e.target.classList.contains('-active')) {
			listHotels.classList.add('-active')
			let r = new XMLHttpRequest();
			r.open("GET", "https://www.raphaelfabeni.com.br/rv/hotels.json", true);
			r.onreadystatechange = function () {
				if (r.readyState != 4 || r.status != 200) return;

				let data = JSON.parse(r.response);
				mustache.tags = [ '[[', ']]' ];
				mustache.parse(template);
				let rendered = mustache.render(template, data);
				hotels.innerHTML = rendered

				jails.start()
				comp.publish('list-success')
			};
			r.send();
		}
	}

	function titleDate(res) {
		let dayIn = node.querySelector('.title-list .date-in')
		let dayOut = node.querySelector('.title-list .date-out')
		dayIn.textContent = res[0]

		if (res.length > 1) {
			dayOut.textContent = res[1]
		}
	}
}
jails('list-hotels', listHotels)
jails.start()
