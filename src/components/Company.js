import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";

import { companyQuery } from "../utilities/queries";
import CompanyHeading from "./CompanyHeading";
import CompanyContent from "./CompanyContent";

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
      <CompanyContent />
    </div>
  );
};
export default Company;
