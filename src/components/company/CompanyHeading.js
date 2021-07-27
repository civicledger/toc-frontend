import CompanyHeadingInfo from "./CompanyHeadingInfo";
import CompanyHeadingOptions from "./CompanyHeadingOptions";

const CompanyHeading = ({ company }) => {
  console.log(company);
  return (
    <header className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
        <CompanyHeadingInfo company={company} />
        <CompanyHeadingOptions />
      </div>
    </header>
  );
};
export default CompanyHeading;
