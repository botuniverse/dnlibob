import { format, rgb24 } from "../../deps.ts"

export class Logger {
    constructor(private name: string, private extra: string = '') {
    }
    warn(...args: any): void {
        return console.log(`${Logger.secondary(Logger.time())} ${Logger.yellow("[WARN]")} ${Logger.secondary(this.name + ":")}`, this.extra, args)
    }
    info(...args: any): void {
        return console.log(`${Logger.secondary(Logger.time())} ${rgb24("[INFO]", { r: 98, g: 190, b: 119 })} ${Logger.secondary(this.name + ":")}`, this.extra, args)
    }
}

export namespace Logger {
    export function time(): string {
        return format(new Date(), "yy-MM-dd HH:mm:ss")
    }
    export function secondary(text: string): string {
        return rgb24(text, { r: 108, g: 110, b: 107 })
    }
    export function red(text: string): string {
        return rgb24(text, { r: 199, g: 63, b: 74 })
    }
    export function yellow(text: string): string {
        return rgb24(text, { r: 250, g: 202, b: 48 })
    }
    export function blue(text: string): string {
        return rgb24(text, { r: 0, g: 162, b: 213 })
    }
}