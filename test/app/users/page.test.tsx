import { render, screen } from '@testing-library/react'
import { prismaMock } from '../../__utils__/libs/prisma/singleton'
import { user1, user2 } from '../../__utils__/data/user'

describe('users page', () => {
  prismaMock.user.findMany.mockResolvedValue([user1, user2])

  const UserPage = require('@/app/users/page').default

  it('利用者一覧が表示される', async () => {
    render(await UserPage())

    const heading = await screen.findByRole('heading')
    expect(heading).toHaveTextContent('利用者一覧')
    expect(screen.getByText(user1.name)).toBeInTheDocument()
    expect(screen.getByText(user2.name)).toBeInTheDocument()
  })

  it('利用者一覧の読み込みに失敗した場合、「Error!」と表示される', async () => {
    const expectErrorMsg = 'query has errored!'
    console.error = jest.fn()
    prismaMock.user.findMany.mockRejectedValueOnce(expectErrorMsg)

    render(await UserPage())

    expect(screen.getByText('Error!')).toBeInTheDocument()
    expect(console.error).toBeCalledWith(expectErrorMsg)
  })
})
