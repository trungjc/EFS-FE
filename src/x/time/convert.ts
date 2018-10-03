class Duration {
    start: number
    end: number
}
export function convertToUnix(start: Date, end: Date) {
    var tempStart = start
    tempStart.setHours(0, 0, 0, 0)
    var startUnix = tempStart.getTime() / 1000

    var tempEnd = end
    tempEnd.setHours(23, 59, 59, 0)
    let endUnix = tempEnd.getTime() / 1000
    let result: Duration = <Duration>{
        start: startUnix,
        end: endUnix
    }
    return result
}