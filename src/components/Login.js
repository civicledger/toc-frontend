import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomField from "./layout/CustomField";

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
          <Form className="w-full py-10 px-16 max-w-md m-auto rounded-lg border border-primary">
            <h1 className="mt-4 mb-12 text-xl font-medium text-xl text-center">
              Log In
            </h1>

            <div className="space-y-4">
              <CustomField type="email" name="email" labelText="Email" />
              <CustomField
                type="password"
                name="password"
                labelText="Password"
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="bg-gradient-to-r from-blue-400 to-blue-500 py-2 px-4 text-sm text-white rounded border border-gray-200 focus:outline-none"
                type="submit"
                disabled={props.isSubmitting}
              >
                Log In
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
