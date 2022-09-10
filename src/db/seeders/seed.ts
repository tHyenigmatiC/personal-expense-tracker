import { supabase } from '../supabaseClient'

import expenseData from './expenses.data.json'
import reportData from './expense.report.json'
import expenseCategoryData from './expense.category.json'

export const addExpenses = async () => {
    const { data, error, status } = await supabase.from('expenses').insert(expenseData)

    if (data) console.log(data)
    if (error) console.log(error)
    console.log(status)
}

export const addMonthlyReport = async () => {
    const { data, error, status } = await supabase.from('monthly_report').insert(reportData)

    if (data) console.log(data)
    if (error) console.log(error)
    console.log(status)
}

export const addCategoryType = async () => {
    const { data, error, status } = await supabase
        .from('expense_category_data')
        .insert(expenseCategoryData)

    if (data) console.log(data)
    if (error) console.log(error)

    status === 201 ? console.log('Successfull  addCategoryType') : console.log(status)
}

// const handleFilesUpload = async (e) => {
// 	const image = e.target.files[0]
// 	console.log(image)
// 	const { data, error } = await supabase.storage
// 		.from('images')
// 		.upload(`public/${image.name}`, image, {
// 			cacheControl: '3600',
// 			upsert: false
// 		})

// 	const { publicURL } = await supabase.from('images').getPublicUrl(`public/${image.name}`)

// 	 (formData = { ...formData, image_url: publicURL })
// }
