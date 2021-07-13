import React from "react";
import { ErrorMessage, Formik, Form, Field } from "formik";
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
          <Form className="w-full max-w-md m-auto bg-white rounded-lg border border-primary py-10 px-16">
            <h1 className="text-xl font-medium text-xl mt-4 mb-12 text-center">
              Log in to your account
            </h1>

            <Field
              className="w-full p-2 border rounded-md outline-none text-sm"
              type="email"
              name="email"
              placeholder="Your Email"
            />
            <ErrorMessage
              className="text-xs text-red-700"
              component="p"
              name="email"
            />

            <Field
              className="w-full p-2 border rounded-md outline-none text-sm mt-4"
              type="password"
              name="password"
              placeholder="Your Password"
            />
            <ErrorMessage
              className="text-xs text-red-700"
              component="p"
              name="password"
            />

            <div className="flex justify-center items-center mt-6">
              <button
                className="bg-gradient-to-r from-blue-400 to-blue-500 py-2 px-4 text-sm text-white rounded border border-gray-200 focus:outline-none"
                type="submit"
                disabled={props.isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
