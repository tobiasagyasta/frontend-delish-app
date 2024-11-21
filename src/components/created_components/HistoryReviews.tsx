"use client";

import { Review } from "@/lib/types/Reviews"; // Import Review type
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { Clock5, UsersRound, Star } from "lucide-react";
import Image from "next/image";
import { Media } from "@/lib/types/Media";
import { Restaurant } from "@/lib/types/Restaurant";
import { Reservation } from "@/lib/types/Reservation";

interface HistoryReviewsProps {
  groupedReviews: { [key: string]: Review[] }; // Grouped reviews data
  mediaDatasets: { media: Media[] };
  restaurantDatasets: { restaurant: Restaurant[] };
  groupedReservations: { [key: number]: Reservation[] };
}

const HistoryReviews = ({
  groupedReviews,
  mediaDatasets,
  restaurantDatasets,
}: HistoryReviewsProps) => {
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
                  className="flex flex-row items-center px-4 py-2  my-5 group"
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
                    <div className="flex flex-row gap-x-3">
                      <Clock5 className="mt-1" size={24} />
                      <p className="bg-[#F2F4F7] py-1 px-1 md:px-2 rounded-md text-center">
                        {formatDate(
                          createdAtDate.toString(),
                          "id-ID",
                          false,
                          true
                        )}{" "}
                        WIB
                      </p>
                      {/* <UsersRound className="mt-[3px]" size={24} />
                      <p className="bg-[#F2F4F7] py-1 px-1 md:px-2 rounded-md text-center">
                        {review.score || "No Score"}
                      </p> */}
                    </div>
                    <div className="flex flex-row gap-x-1">
                      <p className="bg-[#DCFCE7] text-[#16A34A] inline-flex rounded-md py-1 px-2 flex-shrink-0 min-w-0 w-fit mr-3">
                        Selesai
                      </p>
                      {stars}
                    </div>
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

export default HistoryReviews;
