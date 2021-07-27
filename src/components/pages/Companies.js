import { useQuery } from "react-query";

import PageHeader from "../layout/PageHeader";
import CompanyList from "../companies/CompanyList";

import { companiesQuery } from "../../utilities/queries";

const Companies = () => {
  const { data: companies = [] } = useQuery("getCompanies", companiesQuery);

  return (
    <>
      <PageHeader title="All Entities">
        <li>
          <span>Entities</span>
        </li>
      </PageHeader>

      <div className="mt-10">
        <CompanyList companies={companies} />
      </div>
    </>
  );
};

export default Companies;