// SEM USO
import jails from 'jails-js'

const filterRating = (comp, node) => {

	comp.init(() => {
		// comp.on('click', {'.rating-group .rating__label': setValue})
	})

	let stars = node.querySelectorAll('.rating-group .rating__label')

	function removeClass() {
		for (var i = 0; i < stars.length; i++) {
			stars[i].classList.remove('-active')
		}
	}

	function addClass(value) {
		for (var i = 0; i < value; i++) {
			stars[i].classList.add('-active')
		}
	}

	function setValue(e){
		let dataValue = e.target.dataset.value
		let value = parseInt(dataValue)

		removeClass()
		addClass(value)
		verifyRange(value)
		// verifyBoxes(value)
	}

	function verifyRange(v) {
		let lowerValue = document.querySelector('#lower-value').textContent.replace(/\$/g, '')
		let upperValue = document.querySelector('#upper-value').textContent.replace(/\$/g, '')

		let vMin = parseInt(lowerValue)
		let vMax = parseInt(upperValue)

		let vRange = [vMin, vMax]
		filterHotels(v, vRange)
	}

	function filterHotels(v, vRange) {
		var hotelsArr = [].slice.call(document.querySelectorAll(".hotel")).map(function(item){
				return item
		});

		for (var i =0; i < hotelsArr.length; i++) {
			var hotel = hotelsArr[i]
			var stars = hotel.querySelectorAll('.star').length
			var price = hotel.querySelector('.price').textContent.replace(/\$/g, '')
			var priceNumb = parseInt(price)
			var vMin = vRange[0]
			var vMax = vRange[1]

			if (priceNumb > vMax || priceNumb < vMin || stars !== v) {
				hotel.classList.add('-close')
			} else {
				hotel.classList.remove('-close')
			}
		}
	}

	// function verifyBoxes(v) {
	// 	var hotelsArr = [].slice.call(document.querySelectorAll(".hotel")).map(function(item){
	// 			return item
	// 	});
  //
	// 	for (var i =0; i < hotelsArr.length; i++) {
	// 		var hotel = hotelsArr[i]
	// 		var stars = hotel.querySelectorAll('.star').length
  //
	// 		if(stars !== v) {
	// 			hotel.classList.add('-close')
	// 		} else {
	// 			hotel.classList.remove('-close')
	// 		}
  //
	// 	}
	// }

}
jails('filter-rating', filterRating)
jails.start()
