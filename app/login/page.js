"use client";

import { useState } from "react";

import { useAppSelector, useAppDispatch, useAppStore } from "@/libs/hook";
import { loginUser } from "@/libs/features/authSlice";

import { useRouter } from "next/navigation";
import Image from "next/image";
import HeroImage from "@/public/Images/hero-image.jpg";

import { Input } from "antd";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    // console.log("Email:", email);
    // console.log("Password:", password);

    dispatch(loginUser({ email: email, password: password }));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-screen grid grid-cols-2 bg-gray-50">
      <div className="h-full flex flex-col justify-center gap-16 max-w-lg mx-auto">
        <div>
          <h1 className="font-semibold text-5xl mb-4">
            HOME CHILDREN LEARNING CENTER
          </h1>
          <h5 className="text-2xl max-w-md font-normal">
            Belajar dengan riang, untuk masa depan yang gemilang
          </h5>
        </div>

        <form
          action=""
          className="max-w-md flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            {/* <label htmlFor="email">Email</label> */}
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="large"
              placeholder="Username"
              required
            />
          </div>
          <div>
            {/* <label htmlFor="password">Password</label> */}
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              size="large"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white w-full h-10 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>

      <div className="bg-black h-full relative">
        <Image
          src={HeroImage}
          alt="Logo"
          className="h-full object-cover object-right"
        />
        <div className="bg-black opacity-45 absolute top-0 right-0 left-0 bottom-0"></div>
      </div>
    </div>
  );
};

export default LoginPage;
