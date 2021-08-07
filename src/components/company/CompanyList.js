import { Link } from "react-router-dom";
import { LocationMarkerIcon, ChevronRightIcon } from "@heroicons/react/solid";

const companyTypes = {
  1: "Company",
  2: "Community Group",
  3: "Government Agency",
  4: "Investor",
  5: "Not For Profit",
  6: "Multi-National Company",
};

const CompanyList = ({ companies }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {companies.map((company) => (
          <li key={company.id}>
            <Link
              to={`/entities/${company.id}`}
              className="block hover:bg-gray-50"
            >
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="flex space-x-3">
                    <div className="w-16">
                      <img src={company.logo} alt={`${company.name} logo`} />
                    </div>
                    <div className="truncate">
                      <div className="flex text-sm">
                        <p className="font-medium text-indigo-600 truncate">
                          {company.name}
                        </p>
                        <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                          {companyTypes[company.type]}
                        </p>
                      </div>
                      <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500">
                          <LocationMarkerIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <p>
                            Operating in{" "}
                            {company.locations
                              .map((location) => location.name)
                              .join(", ")}{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                    <div className="flex overflow-hidden -space-x-1">
                      {company.users.map((user) => (
                        <img
                          key={user.email}
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                          src={user.image}
                          alt={user.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CompanyList;
