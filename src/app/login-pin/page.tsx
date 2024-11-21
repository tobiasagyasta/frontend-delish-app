"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const LoginPin = () => {
  const [pin, setPin] = useState(Array(6).fill(""));

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[90%] sm:w-[400px]">
        <CardContent className="p-6">
          <h1 className="text-xl font-semibold text-center">Masukkan kode PIN</h1>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, index)}
                style={{ appearance: "none" }} 
                className="w-12 h-12 text-center text-lg font-bold no-spinner"
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4 p-4">
          <Button className="w-full">VERIFIKASI</Button>
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
