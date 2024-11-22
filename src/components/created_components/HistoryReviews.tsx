"use client";

import { Review } from "@/lib/types/Reviews"; // Import Review type
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { Clock5, UsersRound, Star } from "lucide-react";
import Image from "next/image";
import { Media } from "@/lib/types/Media";
import { Restaurant } from "@/lib/types/Restaurant";
import { Reservation } from "@/lib/types/Reservation";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

import { ReviewDetails } from "@/lib/types/ReviewDetails";

interface HistoryReviewsProps {
  groupedReviews: { [key: string]: Review[] }; // Grouped reviews data
  mediaDatasets: { media: Media[] };
  restaurantDatasets: { restaurant: Restaurant[] };
  groupedReservations: { [key: number]: Reservation[] }; // Reservations grouped by restaurant ID
}

const HistoryReviews = ({
  groupedReviews,
  mediaDatasets,
  restaurantDatasets,
  groupedReservations,
}: HistoryReviewsProps) => {
  const router = useRouter();
  const [reviewDetails, setReviewDetails] = useState<ReviewDetails | null>(
    null
  ); // State to hold review details
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null); // Selected review ID
  const [loadingReviewId, setLoadingReviewId] = useState<number | null>(null); // State to track which review is being loaded

  // Fetch review details based on the review ID
  const fetchReviewDetails = async (reviewId: number) => {
    try {
      setLoadingReviewId(reviewId); // Set loading state for the current review
      const response = await fetch(
        `https://backend-delish-app-production.up.railway.app/api/reviews/${reviewId}`
      );
      const data = await response.json();
      setReviewDetails(data.review); // Store the review details in state
      setLoadingReviewId(null); // Reset loading state after data is fetched
    } catch (error) {
      console.error("Error fetching review details:", error);
      setLoadingReviewId(null); // Reset loading state in case of error
    }
  };

  const handleReviewClick = (reviewId: number) => {
    setSelectedReviewId(reviewId); // Set selected review ID
    setDialogOpen(false); // Close dialog if it's already open
    fetchReviewDetails(reviewId); // Fetch review details
  };

  // Open dialog once review details are loaded
  useEffect(() => {
    if (reviewDetails && selectedReviewId === reviewDetails.id) {
      setDialogOpen(true); // Open the dialog once the review details are fetched
    }
  }, [reviewDetails, selectedReviewId]);

  return (
    <div className="mb-10">
      {/* Iterate over the grouped reviews by date */}
      {Object.keys(groupedReviews).map((date) => {
        // Use the first review's 'created_at' as the group date
        const createdAtDate = new Date(groupedReviews[date][0].created_at);

        return (
          <div key={date} className="py-4 border-b-2 min-w-max">
            {/* Display group date in the header using the first review's created_at */}
            <h3 className="text-xl font-semibold px-4">
              {formatDate(createdAtDate.toString())}
            </h3>

            {/* Iterate over each review in the group */}
            {groupedReviews[date].map((review) => {
              const restaurant = restaurantDatasets.restaurant.find(
                (restaurant) => restaurant.id === review.restaurant_id
              );
              const reservationsForRestaurant =
                groupedReservations[review.restaurant_id];
              const rating = review.score || 0; // Assuming review.score contains the rating value
              const stars = Array.from({ length: rating }, (_, index) => (
                <Star
                  key={index}
                  size={16}
                  className="text-[#FFB332] fill-[#FFB332] mt-[6px]"
                />
              ));

              return (
                <div
                  key={review.id}
                  className="flex flex-row items-center px-4 py-2 my-5 group"
                >
                  {/* Display media if available */}
                  {mediaDatasets.media.find(
                    (media) => media.overall_id === review.restaurant_id
                  ) && (
                    <div className="flex gap-2 mt-4">
                      <Image
                        src={
                          mediaDatasets.media.find(
                            (media) => media.overall_id === review.restaurant_id
                          )?.location || "https://placehold.co/600x400"
                        }
                        alt={`Media for Review ${review.restaurant_id}`}
                        className="w-32 h-32 object-cover rounded-xl shadow-sm"
                        width={300}
                        height={300}
                      />
                    </div>
                  )}

                  {/* Display review details */}
                  <div className="flex flex-col ml-5 gap-y-5 text-xs md:text-base">
                    <p className="font-bold">{restaurant?.name}</p>
                    {/* Display reservations for the same restaurant */}
                    {reservationsForRestaurant?.map((reservation) => (
                      <div
                        key={reservation.id}
                        className="flex flex-row gap-x-4 mt-2"
                      >
                        <Clock5 className="" size={24} />
                        <p className="bg-[#F2F4F7] py-1 px-1 md:px-2 rounded-md text-center">
                          {reservation.reservation_time} WIB
                        </p>
                        <UsersRound className="" size={24} />
                        <p className="bg-[#F2F4F7] py-1 px-1 md:px-2 rounded-md text-center">
                          {reservation.number_of_people} orang
                        </p>
                      </div>
                    ))}

                    {/* Status and Rating */}
                    <div className="flex flex-row gap-x-1">
                      <p className="bg-[#DCFCE7] text-[#16A34A] inline-flex rounded-md py-1 px-2 flex-shrink-0 min-w-0 w-fit mr-3">
                        Selesai
                      </p>
                      {stars}
                    </div>

                    {/* Button to trigger Dialog */}
                    <button
                      onClick={() => handleReviewClick(review.id)}
                      className="mt-4 bg-[#e2d4bc] text-black px-4 py-2 rounded-md"
                    >
                      {loadingReviewId === review.id
                        ? "Loading..."
                        : "Show Review Details"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Dialog to show review details */}
      {reviewDetails && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            {/* Hidden trigger, now unused */}
            <div className="hidden">Open Dialog</div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Review Details</DialogTitle>
              <DialogDescription>
                {/* Show review details */}
                {reviewDetails.review_body}
                <br />
                Created at: {reviewDetails.created_at}
                {/* Show Review Media if available */}
                {reviewDetails.media_urls.length > 0 ? (
                  reviewDetails.media_urls.map((url, index) => (
                    <Image
                      key={index}
                      src={url}
                      alt={`Review media ${index + 1}`}
                      width={300}
                      height={300}
                      className="rounded-lg mt-4"
                    />
                  ))
                ) : (
                  <span>No media available for this review.</span>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default HistoryReviews;
