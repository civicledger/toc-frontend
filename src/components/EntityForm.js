import { useState } from "react";
import Dropzone from "react-dropzone";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import CustomField from "./layout/CustomField";
import EntityService from "../services/EntityService";

const entityService = new EntityService();

const EntityForm = () => {
  const [success, setSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  return (
    <div className="flex min-h-screen">
      <Formik
        initialValues={{
          name: "",
          description: "",
          logo: "",
          type: 1,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Entity name is required"),
          type: Yup.string().required("You must select an Entity type"),
        })}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          setFormErrors([]);

          entityService
            .create(values)
            .then(({ data }) => {
              setSuccess(true);
              actions.resetForm();
              setTimeout(() => {
                history.push(`/entities/${data.id}`);
              }, 3000);
            })
            .catch(({ response }) => {
              if (!response.data.errors) return;
              const errors = response.data.errors.map((error) => error.message);
              setFormErrors(errors);
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {(props) => {
          return (
            <form className="w-full py-10 px-16 max-w-md m-auto rounded-lg border border-primary space-y-6">
              <h1 className="mt-4 mb-2 text-xl font-medium text-xl text-center">
                Create Entity
              </h1>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input id="name" name="name" type="text"></input>
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea id="description" name="description"></textarea>
                </div>
              </div>

              <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <section className="bg-gray-100 p-10 text-center border-dashed border-2">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />

                      <p>
                        <i className="fal fa-file-upload mr-2"></i>Drop some
                        files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <div className="mt-1">
                  <select id="name" name="name" type="text">
                    <option value=""> Please select</option>
                  </select>
                </div>
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
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EntityForm;
