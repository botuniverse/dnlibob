export function parseJson<T>(e: string): T | null {
    try {
        return JSON.parse(e)
    } catch (err) {
        return null
    }
}