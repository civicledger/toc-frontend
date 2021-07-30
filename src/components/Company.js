import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";

import { companyQuery } from "../utilities/queries";
import CompanyHeading from "./company/CompanyHeading";
import CompanyTab from "./company/CompanyTab";
import CompanyTabPagination from "./company/CompanyTabPagination";

const Company = () => {
  const {
    params: { id },
  } = useRouteMatch();

  const { data: company } = useQuery(
    ["companies", id],
    () => companyQuery(id),
    {
      keepPreviousData: true,
    }
  );

  if (!company) return "";

  return (
    <div>
      <CompanyHeading company={company} />
      <div className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <CompanyTab company={company} />
        </div>
      </div>
    </div>
  );
};
export default Company;
