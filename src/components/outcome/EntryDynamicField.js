import { Field, ErrorMessage } from 'formik';
import DatePicker from 'react-date-picker';

const EntryDynamicField = ({ field, setFieldValue, value }) => {
  return (
    <div className="col-span-2">
      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
        {field.label || field.name}
      </label>
      {field.type === 3 && (
        <Field
          type="checkbox"
          name={field.name}
          checked={value}
          className="mb-5 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      )}

      {field.type === 4 && (
        <DatePicker
          className="textfield w-full mb-5"
          onChange={startDate => setFieldValue(field.name, startDate)}
          name={field.name}
          required={true}
          value={value}
        />
      )}

      {![3, 4].includes(field.type) && (
        <Field
          name={field.name}
          type="text"
          className="textfield w-full mb-5"
          onChange={({ target }) => setFieldValue(field.name, target.value)}
          required={true}
        />
      )}
      <ErrorMessage component="p" className="sm:text-sm text-red-600" name={field.name} />
    </div>
  );
};
export default EntryDynamicField;
