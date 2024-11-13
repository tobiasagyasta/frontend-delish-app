import { OverallReview } from "@/lib/types/OverallReview";
import { Reservation } from "@/lib/types/Reservation";
import { Media } from "@/lib/types/Media";
import { Restaurant } from "@/lib/types/Restaurant";
import { Clock5, UsersRound } from "lucide-react";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

interface PendingReviewsProps {
  groupedReviews: { [key: string]: OverallReview[] };
  groupedReservations: { [key: number]: Reservation[] };
  mediaDatasets: { media: Media[] };
  restaurantDatasets: { restaurant: Restaurant[] };
}

const PendingReviews = ({
  groupedReviews,
  groupedReservations,
  mediaDatasets,
  restaurantDatasets,
}: PendingReviewsProps) => {
  return (
    <div className="mb-10">
      {Object.keys(groupedReviews).map((date) => (
        <div key={date} className="py-4 border-b-2">
          <h3 className="text-xl font-semibold px-4">{formatDate(date)}</h3>
          {groupedReviews[date].map((review) => {
            const reservation = groupedReservations[review.restaurant_id]?.[0];
            const reviewMedia = mediaDatasets.media.find(
              (media) => media.overall_id === review.restaurant_id
            );
            const restaurant = restaurantDatasets.restaurant.find(
              (restaurant) => restaurant.id === review.restaurant_id
            );

            if (reservation) {
              return (
                <div
                  key={review.id}
                  className="flex flex-row items-center px-4 py-2"
                >
                  {reviewMedia && (
                    <div className="flex gap-2 mt-4">
                      <Image
                        key={reviewMedia.id}
                        src={
                          reviewMedia.location || "https://placehold.co/600x400"
                        }
                        alt={`Media for Review ${review.restaurant_id}`}
                        className="w-32 h-32 object-cover rounded-xl shadow-sm"
                        width={400}
                        height={400}
                      />
                    </div>
                  )}
                  <div className="flex flex-col ml-5 gap-y-5">
                    <p className="font-bold">{restaurant?.name}</p>
                    <div className="flex flex-row gap-x-3">
                      <Clock5 className="mt-1" size={24} />
                      <p className="bg-[#F2F4F7] py-1 px-2 rounded-md">
                        {reservation.reservation_time
                          .replace(/:(\d{2})/, ".$1")
                          .replace(/:00$/, "")}{" "}
                        WIB
                      </p>
                      <UsersRound className="mt-[3px]" size={24} />
                      <p className="bg-[#F2F4F7] py-1 px-2 rounded-md">
                        {reservation.number_of_people} Orang
                      </p>
                    </div>
                    <p className="bg-warning-secondary text-warning-primary inline-flex rounded-md py-1 px-2 flex-shrink-0 min-w-0 w-fit">
                      Menunggu Ulasan
                    </p>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
};

export default PendingReviews;
