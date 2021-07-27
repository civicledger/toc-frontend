import CompanyHeadingInfo from "./CompanyHeadingInfo";
import CompanyHeadingOptions from "./CompanyHeadingOptions";

const CompanyHeading = ({ company }) => {
  return (
    <header className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
        <CompanyHeadingInfo company={company} />
        <CompanyHeadingOptions company={company} />
      </div>
    </header>
  );
};
export default CompanyHeading;
