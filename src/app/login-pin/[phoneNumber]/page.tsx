"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const LoginPin = () => {
  const { phoneNumber } = useParams();
  const [pin, setPin] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleInputChange = (value: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Automatically move to the next input field
    if (value.length === 1 && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    // Validate PIN length
    const pinCode = pin.join("");
    if (pinCode.length !== 6) {
      setError("PIN harus terdiri dari 6 digit.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://backend-delish-app-production.up.railway.app/api/login-with-phone",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pin: pinCode,
            phone_number: phoneNumber,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal login. Coba lagi.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token);

      toast({
        title: "Log In Sukses!",
        description: `Membawa anda ke profile page...`,
        className: "bg-green-400",
        duration: 1500,
      });

      // Redirect to home page after a delay
      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[90%] sm:w-[400px]">
        <CardContent className="p-6">
          <h1 className="text-xl font-semibold text-center">
            Masukkan kode PIN
          </h1>
          <p className="text-sm text-center text-gray-500 mt-2">
            Kode PIN dibutuhkan untuk keamanan nomor HP Anda
          </p>

          <div className="flex justify-center gap-2 mt-6">
            {pin.map((value, index) => (
              <Input
                key={index}
                id={`pin-${index}`}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e.target.value, index)
                }
                style={{ appearance: "none" }}
                className="w-12 h-12 text-center text-lg font-bold no-spinner"
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4 p-4">
          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Memverifikasi...
              </span>
            ) : (
              "VERIFIKASI"
            )}
          </Button>
          <p className="text-sm text-gray-500">
            Lupa PIN Anda?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Tap disini untuk verifikasi ulang
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPin;
