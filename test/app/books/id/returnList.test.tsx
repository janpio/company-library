import { render, screen } from '@testing-library/react'
import { prismaMock } from '../../../__utils__/libs/prisma/singleton'
import { lendableBook } from '../../../__utils__/data/book'

describe('ReturnList Component', () => {
  const ReturnListComponent = require('@/app/books/[id]/returnList').default

  const expectedReturnHistories = [
    {
      lendingHistoryId: 2,
      returnedAt: new Date('2022-10-30'),
      lendingHistory: {
        id: 2,
        dueDate: new Date('2022-10-08'),
        lentAt: new Date('2022-10-01'),
        user: { id: 2, name: 'user02' },
      },
    },
    {
      lendingHistoryId: 3,
      returnedAt: new Date('2022-10-25'),
      lendingHistory: {
        id: 3,
        dueDate: new Date('2022-10-15'),
        lentAt: new Date('2022-10-01'),
        user: { id: 3, name: 'user03' },
      },
    },
    {
      lendingHistoryId: 1,
      returnedAt: new Date('2022-10-20'),
      lendingHistory: {
        id: 1,
        dueDate: new Date('2022-10-24'),
        lentAt: new Date('2022-10-01'),
        user: { id: 1, name: 'user01' },
      },
    },
  ]

  const prismaReturnHistoryMock = prismaMock.returnHistory.findMany
  prismaReturnHistoryMock.mockResolvedValue(expectedReturnHistories)

  it('返却済の貸出履歴がある場合、その一覧が返却日の昇順で表示される', async () => {
    render(await ReturnListComponent({ bookId: lendableBook.id }))

    expect(prismaReturnHistoryMock.mock.calls[0][0]?.orderBy).toStrictEqual([{ returnedAt: 'asc' }])
    expect(screen.getByTestId(`returnedDate-${0}`).textContent).toBe('2022/10/01〜2022/10/30')
    expect(screen.getByTestId(`returnedUser-${0}`).textContent).toBe('u')
    expect(screen.getByTestId(`returnedDate-${1}`).textContent).toBe('2022/10/01〜2022/10/25')
    expect(screen.getByTestId(`returnedUser-${1}`).textContent).toBe('u')
    expect(screen.getByTestId(`returnedDate-${2}`).textContent).toBe('2022/10/01〜2022/10/20')
    expect(screen.getByTestId(`returnedUser-${2}`).textContent).toBe('u')
  })

  it('返却履歴の取得時にエラーが発生した場合、エラーメッセージが表示される', async () => {
    const expectedError = new Error('DBエラー')
    prismaReturnHistoryMock.mockRejectedValueOnce(expectedError)
    console.error = jest.fn()

    render(await ReturnListComponent({ bookId: lendableBook.id }))

    expect(
      screen.getByText('返却履歴の取得に失敗しました。再読み込みしてみてください。'),
    ).toBeInTheDocument()
    expect(console.error).toBeCalledWith(expectedError)
  })
})
