import jails from 'jails-js'
import mustache from 'mustache'

const graphic = (comp, node) => {

	comp.init(() => {
		comp.subscribe('list-success', heightGraphic);
	})

	function heightGraphic(e) {
		let arr = []
		let itens = node.querySelectorAll('li > span')

		for (var i = 0; i < itens.length; i++) {
			let value = itens[i].dataset.value
			let number = parseInt(value)
			arr.push(number)

			let maxValue = Math.max.apply(null, arr)
			console.log('maxValue', maxValue);

			let heightMax = 135
			let ratingMax = 438
			let heightBarra = (number * heightMax) / ratingMax
			itens[i].style.height = heightBarra + 'px'

		}
	}

}
jails('graphic', graphic)
jails.start()
