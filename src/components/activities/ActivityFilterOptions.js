import MultiSelect from '../layout/MultiSelect';
import { Formik, Form } from 'formik';

const ActivityFilterOptions = ({ filters, setActiveFilters }) => {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="bg-gray-50 px-4 py-5">
        {
          <div>
            <div className="mb-2 text-sm font-medium hover:text-black text-gray-500">
              <span className="mr-2">Filter by Event Name</span>
            </div>
            <Formik
              initialValues={{
                filters,
              }}
            >
              {props => (
                <Form>
                  <MultiSelect
                    name="events"
                    placeholder="Select events"
                    value={props.values.events}
                    onChange={props.setFieldValue}
                    isMulti
                    isClearable
                    backspaceRemovesValue
                    setActiveFilters={setActiveFilters}
                    filters={filters}
                  />
                </Form>
              )}
            </Formik>
          </div>
        }
      </div>
    </div>
  );
};
export default ActivityFilterOptions;
