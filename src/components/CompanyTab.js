const CompanyTab = () => {
  return (
    <div className="px-4 sm:px-0">
      <h2 className="text-lg font-medium text-gray-900">Candidates</h2>

      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="mt-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
        >
          <option>Applied</option>

          <option>Phone Screening</option>

          <option defaultValue>Interview</option>

          <option>Offer</option>

          <option>Disqualified</option>
        </select>
      </div>

      {/* <!-- Tabs --> */}
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="mt-2 -mb-px flex space-x-8" aria-label="Tabs">
            {/* <!-- Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" --> */}
            <a
              href="#"
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Applied
              {/* <!-- Current: "bg-purple-100 text-purple-600", Default: "bg-gray-100 text-gray-900" --> */}
              <span className="bg-gray-100 text-gray-900 hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                2
              </span>
            </a>

            <a
              href="#"
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Phone Screening
              <span className="bg-gray-100 text-gray-900 hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                4
              </span>
            </a>

            <a
              href="#"
              className="border-purple-500 text-purple-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Interview
              <span className="bg-purple-100 text-purple-600 hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                6
              </span>
            </a>

            <a
              href="#"
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Offer
            </a>

            <a
              href="#"
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Disqualified
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default CompanyTab;
