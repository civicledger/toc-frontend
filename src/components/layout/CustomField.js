import { Field, ErrorMessage } from "formik";
const CustomField = ({ type, name, labelText, as }) => {
  return (
    <div>
      <div className="outline relative rounded-md focus-within:border-blue-500">
        <Field
          type={type}
          name={name}
          as={as}
          placeholder=" "
          className="block w-full p-2 bg-transparent text-base appearance-none focus:outline-none focus:overflow-hidden focus:border-none"
        />
        <label
          htmlFor={name}
          className="absolute top-0 p-2 -z-1 origin-0 bg-white text-base text-gray-400 duration-200"
        >
          {labelText}
        </label>
      </div>

      <ErrorMessage
        className="px-2 py-1 text-xs text-red-700"
        component="p"
        name={name}
      />
    </div>
  );
};
export default CustomField;
