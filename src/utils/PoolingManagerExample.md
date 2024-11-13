
# Example of Pooling Manager (by Kal_Torak)

```js
let busyProxies = new Map()
let availableProxies = []

function getProxy(eid) {
	if (eid === 0) return null
	if (availableProxies.length === 0) {
		availableProxies.push(new Entity(0))
	}

	let p = availableProxies.pop().setEid(eid)
	busyProxies.set(p, { t: performance.now(), w: w })
	return p
}

function releaseProxy(proxy) {
	if (!proxy) return
	busyProxies.delete(proxy)
	proxy.setEid(0)
	availableProxies.push(proxy)
}
function releaseProxies(...proxies) {
	for (let i = 0;i < proxies.length;i++)
		releaseProxy(proxies[i])
}
```