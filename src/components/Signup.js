import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomField from "./layout/CustomField";

const Signup = () => {
  return (
    <div className="flex min-h-screen">
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          company: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string().required("Required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Password must match")
            .required("Confirm password is required"),
          name: Yup.string().required("Name is required"),
          company: Yup.string().required("Company is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
        }}
      >
        {(props) => (
          <Form className="w-full py-10 px-16 max-w-md m-auto rounded-lg border border-primary">
            <h1 className="mt-4 mb-12 text-xl font-medium text-xl text-center">
              Sign up
            </h1>
            <div className="space-y-4">
              <CustomField type="email" name="email" labelText="Email" />
              <CustomField
                type="password"
                name="password"
                labelText="Password"
              />
              <CustomField
                type="password"
                name="confirmPassword"
                labelText="Confirm password"
              />
              <CustomField type="text" name="name" labelText="Name" />
              <CustomField type="text" name="company" labelText="Company" />
            </div>

            <div className="mt-6 flex justify-center">
              <button
                className="py-2 px-4 bg-gradient-to-r from-blue-400 to-blue-500 text-sm text-white rounded border border-gray-200 focus:outline-none"
                type="submit"
                disabled={props.isSubmitting}
              >
                Sign Up
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
