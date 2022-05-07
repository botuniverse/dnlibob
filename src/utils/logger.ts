import { format, rgb24 } from "../../deps.ts"

export class Logger<T> {
    constructor(private name: string) {
    }
    time(): string {
        return format(new Date(), "yy-MM-dd HH:mm:ss")
    }
    secondary(text: string): string {
        return rgb24(text, { r: 108, g: 110, b: 107 })
    }
    red(text: string): string {
        return rgb24(text, { r: 199, g: 63, b: 74 })
    }
    yellow(text: string): string {
        return rgb24(text, { r: 250, g: 202, b: 48 })
    }
    blue(text: string): string {
        return rgb24(text, { r: 0, g: 162, b: 213 })
    }
    warn(args: T): void {
        return console.log(`${this.secondary(this.time())} ${this.yellow("[WARN]")} ${this.secondary(this.name + ":")}`, args)
    }
    info(args: T): void {
        return console.log(`${this.secondary(this.time())} ${rgb24("[INFO]", { r: 98, g: 190, b: 119 })} ${this.secondary(this.name + ":")}`, args)
    }
}