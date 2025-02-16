import { DateTime } from 'luxon'
import { DATE_DISPLAY_FORMAT, DATE_SYSTEM_FORMAT } from '@/constants'

type Format = typeof DATE_DISPLAY_FORMAT | typeof DATE_SYSTEM_FORMAT

/**
 * 指定のフォーマットでJST日時文字列にする
 * @param {Date} date 日付
 * @param {Format} format フォーマット
 * @returns {string} JST日時文字列
 */
export const toJstFormat = (date: Date, format: Format = DATE_DISPLAY_FORMAT): string => {
  return DateTime.fromJSDate(date).setZone('Asia/Tokyo').toFormat(format)
}

/**
 * 引数で渡された期日がすぎているかどうか
 * @param {Date} deadline 期日
 * @returns {boolean} true:過ぎている
 */
export const isOverdue = (deadline: Date): boolean => {
  const currentDate: DateTime = DateTime.now().startOf('day')
  const deadlineDate: DateTime = DateTime.fromJSDate(deadline).startOf('day')

  return currentDate > deadlineDate
}

export const getDaysLaterJstDate = (days: number, format: Format = DATE_DISPLAY_FORMAT): string => {
  const currentDate: DateTime = DateTime.now().startOf('day')

  return currentDate.plus({ days }).setZone('Asia/Tokyo').toFormat(format)
}
