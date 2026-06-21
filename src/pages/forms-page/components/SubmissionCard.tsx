import Image from 'next/image'

import type { UserProfile } from '@/store/slices/submissionsSlice'

function SubmissionCard({ name, email, file, age, gender, country }: UserProfile) {
  return (
    <div className='submission-card'>
      {file && (
        <Image
          width={64}
          height={64}
          src={file}
          alt={name}
          className='mb-3 h-16 w-16 rounded-full object-cover'
        />
      )}

      <p className='text-lg font-semibold'>{name}</p>
      <p className='text-sm text-stone-4'>{email}</p>

      <p className='text-sm text-stone-4'>
        {age}
        ,
        {' '}
        {gender}
      </p>

      <p className='text-sm text-stone-4'>{country}</p>
    </div>
  )
}

export { SubmissionCard }
