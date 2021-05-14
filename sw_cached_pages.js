const SwCachedPages = (() => {
	const cacheName = 'v1'
	const cahceAssets = [
		'./index.html',
		'./about.html',
		'./css/style.css',
		'./js/main.js'
	]

	const cacheResources = async () => {
		try {
			const cache = await caches.open(cacheName)
			cache.addAll(cahceAssets)
			self.skipWaiting()
		} catch (err) {
			console.log(`cacheResources: Error: ${err}`)
		}
	}

	const cacheKeys = async () => {
		try {
			const keys = await caches.keys()
			const deletions = keys.map(key => key !== cacheName && caches.delete(key))
			deletions.forEach(async success => await success)
		} catch (err) {
			console.log(`cacheKeys: Error: ${err}`)
		}
	}

	const fetchReq = async req => {
		try {
			return await fetch(req)
		} catch (err) {
			console.log(`orgnalReq: Error: ${err}`)
			caches.match(req)
		}
	}

	const instlEvt = e => e.waitUntil(cacheResources())

	const actvtEvt = e => e.waitUntil(cacheKeys())

	const fetchEvt = e => e.respondWith(fetchReq(e.request))

	const loadEvtListeners = () => {
		self.addEventListener('install', instlEvt)
		self.addEventListener('activate', actvtEvt)
		self.addEventListener('fetch', fetchEvt)
	}

	const init = () => loadEvtListeners()

	return { init }
})()

SwCachedPages.init()
