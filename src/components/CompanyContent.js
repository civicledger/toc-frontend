import CompanyTab from "./CompanyTab";
import CompanyDetails from "./CompanyDetails";
import CompanyTabPagination from "./CompanyTabPagination";

const CompanyContent = () => {
  return (
    <div className="pt-8 pb-16">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <CompanyTab />

        <CompanyDetails />

        <CompanyTabPagination />
      </div>
    </div>
  );
};
export default CompanyContent;
