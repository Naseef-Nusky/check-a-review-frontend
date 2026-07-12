import ReviewCard from '../../components/review/ReviewCard'
import PageHeader from '../../components/common/PageHeader'

const reviews = [
  { id: 1, rating: 5, title: 'Life changing experience', content: 'This company transformed how we do business. Cannot recommend enough.', author: 'Emma L.', date: 'Today' },
  { id: 2, rating: 4, title: 'Solid choice', content: 'Good quality and fair pricing. Would use again.', author: 'James P.', date: 'Yesterday' },
  { id: 3, rating: 5, title: 'Top notch', content: 'Professional, punctual, and exceeded expectations.', author: 'Lisa H.', date: '2 days ago' },
  { id: 4, rating: 3, title: 'Room for improvement', content: 'Decent service but communication could be better.', author: 'Tom B.', date: '3 days ago' },
  { id: 5, rating: 5, title: 'Five stars all the way', content: 'From start to finish, everything was perfect.', author: 'Nina S.', date: '4 days ago' },
  { id: 6, rating: 4, title: 'Happy customer', content: 'Reliable and trustworthy. Good experience overall.', author: 'David K.', date: '5 days ago' },
]

export default function LatestReviewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Latest Reviews"
        description="Recently published reviews from verified customers"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}
