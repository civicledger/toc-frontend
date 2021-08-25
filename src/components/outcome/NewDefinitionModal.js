import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useQueryClient } from 'react-query';

import { definitionService } from '../../services';
import { newDefinitionValidation } from '../../utilities/validations';

const fieldTypes = {
  1: 'String',
  2: 'Number',
  3: 'Boolean',
  4: 'Date Only',
};

const NewDefinitionModal = ({ outcome }) => {
  const [dataFields, setDataFields] = useState([]);
  const [dataFieldsError, setDataFieldsError] = useState('');

  const handleAddDataField = newField => {
    if (!newField.name || !newField.type) {
      return false;
    }
    setDataFields([...dataFields, newField]);
    return true;
  };

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
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
                      New KPI
                    </Dialog.Title>

                    <hr className="mt-3" />

                    <Formik
                      initialValues={{ description: '', fieldName: '', fieldLabel: '', fieldType: 1 }}
                      validationSchema={newDefinitionValidation}
                      onSubmit={(values, actions) => {
                        actions.setSubmitting(true);
                        const { fieldName, fieldType, fieldLabel, ...data } = values;

                        definitionService
                          .create({ ...data, outcomeId: outcome.id, fields: dataFields })
                          .then(() => {
                            queryClient.invalidateQueries(['definitions']);
                            actions.resetForm();
                            setOpen(false);
                          })
                          .catch(error => {
                            console.log(error);
                          })
                          .finally(() => {
                            setDataFields([]);
                          });
                      }}
                    >
                      {props => {
                        return (
                          <Form>
                            <div className="mt-3 mb-5">
                              <div className="mb-5">
                                <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
                                  Description
                                </label>
                                <Field as="textarea" type="textarea" name="description" />
                                {!props.errors.description && (
                                  <p className="text-gray-600 text-sm mt-1 mx-2">Describe the KPI for anyone interested</p>
                                )}
                                <ErrorMessage component="p" name="description" className="text-red-500 text-sm mx-2 mt-1" />
                              </div>

                              <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
                                Fields
                              </label>

                              <p className="pb-5 text-sm">
                                Add the fields that you expect to store with your measure data, including the type, an optional label.
                              </p>

                              <div className="border rounded-sm mb-10">
                                {dataFields.length > 0 && (
                                  <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                                    <thead className="bg-gray-100">
                                      <tr className="font-semibold">
                                        <th scope="col" className="px-3 py-1">
                                          Field Name
                                        </th>
                                        <th scope="col" className="px-3 py-1">
                                          Label
                                        </th>
                                        <th scope="col" className="px-3 py-1">
                                          Data Type
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {dataFields.map((field, index) => {
                                        return (
                                          <tr key={index} className="px-4 py-3 whitespace-nowrap">
                                            <td className="px-3 py-1">{field.name}</td>
                                            <td className="px-3 py-1">{field.label}</td>
                                            <td className="px-3 py-1">{fieldTypes[field.type]}</td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                )}
                                {!dataFields.length && <div className="p-3 text-sm text-gray-500">No fields are set with this KPI</div>}
                              </div>

                              <div className="grid grid-cols-7 gap-4 gap-y-1 mt-3">
                                <div className="hidden sm:order-4 sm:inline-block"></div>
                                <label htmlFor="fieldName" className="col-span-7 sm:col-span-2 sm:order-1 text-sm font-medium text-gray-700">
                                  Units of measure
                                </label>
                                <Field type="text" name="fieldName" placeholder="eg. kg" className="col-span-7 sm:col-span-2 sm:order-5" />
                                <label htmlFor="fieldLabel" className="col-span-7 sm:col-span-2 sm:order-2 text-sm font-medium text-gray-700">
                                  Label
                                </label>
                                <Field
                                  type="text"
                                  name="fieldLabel"
                                  value={props.values.fieldLabel ? props.values.fieldLabel : props.values.fieldName}
                                  onChange={e => props.setFieldValue('fieldLabel', e.target.value)}
                                  placeholder="eg. Kilograms"
                                  className="col-span-7 sm:col-span-2 sm:order-6"
                                />
                                <label htmlFor="fieldType" className="col-span-7 sm:col-span-2 sm:order-3 text-sm font-medium text-gray-700">
                                  Type
                                </label>
                                <Field name="fieldType" as="select" className="col-span-7 sm:col-span-2 sm:order-7 textfield">
                                  {Object.entries(fieldTypes).map(([value, name]) => {
                                    return (
                                      <option key={value} value={value}>
                                        {name}
                                      </option>
                                    );
                                  })}
                                </Field>

                                <div className="col-span-7 sm:col-span-1 sm:order-7 relative">
                                  <button
                                    className="bg-indigo-500 text-white rounded-sm w-full h-full"
                                    onClick={event => {
                                      event.preventDefault();

                                      setDataFieldsError(false);
                                      const handled = handleAddDataField({
                                        name: props.values.fieldName,
                                        label: props.values.fieldLabel,
                                        type: props.values.fieldType,
                                      });

                                      if (handled) {
                                        props.setFieldValue('fieldName', '');
                                        props.setFieldValue('fieldLabel', '');
                                        props.setFieldValue('fieldType', 1);
                                      }
                                    }}
                                  >
                                    <PlusCircleIcon className="w-3 inline-block" /> Add
                                  </button>
                                </div>
                                <ErrorMessage component="p" name="fields" className="text-red-500 text-sm mx-2 mt-1" />

                                {dataFieldsError && <p className="col-span-7 ml-6 mb-5 text-xs text-red-500 text-center">{dataFieldsError}</p>}
                              </div>
                            </div>
                            <hr />

                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                              <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                <PlusCircleIcon className="w-5 inline-block mr-2" /> Create KPI
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
          <PlusCircleIcon className="w-5 inline-block mr-2" /> Create new KPI
        </button>
      </div>
    </>
  );
};

export default NewDefinitionModal;
