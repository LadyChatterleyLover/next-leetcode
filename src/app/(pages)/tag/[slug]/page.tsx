'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import TagWiki from '@/app/components/tagDetail/TagWiki'
import SubjectBook from '@/app/components/tagDetail/SubjectBook'
import CompanyFreqInfo from '@/app/components/tagDetail/CompanyFreqInfo'

const Tag = () => {
  const params = useParams()

  const slug = useMemo(() => {
    return params.slug as string
  }, [params])

  return (
    <div className='flex'>
      <TagWiki slug={slug}></TagWiki>
      <div className='w-[260px] mt-[120px] ml-9'>
        <SubjectBook slug={slug}></SubjectBook>
        <CompanyFreqInfo slug={slug}></CompanyFreqInfo>
      </div>
    </div>
  )
}

export default Tag
