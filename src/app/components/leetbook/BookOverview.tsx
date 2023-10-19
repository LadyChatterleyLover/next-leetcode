import { LeetBook } from '@/app/types'
import { useEffect } from 'react'

interface Props {
  bookDetail: LeetBook
}

const BookOverview: React.FC<Props> = ({ bookDetail }) => {
  useEffect(() => {
    if (bookDetail) {
      const headings = document.querySelectorAll('.book-overview .leetbook-info .heading')
      Array.from(headings).map(item => {
        const div1 = document.createElement('div')
        div1.className = 'dec_frame'
        const div2 = document.createElement('div')
        div2.className = 'dec'
        const div3 = document.createElement('div')
        div3.className = 'dec_t'
        const div4 = document.createElement('div')
        div4.className = 'dec_t'
        item.appendChild(div1)
        item.appendChild(div2)
        item.appendChild(div3)
        item.appendChild(div4)
      })
      console.log('headings', headings)
    }
  }, [bookDetail])
  return (
    bookDetail && (
      <div
        className="book-overview"
        dangerouslySetInnerHTML={{ __html: bookDetail.summary.content }}></div>
    )
  )
}

export default BookOverview
