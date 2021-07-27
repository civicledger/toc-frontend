import UserItem from "./UserItem";
const CompanyTab = ({ company }) => {
  return (
    <div className="px-4 sm:px-0">
      <h2 className="text-lg font-medium text-gray-900">Users</h2>

      {/* <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="mt-2 -mb-px flex space-x-8" aria-label="Tabs">
            <a
              href="#"
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Members
              <span className="bg-gray-100 text-gray-900 hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                2
              </span>
            </a>

            <a
              href="#"
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Pending Members
              <span className="bg-gray-100 text-gray-900 hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                4
              </span>
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Subscribers
              <span className="bg-gray-100 text-gray-900 hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                4
              </span>
            </a>
          </nav>
        </div>
      </div> */}

      <ul
        className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0"
        role="list"
      >
        {company.users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
};
export default CompanyTab;
