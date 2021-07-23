import { useState } from "react";
import Dropzone from "react-dropzone";
import { useHistory } from "react-router-dom";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as Yup from "yup";

import CompanyService from "../services/CompanyService";

const companyService = new CompanyService();

const companyTypes = {
  1: "Company",
  2: "Community group",
  3: "Government agency",
  4: "Investor",
  5: "NFP",
  6: "Multinational company",
};

const CompanyForm = () => {
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
          setSuccess(false);
          setFormErrors([]);

          companyService
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
              const errors = response.data.errors.map(
                (error) => error.field + ": " + error.message
              );
              setFormErrors(errors);
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {(props) => {
          return (
            <Form className="w-full py-10 px-16 max-w-md m-auto rounded-lg border border-primary">
              <h1 className="mt-4 mb-2 text-xl font-medium text-xl text-center">
                Create Entity
              </h1>

              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <Field className="mt-1" id="name" name="name" type="text" />
                  <ErrorMessage
                    className="py-1 text-xs text-red-700"
                    component="p"
                    name="name"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <Field
                    className="mt-1"
                    name="description"
                    id="description"
                    as="textarea"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="name"
                  >
                    Logo
                  </label>
                  <Dropzone
                    onDrop={(acceptedFiles) => console.log(acceptedFiles)}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section className="bg-gray-100 p-10 text-center border-dashed border-2">
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>Drop some files here, or click to select files</p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type
                  </label>
                  <Field className="mt-1" as="select" id="type" name="type">
                    {Object.entries(companyTypes).map(([value, name]) => {
                      return (
                        <option key={value} value={value}>
                          {name}
                        </option>
                      );
                    })}
                  </Field>
                </div>

                {success && (
                  <div className="p-1 text-sm text-green-900">
                    Successfully created an Entity, sending you to Entity page.
                  </div>
                )}
                {!success && formErrors.length > 0 && (
                  <div className="p-1 text-sm text-red-900">{formErrors}</div>
                )}
              </div>

              <div className="flex justify-center mt-6">
                <button
                  className="bg-gradient-to-r from-blue-400 to-blue-500 py-2 px-4 text-sm text-white rounded border border-gray-200 focus:outline-none"
                  type="submit"
                  disabled={props.isSubmitting}
                >
                  Save
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CompanyForm;
