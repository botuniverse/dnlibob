// deno-lint-ignore-file no-explicit-any
export function noEmptyStr(value: any) {
    if (value == undefined || value === '') {
        return false
    }
    return true
}