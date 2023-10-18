'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import TagWiki from '@/app/components/tagDetail/TagWiki'
import SubjectBook from '@/app/components/tagDetail/SubjectBook'

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
      </div>
    </div>
  )
}

export default Tag
