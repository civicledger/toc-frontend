import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import CustomField from "./layout/CustomField";
import AuthService from "../services/AuthService";

const authService = new AuthService();

const Signup = () => {
  const history = useHistory();
  const [success, setSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState([]);

  return (
    <div className="flex min-h-screen">
      <Formik
        initialValues={{
          email: "",
          password: "",
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
        })}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          authService
            .signup(values.email, values.password, values.confirmPassword)
            .then(() => {
              setSuccess(true);
              setTimeout(() => {
                actions.resetForm();
                history.push("/login");
              }, 3000);
            })
            .catch(({ response }) => {
              const errors = response.data.errors.map((error) => error.message);
              setFormErrors(errors);
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {(props) => (
          <Form className="w-full py-10 px-16 max-w-md m-auto rounded-lg border border-primary">
            <h1 className="mt-4 mb-12 text-xl font-medium text-xl text-center">
              Sign Up
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
            </div>

            {success && (
              <div className="p-1 text-sm text-green-900">
                Successfully signed up. Sending you to login page.
              </div>
            )}

            {!success && formErrors.length > 0 && (
              <div className="p-1 text-sm text-red-900">{formErrors}</div>
            )}

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
