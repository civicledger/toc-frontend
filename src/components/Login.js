import { useContext, useState } from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { ACTIONS, LoginContext } from "../utilities/reducers";
import CustomField from "./layout/CustomField";
import AuthService from "../services/AuthService";

const authService = new AuthService();

const Login = () => {
  const { dispatch } = useContext(LoginContext);
  const [success, setSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState([]);

  const history = useHistory();

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
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          authService
            .logIn(values.email, values.password)
            .then((response) => {
              setSuccess(true);
              setTimeout(() => {
                dispatch({
                  type: ACTIONS.SET_USER,
                  payload: { ...response.data, loggedIn: true },
                });
                authService.saveUser(response.data);

                actions.resetForm();
                history.push("/");
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

            {success && (
              <div className="p-1 text-sm text-green-900">
                Successfully logged in, sending you to dashboard.
              </div>
            )}

            {!success && formErrors.length > 0 && (
              <div className="p-1 text-sm text-red-900">{formErrors}</div>
            )}

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
