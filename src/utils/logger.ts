import { format, rgb24 } from "../../deps.ts"

export class Logger {
    constructor(private name: string, private extra: string[] = []) {
    }
    warn(text: any): void {
        return console.log(`${Logger.secondary(Logger.time())} ${Logger.color1("[WARN]")} ${Logger.secondary(this.name + ":")}`, ...this.extra, text)
    }
    info(text: any): void {
        return console.log(`${Logger.secondary(Logger.time())} ${Logger.color4("[INFO]")} ${Logger.secondary(this.name + ":")}`, ...this.extra, text)
    }
}

export namespace Logger {
    export function time(): string {
        return format(new Date(), "yy-MM-dd HH:mm:ss")
    }
    export function secondary(text: string): string {
        return rgb24(text, { r: 108, g: 110, b: 107 })
    }
    export function color1(text: string): string {
        return rgb24(text, 0xE3BCB5) /// https://www.qtccolor.com/secaiku/search?hex=E3BCB5&brand
    }
    export function color2(text: string): string {
        return rgb24(text, 0xA7BEC6) /// https://www.qtccolor.com/secaiku/search?hex=A7BEC6&brand
    }
    export function color3(text: string): string {
        return rgb24(text, 0xF5F4F0) // https://www.qtccolor.com/secaiku/search?hex=F5F4F0&brand
    }
    export function color4(text: string): string {
        return rgb24(text, 0xBFBFC1) /// https://www.qtccolor.com/secaiku/search?hex=BFBFC1&brand
    }
    export function color5(text: string): string {
        return rgb24(text, 0xB4A29E) /// https://www.qtccolor.com/secaiku/search?hex=B4A29E&brand
    }
    export function color6(text: string): string {
        return rgb24(text, 0xE0D3C3) /// https://www.qtccolor.com/secaiku/search?hex=E0D3C3&brand
    }
    export function color7(text: string): string {
        return rgb24(text, 0xEBE8E3) // https://www.qtccolor.com/secaiku/search?hex=EBE8E3&brand
    }
    export function color8(text: string): string {
        return rgb24(text, 0xE1C8CB) // https://www.qtccolor.com/secaiku/search?hex=E1C8CB&brand
    }
    export function color9(text: string): string {
        return rgb24(text, 0xDEE0EC) // https://www.qtccolor.com/secaiku/search?hex=DEE0EC&brand
    }
    export function color10(text: string): string {
        return rgb24(text, 0xBFCAC2) // https://www.qtccolor.com/secaiku/search?hex=BFCAC2&brand
    }
}