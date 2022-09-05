import { PageContainer } from '../../../Layouts/PageContainer'

import { PhotoCard } from '../../../components/photo-card/photo-card.component'

import { ProfileEdit } from './profile-edit.component'
import { SecuritySettings } from './security-settings.component'
import { ExpenseHistoryData } from './expense-history-data.component'

// mock data
import user from '../../../mock-data/user.json'

import { DateRangeProvider } from '../../../context/useDateRange'

export const Account = () => {
    const { name, email, image } = user
    return (
        <PageContainer>
            <div className='w-full px-32'>
                <div className='flex items-center'>
                    <PhotoCard
                        width='w-32'
                        height='h-32'
                        image={image}
                    />
                    <div className='ml-8 flex flex-col'>
                        <p className='text-2xl font-bold'>{name}</p>
                        <p className='font-medium text-gray-400'>{email}</p>
                    </div>
                </div>
                <ProfileEdit {...user} />
                <SecuritySettings />
                <DateRangeProvider>
                    <ExpenseHistoryData />
                </DateRangeProvider>
            </div>
        </PageContainer>
    )
}
