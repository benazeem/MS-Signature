import { Review } from "@/types/product.types";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={star <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          className={star <= rating ? "text-gold" : "text-border"}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export function Reviews({ reviews }: { reviews: Review[] }) {
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="mt-20" id="reviews-section">
      <div className="flex items-center gap-6 mb-10">
        <h2 className="font-heading text-2xl text-text-light">Reviews</h2>
        <div className="flex items-center gap-2">
          <StarRating rating={Math.round(avgRating)} />
          <span className="text-text-muted text-sm">
            ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-6 border border-border bg-accent/30"
            id={`review-${review.id}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <span className="text-gold text-sm font-heading">
                    {review.userName[0]}
                  </span>
                </div>
                <div>
                  <span className="text-text-light text-sm font-medium block">
                    {review.userName}
                  </span>
                  <span className="text-text-muted text-xs">{review.createdAt}</span>
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
