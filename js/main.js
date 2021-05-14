const App = (() => {
	const sw = async () => {
		try {
			// await navigator.serviceWorker.register('../sw_cached_pages.js')
			await navigator.serviceWorker.register('../sw_cached_site.js')
		} catch (err) {
			console.log(`Service Worker: Error: ${err}`)
		}
	}

	const loadEvtListeners = () =>
		// make sure sw is supported
		// 'serviceWorker' in navigator && // can do it this way too
		navigator.serviceWorker && window.addEventListener('load', sw)

	const init = () => loadEvtListeners()

	return { init }
})()

App.init()
