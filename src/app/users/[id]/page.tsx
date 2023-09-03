import prisma from '@/libs/prisma/client'
import BookList from '@/app/users/[id]/bookList'
import { lendingHistory } from '@/models/lendingHistory'
import { service } from '@/app/users/[id]/service'
import { readingHistories } from '@/hooks/server/readingHistories'

// Next.jsでメタデータを設定した場合のテストに問題があるようなので、一旦コメントアウト
// https://github.com/vercel/next.js/issues/47299#issuecomment-1477912861
// export const metadata: Metadata = {
//   title: '利用者情報 | company-library',
// }

type UserPageProps = {
  params: {
    id: string
  }
}

const UserPage = async ({ params }: UserPageProps) => {
  const id = Number(params.id)
  if (isNaN(id)) {
    return <div>Error!</div>
  }

  const user = await prisma.user
    .findUnique({
      where: { id },
      include: { lendingHistories: { include: { returnHistory: true, book: true } } },
    })
    .catch((e) => {
      console.error(e)
      return new Error('User fetch failed')
    })
  if (user instanceof Error || !user) {
    return <div>Error!</div>
  }

  const lendingHistories = user.lendingHistories
    .map((h) => {
      return {
        book: h.book,
        isReturned: !!h.returnHistory,
      }
    })
    .reduce<Array<{ book: Book; isReturned: boolean }>>((acc, obj) => {
      return acc.some((a) => a.book.id === obj.book.id && a.isReturned === obj.isReturned)
        ? acc
        : [...acc, obj]
    }, [])

  const readingBooks = lendingHistories.filter((h) => !h.isReturned)
  const haveReadBooks = lendingHistories.filter((h) => h.isReturned)
  return (
    <>
      <h1 className="text-3xl">{user.name}さんの情報</h1>
      <div className="mt-8">
        <h2 className="text-xl">現在読んでいる書籍({readingBooks.length}冊)</h2>
        <div className="mt-2">
          <BookList books={readingBooks.map((b) => b.book)} />
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl">今まで読んだ書籍({haveReadBooks.length}冊)</h2>
        <div className="mt-2">
          <BookList books={haveReadBooks.map((b) => b.book)} />
        </div>
      </div>
    </>
  )
}

export default UserPage
