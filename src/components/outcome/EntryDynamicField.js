import { Field, ErrorMessage } from 'formik';
import { parseISO } from 'date-fns';
import classNames from 'classnames';
import DatePicker from 'react-date-picker';
// import DateTimePicker from "react-datetime-picker";
import Dropzone from 'react-dropzone';

const largeFields = [1, 6, 7];

const placeholders = {
  7: 'eg 35.6945628,139.7003868,17z',
  8: 'eg 0xa87833f17dbb73c5da15ab47e4f30a237565e61e',
};

const EntryDynamicField = ({ field, setFieldValue, value, rules }) => {
  const containerClasses = classNames({ 'col-span-2': largeFields.includes(field.type) });
  const labelClasses = classNames('block text-sm font-medium text-gray-700');

  const applicableRules = rules ? rules.filter(rule => rule.fieldId === field.id) : [];
  const isRequired = !!applicableRules.find(({ type }) => type === 1);
  const placeholder = placeholders[field.type];

  return (
    <div className={containerClasses}>
      <label htmlFor={field.name} className={labelClasses}>
        {field.label || field.name}
        {isRequired && <span className="text-red-500 ml-2">*</span>}
      </label>
      {/* {field.type === 3 && (
        <DateTimePicker
          className="textfield w-full"
          onChange={startDate => setFieldValue(field.name, startDate)}
          name={field.name}
          minDate={startDate(rules)}
          maxDate={endDate(rules)}
          maxDetail="second"
          required={isRequired}
          value={value}
        />
      )} */}

      {field.type === 4 && <Field type="checkbox" name={field.name} checked={value} className="mt-3" />}

      {field.type === 5 && (
        <DatePicker
          className="textfield w-full"
          onChange={startDate => setFieldValue(field.name, startDate)}
          name={field.name}
          minDate={startDate(rules)}
          maxDate={endDate(rules)}
          required={isRequired}
          value={value}
        />
      )}

      {field.type === 6 && (
        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section className="bg-gray-100 p-10 text-center border-dashed border-2">
              <div {...getRootProps()}>
                <input {...getInputProps()} />

                <p>
                  <i className="fal fa-file-upload mr-2"></i>Drop some files here, or click to select files
                </p>
              </div>
            </section>
          )}
        </Dropzone>
      )}

      {![3, 4, 5, 6].includes(field.type) && (
        <Field
          name={field.name}
          className="textfield w-full"
          onChange={({ target }) => setFieldValue(field.name, target.value)}
          required={isRequired}
          placeholder={placeholder}
        />
      )}
      <ErrorMessage component="p" className="sm:text-sm text-red-600" name={field.name} />
    </div>
  );
};

const startDate = rules => {
  const rule = rules.find(({ type }) => type === 4);
  return rule ? parseISO(rule.value) : new Date(1900, 0, 1);
};

const endDate = rules => {
  const rule = rules.find(({ type }) => type === 5);
  return rule ? parseISO(rule.value) : new Date(2100, 0, 1);
};

export default EntryDynamicField;
