export const formatExpenseForPGSQLInsertions = ({ ...data }) => {
    const PGSQL_PREFIX = 'e_'
    return Object.fromEntries(Object.entries(data).map(([k, v]) => [`${PGSQL_PREFIX}${k}`, v]))
}

export const getPagination = (page: number, size: number) => {
    const limit = size ? +size : 3
    const from = page ? page * limit : 0
    const to = page ? from + size - 1 : size -1

    return { from, to }
}
