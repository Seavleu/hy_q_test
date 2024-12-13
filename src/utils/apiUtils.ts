export const handleApiResponse = (response: any, onSuccess: Function, onError: Function) => {
    if (response && response.data) {
        onSuccess(response.data)
    } else {
        console.warn('API returned empty data')
        onError?.()
    }
}
