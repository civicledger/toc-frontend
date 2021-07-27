import { useContext } from "react";
import {
  PencilIcon,
  LinkIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";

import { LoginContext } from "../../utilities/reducers";

const CompanyHeadingOptions = ({ company }) => {
  const {
    login: { user },
  } = useContext(LoginContext);

  if (!company) return "";

  const companyUser = company.users.find((e) => {
    return e.id === user.id;
  });

  const relationship = companyUser.relationship;

  const isOwner = relationship.type === 1 ? true : false;
  const isMember =
    relationship.type === 2 && relationship.pending === false ? true : false;
  const isPendingMember =
    relationship.type === 2 && relationship.pending === true ? true : false;
  const canJoin = relationship.type === 3 ? true : false;

  return (
    <div className="mt-5 flex xl:mt-0 xl:ml-4">
      {isOwner && (
        <span className="hidden sm:block">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
          >
            <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
            Edit
          </button>
        </span>
      )}

      {isMember && (
        <span className="hidden sm:block ml-3">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
          >
            <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
            Joined
          </button>
        </span>
      )}

      {isPendingMember && (
        <span className="hidden sm:block ml-3">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
          >
            <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
            Pending join request
          </button>
        </span>
      )}

      {canJoin && (
        <span className="hidden sm:block ml-3">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
          >
            <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
            Join
          </button>
        </span>
      )}

      {!isOwner && (
        <span className="sm:ml-3 relative z-0">
          <div className="relative">
            <div className="inline-flex shadow-sm rounded-md divide-x divide-purple-600">
              <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-purple-600">
                <div className="relative inline-flex items-center bg-purple-500 py-2 pl-3 pr-4 border border-transparent rounded-md shadow-sm text-white">
                  <CheckIcon className="h-5 w-5" />
                  <p className="ml-2.5 text-sm font-medium">Subscribed</p>
                </div>
              </div>
            </div>
          </div>
        </span>
      )}

      <span className="ml-3 relative sm:hidden">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          id="mobile-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          More
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" />
        </button>
        {false && (
          <div
            className="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="mobile-menu-button"
            tabIndex="-1"
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="mobile-menu-item-0"
            >
              Edit
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="mobile-menu-item-1"
            >
              View
            </a>
          </div>
        )}
      </span>
    </div>
  );
};
export default CompanyHeadingOptions;
