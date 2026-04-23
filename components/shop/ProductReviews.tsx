"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Star, Loader2, User, Image as ImageIcon, X } from "lucide-react";
import { useAuth } from "@/lib/supabase-auth-context";
import { useGuestAuth } from "@/lib/guest-auth-context";
import { useToast } from "@/components/ui/Toast";
import Image from "next/image";

import { Review } from "@/types/product.types";

export function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [canReview, setCanReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { showToast } = useToast();
  const { user: supabaseUser } = useAuth();
  const { user: guestUser } = useGuestAuth();

  const userEmail = supabaseUser?.email || guestUser?.email;
  const userName = supabaseUser?.user_metadata?.full_name || userEmail?.split("@")[0] || "Guest";

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`);
      const data = await res.json();
      if (res.ok) {
        setReviews(data.reviews || []);
        setCanReview(data.canReview || false);
      }
    } catch {
      console.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/reviews/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setImages((prev) => [...prev, data.url]);
      } else {
        showToast(data.error || "Failed to upload image", "error");
      }
    } catch {
      showToast("Network error uploading image", "error");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) {
      showToast("Please sign in to leave a review.", "info");
      return;
    }
    if (!comment.trim()) {
      showToast("Please write a review comment.", "error");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          userEmail,
          userName,
          rating,
          comment,
          images,
        }),
      });

      if (res.ok) {
        showToast("Review submitted successfully!", "success");
        setComment("");
        setRating(5);
        setImages([]);
        fetchReviews();
      } else {
        const data = await res.json();
        showToast(data.error || "Failed to submit review", "error");
      }
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-16 pt-16 border-t border-border">
      <h3 className="font-heading text-2xl text-text-light mb-8">Customer Reviews</h3>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-6">
          {loading ? (
            <div className="flex items-center gap-2 text-text-muted py-8">
              <Loader2 size={16} className="animate-spin text-gold" />
              <p>Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="bg-accent/10 border border-border rounded-xl p-8 text-center">
              <Star size={32} className="text-border mx-auto mb-3" />
              <p className="text-text-muted">No reviews yet. Be the first to review this product!</p>
            </div>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="bg-accent/20 border border-border rounded-xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                      <User size={14} />
                    </div>
                    <div>
                      <p className="text-text-light text-sm font-medium">{r.userName}</p>
                      <p className="text-text-muted text-[10px] tracking-wider uppercase">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        className={star <= r.rating ? "text-gold fill-gold" : "text-border"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-text-muted text-sm leading-relaxed mb-3">{r.comment}</p>
                {r.images && r.images.length > 0 && (
                  <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                    {r.images.map((img, i) => (
                      <div key={i} className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden border border-border">
                        <Image src={img} alt="Review attachment" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="bg-accent/10 border border-border rounded-xl p-6 md:p-8 sticky top-32">
            <h4 className="font-heading text-lg text-text-light mb-6">Write a Review</h4>
            
            {userEmail && canReview ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-text-muted text-xs tracking-widest uppercase mb-2 block">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          size={24}
                          className={star <= rating ? "text-gold fill-gold" : "text-border hover:text-gold/50"}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="comment" className="text-text-muted text-xs tracking-widest uppercase mb-2 block">
                    Your Review
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="What did you think of this attar?"
                    className="w-full bg-primary border border-border rounded-lg p-3 text-sm text-text-light placeholder:text-border focus:border-gold/50 focus:outline-none transition-colors min-h-30 resize-y"
                  />
                </div>

                <div>
                  <label className="text-text-muted text-xs tracking-widest uppercase mb-2 block">
                    Add Photos (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {images.map((img, index) => (
                      <div key={index} className="relative w-16 h-16 rounded-md overflow-hidden border border-border">
                        <Image src={img} alt="Uploaded preview" fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-black/50 rounded-full p-0.5 hover:bg-red-500 transition-colors"
                        >
                          <X size={12} className="text-white" />
                        </button>
                      </div>
                    ))}
                    {images.length < 3 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="w-16 h-16 rounded-md border border-dashed border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors text-text-muted"
                      >
                        {uploadingImage ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={20} />}
                      </button>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gold text-primary font-semibold py-3 rounded-lg tracking-widest uppercase text-xs transition-all duration-300 hover:bg-soft-gold disabled:opacity-60 flex justify-center items-center gap-2"
                >
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            ) : userEmail ? (
              <div className="text-center py-6 bg-primary/30 border border-border rounded-lg">
                <p className="text-text-muted text-sm px-4">
                  You can only review products that you have ordered and received.
                </p>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-text-muted text-sm mb-4">You must be signed in to leave a review.</p>
                <a
                  href="/login"
                  className="inline-block bg-primary border border-border text-text-light font-semibold px-6 py-2.5 rounded-lg tracking-widest uppercase text-xs hover:border-gold transition-colors"
                >
                  Sign In
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
