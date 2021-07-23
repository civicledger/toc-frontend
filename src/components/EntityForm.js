import { useState } from "react";
import Dropzone from "react-dropzone";
import { useHistory } from "react-router-dom";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as Yup from "yup";

import EntityService from "../services/EntityService";

const entityService = new EntityService();

const entityTypes = {
  1: "Company",
  2: "Community group",
  3: "Government agency",
  4: "Investor",
  5: "NFP",
  6: "Multinational company",
};

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
              console.log(data);
              setSuccess(true);
              actions.resetForm();
              setTimeout(() => {
                console.log("Here... ... ...");
                history.push(`/entities/${data.id}`);
              }, 3000);
            })
            .catch(({ response }) => {
              if (!response.data.errors) return;
              const errors = response.data.errors.map(
                (error) => error.message + " for " + error.field
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
            <Form className="w-full py-10 px-16 max-w-md m-auto rounded-lg border border-primary space-y-6">
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
                  <Field id="name" name="name" type="text"></Field>
                </div>
                <ErrorMessage
                  className="py-1 text-xs text-red-700"
                  component="p"
                  name="name"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div className="mt-1">
                  <Field
                    name="description"
                    id="description"
                    as="textarea"
                  ></Field>
                </div>
              </div>
              <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <section className="bg-gray-100 p-10 text-center border-dashed border-2">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Drop some files here, or click to select files</p>
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
                  <Field as="select" id="type" name="type">
                    {Object.entries(entityTypes).map(([value, name]) => {
                      return (
                        <option key={value} value={value}>
                          {name}
                        </option>
                      );
                    })}
                  </Field>
                </div>
              </div>

              {success && (
                <div className="p-1 text-sm text-green-900">
                  Successfully created an Entity, sending you to dashboard.
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

export default EntityForm;
