import { PageContainer } from '../../../Layouts/PageContainer'

import { PhotoCard } from '../../../components/photo-card/photo-card.component'

import { ProfileEdit } from './profile-edit.component'

// mock data
import user from '../../../mock-data/user.json'

export const Account = () => {
    const { name, email, image } = user
    return (
        <PageContainer title='Account'>
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
        </PageContainer>
    )
}
