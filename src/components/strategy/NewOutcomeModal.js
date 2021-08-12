import { Fragment, useRef, useState } from 'react';
import { useQueryClient, useQuery } from 'react-query';
import { Dialog, Transition } from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import classNames from 'classnames';

import { goalsQuery } from '../../utilities/queries';
import { outcomeService } from '../../services/OutcomeService';
import { newOutcomeValidation } from '../../utilities/validations';

const NewOutcomeModal = ({ strategy }) => {
  const [open, setOpen] = useState(false);
  const [goalId, setGoalId] = useState(0);

  const cancelButtonRef = useRef(null);
  const queryClient = useQueryClient();

  const { data: goals } = useQuery('goals', goalsQuery, { keepPreviousData: true });

  if (!strategy) return '';
  const buttonClass = classNames('mt-3 p-2 px-4 text-white rounded', {
    'bg-indigo-500 hover:bg-indigo-600': true,
  });
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
                <div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      New Outcome for {strategy.name}
                    </Dialog.Title>

                    <hr className="mt-3" />

                    <Formik
                      initialValues={{ name: '', description: '', targetId: 0, goalId: 0, strategyId: strategy.id }}
                      validationSchema={newOutcomeValidation}
                      onSubmit={(values, actions) => {
                        outcomeService
                          .create(values)
                          .then(() => {
                            queryClient.invalidateQueries(['strategies', strategy.id]);
                            actions.resetForm();
                            setOpen(false);
                          })
                          .catch(error => {
                            console.log(error);
                          });
                      }}
                    >
                      {props => {
                        return (
                          <Form>
                            <div className="mt-3">
                              <div className="mb-5">
                                <label htmlFor="username" className="block font-medium text-gray-700 mb-1">
                                  Outcome Name
                                </label>
                                <Field type="text" name="name" />
                                {!props.errors.name && <p className="text-gray-600 text-sm mt-1 mx-2">Provide a name to describe this outcome</p>}
                                <ErrorMessage component="p" name="name" className="text-red-500 text-sm mx-2" />
                              </div>
                              <div className="mb-5">
                                <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
                                  Description
                                </label>
                                <Field as="textarea" type="textarea" name="description" />
                                {!props.errors.description && (
                                  <p className="text-gray-600 text-sm mt-1 mx-2">Describe this outcome for anyone reading</p>
                                )}
                                <ErrorMessage component="p" name="description" className="text-red-500 text-sm mx-2" />
                              </div>
                              <div className="mb-5">
                                <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
                                  SDG Target
                                </label>
                                <select
                                  name="goal"
                                  className="mb-2"
                                  onChange={e => {
                                    props.setFieldValue('goalId', e.target.value);
                                    setGoalId(e.target.value);
                                  }}
                                >
                                  <option value="">Select a goal first</option>
                                  {goals.map(goal => (
                                    <option value={goal.id} key={goal.id}>
                                      {goal.id} - {goal.name}
                                    </option>
                                  ))}
                                </select>
                                {goalId !== 0 && (
                                  <select name="targetId" onChange={e => props.setFieldValue('targetId', e.target.value)}>
                                    <option value="">Select a goal first</option>
                                    {goals[goalId].targets.map(target => (
                                      <option value={target.id} key={target.id}>
                                        {goalId}.{target.number}
                                      </option>
                                    ))}
                                  </select>
                                )}
                                {!props.errors.targetId && <p className="text-gray-600 text-sm mt-1 mx-2">What UN SDG target is this outcome for?</p>}
                                <ErrorMessage component="p" name="targetId" className="text-red-500 text-sm mx-2" />
                              </div>
                            </div>
                            <hr />
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                              <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                <PlusCircleIcon className="w-5 inline-block mr-2" /> Create Outcome
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
        <button className={buttonClass} onClick={() => setOpen(true)}>
          <PlusCircleIcon className="w-5 inline-block mr-2" /> Create new Outcome
        </button>
      </div>
    </>
  );
};

export default NewOutcomeModal;
