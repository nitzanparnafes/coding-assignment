const {LRUCache} = require('lru-cache')

const cache = new LRUCache({
    max: 100,
    ttl: parseInt(process.env.CACHE_TTL, 10) || 5 * 60 * 1000
})

async function memoize(key, fn) {
    if (cache.has(key)) {
        return cache.get(key)
    }

    try {
        const result = await fn()
        cache.set(key, result)
        return result
    } catch (err) {
        cache.delete(err)
        throw err
    }
}

module.exports = {
    memoize
}
