export class Storage {
    private data: string[] = []
    constructor(public event_buffer_size: number) {

    }
    set(element: Record<string, any>) {
        if (this.data.length > this.event_buffer_size) {
            this.data.splice(0, 1)
        }
        this.data.push(JSON.stringify(element))
    }
    get(): Record<string, any>[] {
        if (this.data.length !== 0) {
            return this.data.map(value => JSON.parse(value!))
        } else {
            return []
        }
    }
    remove(element: Record<string, any>, count = 1) {
        let element_after = JSON.stringify(element)
        if (count === 1) {
            const index = this.data.findIndex((value) => value === element_after)
            this.data.splice(index, 1)
        } else {
            let done_count = 0
            let hit = this.data.map(value => {
                if (done_count >= count || value !== element_after) {
                    return value
                } else {
                    done_count += 1
                }
            }) as string[]
            hit.length !== 0 && (this.data = hit)
        }
    }
    clear() {
        this.data = []
    }
}