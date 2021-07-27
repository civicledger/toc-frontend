import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";

import { companyQuery } from "../utilities/queries";
import CompanyHeading from "./CompanyHeading";
import CompanyTab from "./CompanyTab";
import CompanyDetails from "./CompanyDetails";
import CompanyTabPagination from "./CompanyTabPagination";

const Company = () => {
  const {
    params: { id },
  } = useRouteMatch();

  let { data: company } = useQuery(["companies", id], () => companyQuery(id), {
    keepPreviousData: true,
  });

  if (!company) return "";

  return (
    <div>
      <CompanyHeading company={company} />
      <div className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <CompanyTab />

          <CompanyDetails />

          <CompanyTabPagination />
        </div>
      </div>
    </div>
  );
};
export default Company;
