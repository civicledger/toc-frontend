/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { useQuery } from 'react-query';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { companyService } from '../../services/CompanyService';
import { newCompanyValidation } from '../../utilities/validations';
import { placesQuery } from '../../utilities/queries';
import Dropzone from 'react-dropzone';

const companyTypes = {
  1: 'Company',
  2: 'Community group',
  3: 'Government agency',
  4: 'Investor',
  5: 'NFP',
  6: 'Multinational company',
};

const NewCompanyModal = () => {
  const [success, setSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const cancelButtonRef = useRef(null);

  const { data: places = [] } = useQuery('places', placesQuery, { keepPreviousData: true });

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} open={open} onClose={setOpen}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      New Entity
                    </Dialog.Title>

                    <hr className="mt-3" />

                    <Formik
                      initialValues={{ name: '', description: '', placeId: '', type: '', logo: '' }}
                      validationSchema={newCompanyValidation}
                      onSubmit={(values, actions) => {
                        actions.setSubmitting(true);
                        companyService
                          .create(values)
                          .then(({ data }) => {
                            setSuccess(true);
                            history.push(`/entities/${data.id}`);
                            actions.resetForm();
                            setOpen(false);
                          })
                          .catch(({ response }) => {
                            if (!response.data.errors) return;
                            const errors = response.data.errors.map(error => error.field + ': ' + error.message);
                            setFormErrors(errors);
                          })
                          .finally(() => {
                            actions.setSubmitting(false);
                          });
                      }}
                    >
                      {props => {
                        return (
                          <Form>
                            <div className="mt-3">
                              <div className="mb-5">
                                <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
                                  Entity Name
                                </label>
                                <Field type="text" name="name" />
                                {!props.errors.name && <p className="text-gray-600 text-sm mt-1 mx-2">Provide a name to identify your Entity</p>}
                                <ErrorMessage component="p" name="name" className="text-red-500 text-sm mx-2 mt-1" />
                              </div>
                              <div className="mb-5">
                                <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
                                  Description
                                </label>
                                <Field as="textarea" type="textarea" name="description" />
                                {!props.errors.description && (
                                  <p className="text-gray-600 text-sm mt-1 mx-2">Describe your Entity for anyone interested</p>
                                )}
                                <ErrorMessage component="p" name="description" className="text-red-500 text-sm mx-2 mt-1" />
                              </div>

                              <div className="mb-5">
                                <label htmlFor="type" className="block font-medium text-gray-700 mb-1">
                                  Type
                                </label>

                                <Field as="select" name="type">
                                  <option value="">Select an Entity type</option>
                                  {Object.entries(companyTypes).map(([value, name]) => (
                                    <option key={value} value={value}>
                                      {name}
                                    </option>
                                  ))}
                                </Field>
                                {!props.errors.type && <p className="text-gray-600 text-sm mt-1 mx-2">Set type for your Entity</p>}
                                <ErrorMessage component="p" name="type" className="text-red-500 text-sm mx-2 mt-1" />
                              </div>

                              <div className="mb-5">
                                <label htmlFor="place" className="block font-medium text-gray-700 mb-1">
                                  Location
                                </label>
                                <Field as="select" name="placeId">
                                  <option value="">Select a place</option>
                                  {places.map(place => (
                                    <option key={place.id} value={place.id}>
                                      {place.name}
                                    </option>
                                  ))}
                                </Field>
                                {!props.errors.placeId && <p className="text-gray-600 text-sm mt-1 mx-2">Set place for your Entity</p>}
                                <ErrorMessage component="p" name="placeId" className="text-red-500 text-sm mx-2 mt-1" />
                              </div>

                              <div className="mb-5">
                                <label htmlFor="logo" className="block font-medium text-gray-700 mb-1">
                                  Logo
                                </label>
                                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                                  {({ getRootProps, getInputProps }) => (
                                    <section className="bg-gray-100 p-10 text-center border-dashed border-2 rounded-lg">
                                      <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drop some files here, or click to select files</p>
                                      </div>
                                    </section>
                                  )}
                                </Dropzone>
                                {!props.errors.logo && <p className="text-gray-600 text-sm mt-1 mx-2">Set logo for your Entity</p>}
                                <ErrorMessage component="p" name="placeId" className="text-red-500 text-sm mx-2 mt-1" />
                              </div>
                            </div>
                            <hr />

                            {!success && formErrors.length > 0 && (
                              <div className="grid justify-items-stretch">
                                <div className="p-1 text-red-900 justify-self-center">{formErrors}</div>
                              </div>
                            )}

                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                              <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                <PlusCircleIcon className="w-5 inline-block mr-2" /> Create Entity
                              </button>
                              <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                onClick={e => {
                                  e.preventDefault();
                                  setOpen(false);
                                }}
                                ref={cancelButtonRef}
                              >
                                Cancel
                              </button>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div>
        <button className="mt-3 bg-indigo-500 p-2 px-4 text-white rounded hover:bg-indigo-600" onClick={() => setOpen(true)}>
          <PlusCircleIcon className="w-5 inline-block mr-2" /> Create new Entity
        </button>
      </div>
    </>
  );
};

export default NewCompanyModal;
