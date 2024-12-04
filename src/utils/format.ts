export const returnToLocaleString = (val: string | number | null | undefined): string => {
    if (val !== null && val !== undefined) {
        const num = Number(val)
        return num.toLocaleString('ko-KR')
    }
    return '-'
}

export const formatTime = (time: string | null | undefined): string => {
    return time ? `${time.slice(0, 2)}:${time.slice(2)}` : '00:00'
}

export const formatTotal = (val: string | number | null | undefined): string => {
    if (val !== null && val !== undefined) {
        const num = Number(val)
        return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }
    return '-'
}
