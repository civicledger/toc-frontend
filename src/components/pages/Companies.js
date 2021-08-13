import { useQuery } from 'react-query';

import PageHeader from '../layout/PageHeader';
import CompanyList from '../company/CompanyList';
import NewCompanyModal from '../company/NewCompanyModal';

import { companiesQuery } from '../../utilities/queries';

const Companies = () => {
  const { data: companies = [] } = useQuery('getCompanies', companiesQuery);

  return (
    <div className="p-10">
      <PageHeader title="All Entities">
        <li>
          <span>Entities</span>
        </li>
      </PageHeader>

      <NewCompanyModal />

      <div className="mt-10">
        <CompanyList companies={companies} />
      </div>
    </div>
  );
};

export default Companies;
