"use client";

import { Review } from "@/lib/types/Reviews"; // Import Review type
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { Clock5, UsersRound } from "lucide-react";
import Image from "next/image";
import { Media } from "@/lib/types/Media";
import { Restaurant } from "@/lib/types/Restaurant";
import { Reservation } from "@/lib/types/Reservation";

interface PendingReviewsProps {
  groupedReviews: { [key: string]: Review[] }; // Grouped reviews data
  mediaDatasets: { media: Media[] };
  restaurantDatasets: { restaurant: Restaurant[] };
  groupedReservations: { [key: number]: Reservation[] };
}

const PendingReviews = ({
  groupedReviews,
  mediaDatasets,
  restaurantDatasets,
  groupedReservations,
}: PendingReviewsProps) => {
  const router = useRouter();
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
              // Get the reservations for the same restaurant
              const reservationsForRestaurant =
                groupedReservations[review.restaurant_id];

              return (
                <div
                  key={review.id}
                  className="flex flex-row items-center px-2 py-1 md:px-4 md:py-2 hover:bg-slate-100/50 cursor-pointer my-5 group"
                  onClick={() => {
                    router.push(
                      `reviews/write-review/${review.user_id}/${review.id}`
                    );
                  }}
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
                        width={400}
                        height={400}
                      />
                    </div>
                  )}

                  {/* Display review details */}
                  <div className="flex flex-col ml-5 gap-y-5 text-xs md:text-base">
                    <p className="font-bold group-hover:underline">
                      {restaurant?.name}
                    </p>
                    <div className="flex flex-row gap-x-3">
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
                    </div>
                    <p className="bg-warning-secondary text-warning-primary inline-flex rounded-md py-1 px-2 flex-shrink-0 min-w-0 w-fit">
                      Menunggu Ulasan
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default PendingReviews;
