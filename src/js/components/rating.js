import jails from 'jails-js'

const rating = (comp, node) => {
	let elm = comp.elm

	comp.init(() => {
		comp.subscribe('list-success', ratingStars);
	})

	function ratingStars() {
		let qtdStars = node.getAttribute('data-rating')
		let count = 0
		while (count < qtdStars) {
			let div = document.createElement('div')
			div.classList.add('star')
			elm.appendChild(div)
			count++
		}
	}
}
jails('rating', rating)
jails.start()
