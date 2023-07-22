export const bookWithImage = {
  id: 1,
  title: '画像有りのタイトル',
  isbn: '1111111111111',
  imageUrl:
    'https://books.google.com/books/content?id=QlmenQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
  createdAt: new Date('2023-07-22T06:12:23.527Z'),
}

export const bookWithoutImage = {
  id: 2,
  title: '画像無しのタイトル',
  isbn: '2222222222222',
  imageUrl: '',
  createdAt: new Date('2023-07-22T06:12:24.118Z'),
}

const now = new Date()

export const lendableBook = {
  ...bookWithImage,
  isbn: '1111111111111',
  registrationHistories: [
    { userId: 1, createdAt: now },
    { userId: 2, createdAt: now },
  ],
  lendingHistories: [],
  reservations: [{ userId: 1, reservationDate: now, createdAt: now }],
}
