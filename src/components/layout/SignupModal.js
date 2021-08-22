import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { UserAddIcon, CloudUploadIcon } from '@heroicons/react/outline';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Dropzone from 'react-dropzone';

import { authService, documentService } from '../../services';

const SignupModal = ({ open = false, setOpen, openOther }) => {
  const [success, setSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);

  const cancelButtonRef = useRef(null);

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
                      Sign Up For Placelink
                    </Dialog.Title>
                    <hr className="mt-3" />
                    <Formik
                      initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                      }}
                      validationSchema={Yup.object({
                        name: Yup.string().required('Your name is a required field'),
                        email: Yup.string().email('Invalid email address').required('Your email address is required'),
                        password: Yup.string().required('A valid password is required'),
                        confirmPassword: Yup.string()
                          .oneOf([Yup.ref('password'), null], 'Password must match')
                          .required('Confirm password is required'),
                      })}
                      onSubmit={(values, actions) => {
                        actions.setSubmitting(true);
                        authService
                          .signup(values)
                          .then(() => {
                            setSuccess(true);
                            setUploadedFile(false);
                            actions.resetForm();
                            setTimeout(() => {
                              setOpen(false);
                              openOther(true);
                            }, 5000);
                          })
                          .catch(({ response }) => {
                            const errors = response.data.errors.map(error => error.message);
                            setFormErrors(errors);
                          })
                          .finally(() => {
                            actions.setSubmitting(false);
                          });
                      }}
                    >
                      {props => (
                        <Form>
                          <div className="mt-5">
                            {success && (
                              <div className="p-3 text-sm text-green-600 border border-green-600 bg-green-100 rounded mb-3">
                                Successfully signed up. You can now log in using your newly created credentials.
                              </div>
                            )}

                            {!success && formErrors.length > 0 && <div className="p-1 text-sm text-red-900">{formErrors}</div>}

                            <div className="mb-5">
                              <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
                                Name
                              </label>
                              <Field type="text" name="name" placeholder="Name" />
                              <ErrorMessage component="p" name="name" className="text-red-500 text-sm mx-2 mt-1" />
                            </div>

                            <div className="mb-5">
                              <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
                                Email
                              </label>
                              <Field type="email" name="email" placeholder="Email" autoComplete="placelink-email" />
                              <ErrorMessage component="p" name="email" className="text-red-500 text-sm mx-2 mt-1" />
                            </div>

                            <div className="mb-5">
                              <label htmlFor="password" className="block font-medium text-gray-700 mb-1">
                                Password
                              </label>
                              <Field type="password" name="password" placeholder="Password" autoComplete="placelink-signup-password" />
                              <ErrorMessage component="p" name="password" className="text-red-500 text-sm mx-2 mt-1" />
                            </div>

                            <div className="mb-5">
                              <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
                                Confirm Password
                              </label>
                              <Field
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                autoComplete="placelink-confirm-password"
                              />
                              <ErrorMessage component="p" name="confirmPassword" className="text-red-500 text-sm mx-2 mt-1" />
                            </div>
                          </div>

                          <div className="mb-5">
                            <label htmlFor="logo" className="block font-medium text-gray-700 mb-1">
                              Image
                            </label>
                            {!uploadedFile && (
                              <Dropzone
                                onDrop={async ([file]) => {
                                  const request = await documentService.upload({
                                    title: file.name,
                                    type: 'user',
                                    document: file,
                                  });

                                  const data = await request.json();
                                  setUploadedFile(data);
                                  props.setFieldValue('avatar', data.location);
                                }}
                              >
                                {({ getRootProps, getInputProps }) => (
                                  <section className="bg-gray-100 p-10 text-center border-dashed border-2">
                                    <div {...getRootProps()}>
                                      <input {...getInputProps()} />

                                      <p className="text-gray-600">
                                        <CloudUploadIcon className="w-14 float-left" />
                                        Drop some files here, or click to select files
                                      </p>
                                    </div>
                                  </section>
                                )}
                              </Dropzone>
                            )}
                            {uploadedFile && (
                              <div className="border p-2">
                                File <span className="font-mono text-gray-800 text-sm bg-gray-200 p-1">{uploadedFile.title}</span> uploaded
                              </div>
                            )}
                          </div>

                          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                              type="submit"
                              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              <UserAddIcon className="w-5 inline-block mr-2" /> Sign Up
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
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default SignupModal;
