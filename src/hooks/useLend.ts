'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { usePostLendingHistoryMutation } from '@/generated/graphql.client'

export const useLend = (bookId: number, userId: number, initialDueDate: string) => {
  const router = useRouter()

  const [dueDate, setDueDate] = useState(initialDueDate)
  const handleDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.currentTarget.value)
  }

  const [, postLendingHistory] = usePostLendingHistoryMutation()
  const lend = async () => {
    const result = await postLendingHistory({
      userId: userId,
      bookId: bookId,
      dueDate: dueDate,
    })
      .then((result) => {
        if (result.error) {
          console.error(result.error)
          return new Error('貸し出しに失敗しました。もう一度試して見てください。')
        }

        return result
      })
      .catch((err) => {
        console.error(err)
        return new Error('貸し出しに失敗しました。もう一度試して見てください。')
      })

    if (result instanceof Error) {
      window.alert(result.message)
    }

    router.refresh()
  }

  return {
    lend,
    dueDate,
    handleDueDate,
  }
}
