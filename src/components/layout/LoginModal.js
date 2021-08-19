import { Fragment, useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { LoginIcon } from '@heroicons/react/outline';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { ACTIONS, LoginContext } from '../../utilities/reducers';
import { authService } from '../../services';

const NewCompanyModal = () => {
  const { dispatch } = useContext(LoginContext);
  const [success, setSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const [open, setOpen] = useState(false);

  const history = useHistory();

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
                      Log Into Placelink
                    </Dialog.Title>
                    <hr className="mt-3" />
                    <Formik
                      initialValues={{ email: '', password: '' }}
                      validationSchema={Yup.object({
                        email: Yup.string().email('Invalid email address').required('You must enter your email address'),
                        password: Yup.string().required('You must enter a password'),
                      })}
                      onSubmit={(values, actions) => {
                        actions.setSubmitting(true);
                        authService
                          .logIn(values.email, values.password)
                          .then(response => {
                            setSuccess(true);
                            setTimeout(() => {
                              dispatch({
                                type: ACTIONS.SET_USER,
                                payload: { ...response.data, loggedIn: true },
                              });
                              authService.saveUser(response.data);

                              actions.resetForm();
                              history.push('/');
                            }, 3000);
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
                          <div className="mt-3">
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
                              <Field type="password" name="password" placeholder="Password" autoComplete="placelink-password" />
                              <ErrorMessage component="p" name="password" className="text-red-500 text-sm mx-2 mt-1" />
                            </div>

                            {/* <CustomField type="email" name="email" labelText="Email" />
                            <CustomField type="password" name="password" labelText="Password" /> */}
                          </div>

                          {success && <div className="p-1 text-sm text-green-900">Successfully logged in, sending you to dashboard.</div>}

                          {!success && formErrors.length > 0 && <div className="p-1 text-sm text-red-900">{formErrors}</div>}

                          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                              type="submit"
                              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              <LoginIcon className="w-5 inline-block mr-2" /> Log In
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
      <div>
        <button className="mt-3 bg-indigo-500 p-2 px-4 text-white rounded hover:bg-indigo-600" onClick={() => setOpen(true)}>
          <LoginIcon className="w-5 inline-block mr-2" /> Log In
        </button>
      </div>
    </>
  );
};

export default NewCompanyModal;
