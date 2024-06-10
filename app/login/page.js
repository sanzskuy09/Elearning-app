"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Input } from "antd";

import { useAppSelector, useAppDispatch, useAppStore } from "@/libs/hook";
import { loginUser, loginUserAsync } from "@/libs/features/authSlice";

import HeroImage from "@/public/Images/hero-image.jpg";
import { toastFailed, toastSuccess } from "@/utils/toastify";
import { API, URL } from "@/config/api";

// hook form
import { Formik } from "formik";
import * as Yup from "yup";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(3, "Must be 3 characters or then")
          .required("Required"),
        password: Yup.string()
          .min(8, "Must be 8 characters or then")
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(values),
          });

          if (!response.ok) {
            throw new Error("Failed to log in");
          }

          const data = await response.json();
          dispatch(loginUser(data.data));

          localStorage.setItem("token", data.data.token);
          localStorage.setItem("nama_panggilan", data.data.user.nama_panggilan);
          localStorage.setItem("email", data.data.user.email);

          setTimeout(() => {
            setSubmitting(false);
            resetForm();
            toastSuccess("Login Success");
            router.push("/dashboard");
          }, 400);
        } catch (error) {
          toastFailed("Username or Password is wrong");
          // console.log(error);
        }
      }}
    >
      {(formik) => (
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
              onSubmit={formik.handleSubmit}
            >
              <div>
                <Input
                  size="large"
                  placeholder="Username"
                  required
                  {...formik.getFieldProps("username")}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-600">{formik.errors.username}</div>
                ) : null}
              </div>
              <div>
                <Input
                  type="password"
                  size="large"
                  placeholder="Password"
                  required
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-600">{formik.errors.password}</div>
                ) : null}
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
      )}
    </Formik>
  );
};

export default LoginPage;
