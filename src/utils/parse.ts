export function parseJson(e: string): string | null {
    try {
        return JSON.parse(e)
    } catch (err) {
        return null
    }
}