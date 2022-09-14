import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { PageContainer } from '../../../Layouts/PageContainer'

import { PhotoCard } from '../../../components/photo-card/photo-card.component'

import { ProfileEdit } from './profile-edit.component'
import { SecuritySettings } from './security-settings.component'
import { ExpenseHistoryData } from './expense-history-data.component'

import { DateRangeProvider } from '../../../context/useDateRange'
import { useAuth } from '../../authentication/context/useAuth'

export const Account = () => {
    const { session } = useAuth()

    let userDetails, profileEditField, expenseHistory

    if (session && session.user && session.user.email) {
        const user = {
            email: session.user.email,
            name: session.user.user_metadata.name,
            image: session.user.user_metadata.image,
        }

        userDetails = (
            <div className='flex items-center'>
                <PhotoCard
                    width='w-32'
                    height='h-32'
                    image={user.image}
                />
                <div className='ml-8 flex flex-col'>
                    <p className='text-2xl font-bold dark:text-textDark1'>{user.name}</p>
                    <p className='font-medium text-gray-400 dark:text-orange-600'>{user.email}</p>
                </div>
            </div>
        )

        profileEditField = <ProfileEdit {...user} />
        expenseHistory = <ExpenseHistoryData userId={session.user.id} />
    } else {
        userDetails = (
            <SkeletonTheme
                baseColor='#abf2ab'
                highlightColor='#c7f6c7'
            >
                <div className='flex items-center'>
                    <Skeleton
                        count={1}
                        height={100}
                        width={100}
                        circle
                    />
                    <div className='ml-8 flex flex-col'>
                        <Skeleton
                            count={2}
                            height={50}
                            width={200}
                        />
                    </div>
                </div>
            </SkeletonTheme>
        )

        profileEditField = (
            <SkeletonTheme
                baseColor='#abf2ab'
                highlightColor='#c7f6c7'
            >
                <Skeleton
                    count={2}
                    height={150}
                    width={300}
                />
            </SkeletonTheme>
        )
    }

    return (
        <PageContainer classprops='y-overflow-scroll'>
            <div className='w-full px-32'>
                {userDetails}
                {profileEditField}
                <SecuritySettings />
                <DateRangeProvider>{expenseHistory}</DateRangeProvider>
            </div>
        </PageContainer>
    )
}
