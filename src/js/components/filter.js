import jails from 'jails-js'
import noUiSlider from 'noUiSlider'
import {filterHotels} from "../modules/filter-hotels";

const filter = (comp, node) => {

	comp.init(() => {
		comp.subscribe('list-success', uiSlider);
		comp.on('click', {'.rating-group .rating__label': setValue})
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
	}

	function uiSlider() {
		let nonLinearSlider = node.querySelector('#nonlinear')
		noUiSlider.create(nonLinearSlider, {
			connect: true,
			behaviour: 'tap',
			start: [ 100, 600 ],
			range: {
				min: 100,
				max: 600
			}
		});

		var nodes = [
			node.querySelector('#lower-value'), // 0
			node.querySelector('#upper-value')// 1
		];

		nonLinearSlider.noUiSlider.on('update', function ( valuesRange, handle ) {
			valuesRange[handle] = ~~valuesRange[handle]
			nodes[handle].innerHTML = '$' + valuesRange[handle];
			verifyStars(valuesRange)
		})
	}

	function verifyStars(vR){
		let vS = node.querySelectorAll('.rating-group .-active').length
		if (vS < 1) {
			verifyRange()
		} else {
			filterHotels(vR, vS)
		}
	}

	function verifyRange(v) {
		let lowerValue = node.querySelector('#lower-value').textContent.replace(/\$/g, '')
		let upperValue = node.querySelector('#upper-value').textContent.replace(/\$/g, '')
		let vMin = parseInt(lowerValue)
		let vMax = parseInt(upperValue)
		let vRange = [vMin, vMax]

		if (v) {
			filterHotels(vRange, v)
		} else {
			filterHotels(vRange)
		}
	}
}

jails('filter', filter)
jails.start()
