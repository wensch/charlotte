import jails from 'jails-js'
import noUiSlider from 'noUiSlider'

const filter = (comp, node) => {

	comp.init(() => {
		comp.subscribe('list-success', renderItems);
	})

	var priceFormat = wNumb({prefix: '$', decimals: 2})
	var regularSlider = document.querySelector('.slider')
	var price = []
	// define items or get them via AJAX and then call the function renderItems()
	var items = [
			 {
					 name: 'awesome GPU 3000',
					 vendor: 'Misan\'s goods',
					 build_year: 2014,
					 price: 120.59,
					 availability: true
			 },
			 {
					 name: 'splendid GPU 5.3',
					 vendor: 'Just stuff',
					 build_year: 2015,
					 price: 199.59,
					 availability: true
			 }
	]
	// Initial render with the items
	// The function renderItems is defined later (which is no problem in javascript)
	renderItems(items)

	// slider setup
	var slider = noUiSlider.create(regularSlider, {
			start: [-Infinity, Infinity], // always start and end of the range
			connect: true,
			tooltips: [wNumb({prefix: '$', decimals: 0}), wNumb({prefix: '$', decimals: 0})],
			pips: {
				mode: 'steps',
				density: 5
			},
			range: this.getPriceRange(this.items)
	})


	// on slider update, call filterItems and render them
	slider.on('update', function(values){
			let filteredItems = filterItems(items, values)
			renderItems(filteredItems)
	})

	function getPriceRange(items) {
			let min = items.reduce(function(acc, value){
					return acc < value.price ? acc : value.price
			})
			let max = items.reduce(function(acc, value){
					return acc > value.price ? acc : value.price
			})
			return {min: min, max: max}
	}

	function filterItems(items, price) {
			return items.filter(item => {
					return item.price >= price[0] && item.price <= price[1]
			})
	}

	function renderItems(items) {
			var counter = document.querySelector('.counter')
			counter.innerHTML = `Your search matches <b>${items.length}</b> result${items.length == 1 ? '' : 's'}`
			var table = document.querySelector('.results')
					table.innerHTML = items.map(item=>{return `
					<tr>
							<td><span>Name</span>${item.name}</td>
							<td><span>Vendor</span>${item.vendor}</td>
							<td><span>Build year</span>${item.build_year}</td>
							<td><span>Price</span>${priceFormat.to(item.price)}</td>
							<td style="background-color: ${item.availability ? '#58D288' : '#C43828'}"><span hide-gt-sm>Available</span>${''+item.availability}</td>
					</tr>
					 `
			}).join('')
			// we need join(''), because we do an array to string conversion here.
			// otherwise, the items would be connected with ","
	}
}
jails('filter', filter)
jails.start()
