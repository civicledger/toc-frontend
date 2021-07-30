import { Link } from "react-router-dom";
import {
  BriefcaseIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
  CalendarIcon,
} from "@heroicons/react/solid";

import { shortDate } from "../../utilities/format";

const companyTypes = {
  1: "Company",
  2: "Community Group",
  3: "Government Agency",
  4: "Investor",
  5: "NFP",
  6: "MultiNational Company",
};

const CompanyHeadingInfo = ({ company }) => {
  return (
    <div className="flex-1 min-w-0">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4" role="list">
          <li>
            <div>
              <Link
                to="/entities"
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                All Entities
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
              <span className="ml-4 text-sm font-medium text-gray-500">
                {company.name}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex flex-row mt-2">
        <div className="flex border bg-white shadow p-1 mr-4 rounded-lg">
          <div className="w-full group block">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-16 w-16 rounded"
                  src={company.logo}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {company.name}
          </h1>
          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              {companyTypes[company.type]}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              {company.locations.map((location) => location.name).join(", ")}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              />
              Created on {shortDate(company.createdAt)}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 text-gray-500">{company.description} </div>
    </div>
  );
};
export default CompanyHeadingInfo;
