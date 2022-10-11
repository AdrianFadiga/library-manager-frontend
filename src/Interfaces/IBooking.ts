type Book = {
    title: string
    id: string
}

type User = {
    name: string
    id: string
}

export interface IBooking {
    id: string
    userId: string
    bookdId: string
    bookingDate: string
    returnDate: string
    status: string
    book: Book
    user: User
}