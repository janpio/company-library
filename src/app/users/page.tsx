import prisma from '@/libs/prisma/client'
import UserCard from '@/app/users/userCard'

// Next.jsでメタデータを設定した場合のテストに問題があるようなので、一旦コメントアウト
// https://github.com/vercel/next.js/issues/47299#issuecomment-1477912861
// export const metadata: Metadata = {
//   title: '利用者一覧 | company-library',
// }

const Users = async () => {
  const users = await prisma.user
    .findMany({ include: { lendingHistories: { include: { returnHistory: true } } } })
    .catch((e) => {
      console.error(e)
      return new Error('User fetch failed')
    })

  if (users instanceof Error) {
    return <div>Error!</div>
  }

  return (
    <>
      <h1 className="text-3xl mb-8">利用者一覧</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => {
          return <UserCard key={user.id} user={user} />
        })}
      </div>
    </>
  )
}

export default Users
