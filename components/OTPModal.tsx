"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { verifySecret, sendEmailOTP } from "@/lib/actions/user.action";

const OTPModal = ({
  accountId,
  email,
}: {
  accountId: string;
  email: string;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sessionId = await verifySecret({ accountId, password });
      if (sessionId) router.push("/");
    } catch (err) {
      // Use alert() for error
      alert("OTP yang kamu masukin salah. Coba lagi yah.");
    }

    setIsLoading(false);
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      await sendEmailOTP({ email });
      alert("OTP berhasil dikirim ulang. Cek email kamu yah.");
    } catch (err) {
      console.error("Failed to resend OTP", err);
      alert("Gagal mengirim ulang OTP. Coba lagi yah.");
    }
    setIsLoading(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">
            Masukin OTP kamu
            <Image
              src="/close.svg"
              alt="Tutup"
              width={20}
              height={20}
              onClick={() => setIsOpen(false)}
              className="otp-close-button"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            Email yang kamu masukin adalah{" "}
            <span className="pl-1 text-brand">{email}</span>, jangan lupa cek
            email kamu yah, OTP-nya udah dikirim. Kalo ga ada, coba cek spam
            atau klik tombol dibawah ini buat ngirim ulang.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot index={0} className="shad-otp-slot" />
            <InputOTPSlot index={1} className="shad-otp-slot" />
            <InputOTPSlot index={2} className="shad-otp-slot" />
            <InputOTPSlot index={3} className="shad-otp-slot" />
            <InputOTPSlot index={4} className="shad-otp-slot" />
            <InputOTPSlot index={5} className="shad-otp-slot" />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="flex flex-col w-full gap-4">
            <AlertDialogAction
              onClick={handleSubmit}
              className="shad-submit-btn h-12"
              type="button"
              disabled={isLoading} // Disable submit button while loading
            >
              Submit
              {isLoading && (
                <Image
                  src="/loader.webp"
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )}
            </AlertDialogAction>

            {/* Resend OTP button */}
            <div className="subtitle-2 mt-2 text-center text-light-100">
              Nggak dapet kode di email kamu?
              <Button
                type="button"
                variant="link"
                onClick={handleResendOTP}
                className="pl-1 text-brand"
                disabled={isLoading} // Disable button while loading
              >
                Kirim ulang
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
