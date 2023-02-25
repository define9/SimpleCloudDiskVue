export function capacityFilter(val) {
    let unit = ['B', 'KB', 'MB', 'GB', 'TB']
    let t = val
    for (let i = 0; i < unit.length; i++) {
        if (t < 1024) {
            return t.toFixed(2) + unit[i]
        }
        t = t / 1024
    }
    return t.toFixed(2) + unit[i]
}
