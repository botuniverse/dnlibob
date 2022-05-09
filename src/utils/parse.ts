export function parseJson(e: any): any | null {
    try {
        return JSON.parse(e.data)
    } catch (err) {
        return null
    }
}