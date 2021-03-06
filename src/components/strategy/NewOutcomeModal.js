import { Fragment, useRef, useState } from 'react';
import { useQueryClient, useQuery } from 'react-query';
import { Dialog, Transition } from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import classNames from 'classnames';
import Select from 'react-select';

import { goalsQuery } from '../../utilities/queries';
import { outcomeService } from '../../services/OutcomeService';
import { newOutcomeValidation } from '../../utilities/validations';

const NewOutcomeModal = ({ strategy, open, setOpen }) => {
  const [goalId, setGoalId] = useState(0);
  const [useFramework, setUseFramework] = useState(true);

  const baseTabClasses = 'bg-gray-50 p-4 py-3 border border-gray-400 cursor-pointer';
  const leftTabClass = classNames(`${baseTabClasses} border-r-0 rounded-l-lg`, {
    'bg-gray-400 text-white': useFramework,
  });
  const rightTabClass = classNames(`${baseTabClasses} rounded-r-lg`, {
    'bg-gray-400 text-white': !useFramework,
  });

  const cancelButtonRef = useRef(null);
  const queryClient = useQueryClient();

  const { data: goals } = useQuery('goals', goalsQuery, { keepPreviousData: true });

  if (!strategy || !goals) return '';

  const groupedTargets = goals.map(goal => {
    return {
      id: goal.id,
      value: goal.id,
      label: `SDG ${goal.id} ${goal.name}`,
      description: goal.description,
      options: goal.targets.map(target => ({
        label: `SDG ${goal.id}.${target.number} ${target.name}`,
        description: target.description,
        value: target.id,
        goalId: goal.id,
      })),
    };
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
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    New Outcome for {strategy.name}
                  </Dialog.Title>

                  <hr className="mt-3" />

                  <Formik
                    initialValues={{ name: '', description: '', goalId: 0, targetId: undefined, strategyId: strategy.id, longTerm: true }}
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
                      console.log(props.errors);
                      const formatGroupLabel = data => (
                        <div
                          className="cursor-pointer text-lg"
                          onClick={e => {
                            props.setFieldValue('name', data.label);
                            props.setFieldValue('description', data.description);
                            props.setFieldValue('goalId', data.id);
                          }}
                        >
                          <span>{data.label}</span>
                        </div>
                      );
                      return (
                        <Form>
                          <div className="mt-5 grid grid-cols-2 text-gray-400 text-center font-semibold">
                            <div className={leftTabClass} onClick={() => setUseFramework(true)}>
                              Framework Based
                            </div>
                            <div className={rightTabClass} onClick={() => setUseFramework(false)}>
                              Custom Outcome
                            </div>
                          </div>

                          {useFramework && (
                            <div className="mt-5">
                              <div className="mb-5">
                                <label htmlFor="username" className="block font-medium text-gray-700 mb-1">
                                  Select a framework objective
                                </label>

                                <Select
                                  options={groupedTargets}
                                  formatGroupLabel={formatGroupLabel}
                                  onChange={data => {
                                    props.setFieldValue('longTerm', false);
                                    props.setFieldValue('name', data.label);
                                    props.setFieldValue('description', data.description);
                                    props.setFieldValue('targetId', data.value);
                                    props.setFieldValue('goalId', data.goalId);
                                  }}
                                />

                                <ErrorMessage component="p" name="name" className="text-red-500 text-sm mx-2" />
                              </div>
                              {props.values.name && (
                                <div className="mb-5">
                                  <label htmlFor="username" className="block font-medium text-gray-700 mb-1">
                                    Outcome Name
                                  </label>

                                  <Field type="text" name="name" />

                                  {!props.errors.name && <p className="text-gray-600 text-sm mt-1 mx-2">Provide a name to identify this outcome</p>}
                                  <ErrorMessage component="p" name="name" className="text-red-500 text-sm mx-2" />
                                </div>
                              )}

                              {props.values.description && (
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
                              )}
                            </div>
                          )}
                          {!useFramework && (
                            <div className="mt-5">
                              <div className="mb-5">
                                <label htmlFor="username" className="block font-medium text-gray-700 mb-1">
                                  Outcome Name
                                </label>
                                <Field type="text" name="name" />
                                {!props.errors.name && <p className="text-gray-600 text-sm mt-1 mx-2">Provide a name to identify this outcome</p>}
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
                                <label htmlFor="goalId" className="block font-medium text-gray-700 mb-1">
                                  Framework
                                </label>
                                <select
                                  name="goal"
                                  className="mb-2"
                                  onChange={e => {
                                    props.setFieldValue('goalId', e.target.value);
                                    setGoalId(e.target.value);
                                  }}
                                >
                                  <option value="">Select a framework</option>
                                  {goals.map(goal => (
                                    <option value={goal.id} key={goal.id}>
                                      {goal.id} - {goal.name}
                                    </option>
                                  ))}
                                </select>
                                <ErrorMessage component="p" name="goalId" className="text-red-500 text-sm mx-2" />
                              </div>

                              <div className="mb-5">
                                <div className="mb-5 relative flex items-start">
                                  <div className="flex items-center h-5">
                                    <Field
                                      name="longTerm"
                                      type="checkbox"
                                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                      onClick={e => {
                                        props.setFieldValue('longTerm', e.target.value);
                                        if (e.target.value) props.setFieldValue('targetId', undefined);
                                      }}
                                    />
                                  </div>
                                  <div className="ml-3">
                                    <label htmlFor="longTerm" className="block font-medium text-gray-700 mb-1">
                                      Long Term
                                    </label>
                                    <p className="text-gray-500">Select the type of outcome</p>
                                  </div>
                                </div>
                              </div>

                              {!props.values.longTerm && goalId > 0 && (
                                <div className="mb-5">
                                  <label htmlFor="goalId" className="block font-medium text-gray-700 mb-1">
                                    Framework Element
                                  </label>
                                  <select name="targetId" onChange={e => props.setFieldValue('targetId', e.target.value)}>
                                    <option value={0}>Select a framework element</option>
                                    {goals[goalId - 1].targets.map(target => (
                                      <option value={target.id} key={target.id}>
                                        {goalId}.{target.number}
                                      </option>
                                    ))}
                                  </select>
                                  <ErrorMessage component="p" name="targetId" className="text-red-500 text-sm mx-2" />
                                </div>
                              )}
                            </div>
                          )}
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
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default NewOutcomeModal;
