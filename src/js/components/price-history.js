import jails from 'jails-js'

const priceHistory = (comp, node) => {

	comp.init(() => {
		comp.on('click', {'.-price': openHistory})
		comp.on('click', {'.btn-back': closeHistory})
		comp.subscribe('list-success', formatPrice);
	})

	function formatPrice() {
		let price = node.querySelector('.price')
		let priceNumb = parseInt(price.textContent.replace(/\$/g, ''))

		price.innerHTML = '$' + priceNumb.toFixed(0)
	}

	function openHistory() {
		node.classList.add('-history')
	}

	function closeHistory(e) {
		e.preventDefault()
		node.classList.remove('-history')
	}
}
jails('price-history', priceHistory)
jails.start()
