function fetchFromCache(name: string) {
    const asyncFunction = async () => {
        try {
            const cache = await caches.open('filesCache');
            const response = await cache.match(name);
            if (!response) return null;
            const blob = await response.blob();
            return blob;
        } catch (error) {
            // Handle the error and return undefined
            console.error('Error fetching from cache:', error);
            return undefined;
        }
    };

    // Immediately resolve the async function and handle errors
    return asyncFunction()
        .then(response => response)
        .catch(() => undefined);
}

export { fetchFromCache };
