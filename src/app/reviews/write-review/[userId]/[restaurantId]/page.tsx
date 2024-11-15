"use client";
import { useParams } from "next/navigation";
import HeaderNav from "@/components/created_components/HeaderNav";
import { Restaurant } from "@/lib/types/Restaurant";
import { Reservation } from "@/lib/types/Reservation";
import { formatDate } from "@/lib/utils";
import { StarRatings } from "@/components/created_components/StarRatings";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CircleArrowRight, Upload, CircleArrowLeft } from "lucide-react";
import { AutosizeTextarea } from "@/components/ui/autosized-textarea";
import { Button } from "@/components/ui/button";

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
      <main className="w-full my-5  min-h-full">
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

        <div className="bg-[#F2F4F7] px-7 pt-4 flex flex-col">
          <p className="text-start self-start py-2 font-bold">
            Bagaimana pengalaman anda?
          </p>

          <div className="flex flex-row items-center gap-8 justify-evenly w-full">
            <CircleArrowLeft
              size={48}
              className="text-[#b7bbc3] opacity-0"
              strokeWidth={0.75}
            />
            <Card className="my-6 flex flex-col items-center justify-center w-2/3 shadow-sm">
              <CardHeader className="text-center font-semibold text-lg text-[#667085]">
                Makanan
              </CardHeader>
              <CardContent className="flex flex-row items-center justify-center gap-y-6">
                <StarRatings
                  rating={0}
                  totalStars={5}
                  size={48}
                  variant="default"
                  disabled={false}
                  disableHover={true}
                  onRatingChange={handleOverallRatingChange}
                  starGap={1}
                />
              </CardContent>
              <CardFooter>
                <div className="inline-flex flex-shrink-0 min-w-0 w-fit flex-wrap gap-y-2 gap-x-3 justify-center items-center text-center text-sm">
                  <p className="basis-[75%] bg-[#F2F4F7] p-2 rounded-md text-nowrap">
                    Sangat Direkomendasikan
                  </p>
                  <p className="basis-1/4 bg-[#F2F4F7] p-2 rounded-md text-nowrap">
                    Sangat Enak
                  </p>
                  <p className="basis-1/4 bg-[#F2F4F7] p-2 text-nowrap rounded-md">
                    Istimewa
                  </p>
                </div>
              </CardFooter>
            </Card>
            <CircleArrowRight
              size={48}
              className="text-[#b7bbc3]"
              strokeWidth={0.75}
            />
          </div>
        </div>
        <div className="p-6">
          <AutosizeTextarea
            className="p-3"
            placeholder="Beritahu kami lebih lanjut"
            minHeight={100}
            maxHeight={300}
          ></AutosizeTextarea>
        </div>
        <div className="flex flex-row text-center gap-x-3 mx-6 p-2 border border-black/20 w-1/4 justify-center rounded-md shadow-sm text-sm">
          <Upload />
          <p>Unggah</p>
        </div>
        <div className="text-sm mx-6 mb-8 mt-2 text-[#667085]">
          Unggah Foto &lt; 5MB atau Video &lt; 75MB
        </div>
        <div className="border border-x-0 border-b-0 py-4">
          <Button className="flex justify-center items-center mx-auto w-11/12 rounded-xl p-5 text-base bg-black/90">
            Kirim
          </Button>
        </div>
      </main>
    </>
  );
};

export default WriteReviewPage;
