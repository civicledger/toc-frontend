import {
  MailIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";

const UserItem = () => {
  return (
    <div>
      <ul
        className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0"
        role="list"
      >
        <li>
          <a href="#" className="group block">
            <div className="flex items-center py-5 px-4 sm:py-6 sm:px-0">
              <div className="min-w-0 flex-1 flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full group-hover:opacity-75"
                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <p className="text-sm font-medium text-purple-600 truncate">
                      Emily Selman
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500">
                      <MailIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      <span className="truncate">emilyselman@example.com</span>
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <div>
                      <p className="text-sm text-gray-900">
                        Applied on
                        <time dateTime="2020-07-01T15:34:56">
                          January 7, 2020
                        </time>
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" />
                        Completed phone screening
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-700" />
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};
export default UserItem;
