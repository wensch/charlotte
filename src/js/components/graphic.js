import jails from 'jails-js'

const graphic = (comp, node) => {

	comp.init(() => {
		comp.subscribe('list-success', heightGraphic);
	})

	function heightGraphic(e) {
		let itens = node.querySelectorAll("span")
		let value = [].slice.call(node.querySelectorAll("span")).map(function(item){
			return item.dataset.value
		});
		let heightMax = 135
		let maxValue = Math.max.apply(null, value)

		for (var i = 0; i < itens.length; i++) {
			let value = itens[i].dataset.value
			let heightBarra = (value * heightMax) / maxValue
			itens[i].style.height = heightBarra + 'px'

		}
	}

}
jails('graphic', graphic)
jails.start()
