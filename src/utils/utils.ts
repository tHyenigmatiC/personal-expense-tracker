/* 
    Only checks for one level deep js object/json
 */
export const filterUpdatedValue = (oldObj: object, newObj: object) => {
    const o = Object.keys(oldObj) as Array<keyof object>
    const n = Object.keys(newObj) as Array<keyof object>

    let changes: Record<string, string> | undefined = undefined

    const newKeys = n.filter(k => !o.includes(k))

    if (newKeys.length > 0) {
        newKeys.forEach(item => {
            changes = {
                ...changes,
                [item]: newObj[item],
            }
        })
    }

    const updatedValues = o.filter(value => oldObj[value] != newObj[value])

    if (updatedValues.length > 0) {
        updatedValues.forEach(item => {
            changes = {
                ...changes,
                [item]: newObj[item],
            }
        })
    }

    return changes
}
