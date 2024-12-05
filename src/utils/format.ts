export const returnToLocaleString = (val: string | number | null | undefined): string => {
    if (val !== null && val !== undefined) {
        const num = Number(val)
        return num.toLocaleString('ko-KR')
    }
    return '-'
}