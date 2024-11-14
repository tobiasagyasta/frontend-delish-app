"use client";
import { useParams } from "next/navigation";
import HeaderNav from "@/components/created_components/HeaderNav";
import { Restaurant } from "@/lib/types/Restaurant";
import { Reservation } from "@/lib/types/Reservation";
import { formatDate } from "@/lib/utils";
import { StarRatings } from "@/components/created_components/StarRatings";
import { useState } from "react";

const WriteReviewPage = () => {
  const { userId, restaurantId } = useParams();
  const restaurantDatasets: {
    restaurant: Restaurant[];
  } = require("../../../../../lib/datasets/restaurant.json");
  const reservationDatasets: {
    reservation: Reservation[];
  } = require("../../../../../lib/datasets/reservation.json");
  const [overallRating, setOverallRating] = useState<number>(0);

  const handleOverallRatingChange = (newRating: number) => {
    setOverallRating(newRating);
  };

  const restaurantIdStr = Array.isArray(restaurantId)
    ? restaurantId[0]
    : restaurantId;
  const userIdStr = Array.isArray(userId) ? userId[0] : userId;

  const completedReservations = reservationDatasets.reservation.filter(
    (res) => res.reservation_status === "completed"
  );
  const reservation = completedReservations.find(
    (res) =>
      res.user_id === parseInt(userIdStr || "") &&
      res.restaurant_id === parseInt(restaurantIdStr || "") &&
      res.reservation_status === "completed"
  );

  const restaurant = restaurantIdStr
    ? restaurantDatasets.restaurant.find(
        (restaurant) => restaurant.id === parseInt(restaurantIdStr)
      )
    : null;

  return (
    <>
      <HeaderNav name="Tulis Ulasan" link="reviews"></HeaderNav>
      <main className="w-full mt-5">
        <div className="text-base flex flex-col md:flex-row justify-between items-center  px-7 ">
          <span className="font-medium">Restoran : {restaurant?.name}</span>
          <span>
            {reservation?.created_at
              ? formatDate(reservation?.created_at, undefined, true)
              : null}
          </span>
        </div>
        <div className="flex flex-col justify-center items-center my-8 p-4 gap-y-2">
          <StarRatings
            rating={0}
            totalStars={5}
            size={48}
            variant="default"
            disabled={false}
            disableHover={true}
            onRatingChange={handleOverallRatingChange}
            starGap={2}
          />
          <p>Berikan penilaian secara keseluruhan</p>
        </div>
      </main>
    </>
  );
};

export default WriteReviewPage;
