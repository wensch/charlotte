export function filterHotels(valueRange, valueStars) {

	var hotelsArr = [].slice.call(document.querySelectorAll(".hotel")).map(function(item){
			return item
	});

	for (var i =0; i < hotelsArr.length; i++) {
		var hotel = hotelsArr[i]
		var stars = hotel.querySelectorAll('.star').length
		var price = hotel.querySelector('.price').textContent.replace(/\$/g, '')
		var priceNumb = parseInt(price)
		var vMin = valueRange[0]
		var vMax = valueRange[1]

		if (valueStars) {
			if (priceNumb > vMax || priceNumb < vMin || stars !== valueStars) {
				hotel.classList.add('-close')
			} else {
				hotel.classList.remove('-close')
			}
		} else {
			if (priceNumb > vMax || priceNumb < vMin) {
				hotel.classList.add('-close')
			} else {
				hotel.classList.remove('-close')
			}
		}
	}
};
