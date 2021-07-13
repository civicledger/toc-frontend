import React from "react";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
  return (
    <div className="flex min-h-screen">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
        }}
      >
        {(props) => (
          <form
            className="w-full max-w-md m-auto bg-white rounded-lg border border-primary py-10 px-16"
            onSubmit={props.handleSubmit}
          >
            <h1 className="text-xl font-medium text-primary mt-4 mb-12 text-center">
              Log in to your account
            </h1>

            {props.errors.email && (
              <ErrorMessage
                className="text-xs text-red-700"
                component="p"
                name="email"
              />
            )}
            <input
              className="w-full p-2 text-primary border rounded-md outline-none text-sm mb-4"
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.email}
            />

            {props.errors.password && (
              <ErrorMessage
                className="text-xs text-red-700"
                component="p"
                name="password"
              />
            )}
            <input
              className="w-full p-2 text-primary border rounded-md outline-none text-sm mb-4"
              type="password"
              name="password"
              placeholder="Your Password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.password}
            />

            <div className="flex justify-center items-center mt-6">
              <button
                className="bg-gradient-to-r from-blue-400 to-blue-500 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark"
                type="submit"
                disabled={props.isSubmitting}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
