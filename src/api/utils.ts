export const formatExpenseForPGSQLInsertions = ({ ...data }) => {
    const PGSQL_PREFIX = 'e_'
    return Object.fromEntries(Object.entries(data).map(([k, v]) => [`${PGSQL_PREFIX}${k}`, v]))
}
