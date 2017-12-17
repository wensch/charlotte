// SEM USO
import jails from 'jails-js'
import noUiSlider from 'noUiSlider'
import {filterHotels} from "../modules/filter-hotels";

const filterRange = (comp, node) => {

	comp.init(() => {
		comp.subscribe('just-range', ({vRange})=> verifyRange(vRange) );
	})

	function verifyRange(vRange) {

		console.log('Hello', vRange);
		filterHotels(vRange)
	}
}
jails('filter-range', filterRange)
jails.start()
