import { useContext } from "react";
import { useQueryClient } from "react-query";
import {
  PencilIcon,
  LinkIcon,
  CheckIcon,
  ChevronDownIcon,
  AnnotationIcon,
} from "@heroicons/react/solid";

import { LoginContext } from "../../utilities/reducers";
import MembershipService from "../../services/MembershipService";
import SubscriptionService from "../../services/SubscriptionService";

const membershipService = new MembershipService();
const subscriptionService = new SubscriptionService();

const CompanyHeadingOptions = ({ company }) => {
  const queryClient = useQueryClient();
  const {
    login: { user },
  } = useContext(LoginContext);

  if (!company) return "";

  const companyUsers = company.users.filter((e) => {
    return e.id === user.id;
  });

  const isOwner = companyUsers.some((companyUser) => {
    return companyUser.relationship.type === 1;
  });

  const isMember = companyUsers.some((companyUser) => {
    return (
      companyUser.relationship.type === 2 &&
      companyUser.relationship.pending === false
    );
  });

  const isPendingMember = companyUsers.some((companyUser) => {
    return (
      companyUser.relationship.type === 2 &&
      companyUser.relationship.pending === true
    );
  });

  const isSubscribed = companyUsers.some((companyUser) => {
    return companyUser.relationship.type === 3;
  });

  const canEdit = isOwner;
  const canSubscribe = !isSubscribed && !isOwner;
  const canJoin = !isMember && !isOwner && !isPendingMember;

  const createSubscriber = () => {
    subscriptionService
      .create({ companyId: company.id })
      .then(() => {
        queryClient.invalidateQueries("companies");
      })
      .catch((error) => console.log(error));
  };

  const createMember = () => {
    membershipService
      .create({ companyId: company.id })
      .then(() => {
        queryClient.invalidateQueries("companies");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="mt-5 flex xl:mt-0 xl:ml-4">
      {canEdit && (
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
      {canJoin && (
        <span className="hidden sm:block ml-3">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
            onClick={() => createMember()}
          >
            <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
            Join
          </button>
        </span>
      )}
      {isMember && (
        <span className="hidden sm:block ml-3">
          <button
            type="button"
            className="relative inline-flex items-center bg-purple-500 py-2 pl-3 pr-4 border border-transparent rounded-md shadow-sm text-white"
          >
            <CheckIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
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

      {canSubscribe && (
        <span className="sm:ml-3 relative z-0">
          <div className="relative">
            <div className="inline-flex shadow-sm rounded-md divide-x divide-purple-600">
              <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-purple-600">
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
                  onClick={() => createSubscriber()}
                >
                  <AnnotationIcon className="h-5 w-5" />
                  <p className="ml-2.5 text-sm font-medium">Subscribe</p>
                </button>
              </div>
            </div>
          </div>
        </span>
      )}

      {isSubscribed && (
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
            <button
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="mobile-menu-item-0"
            >
              Edit
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="mobile-menu-item-1"
            >
              View
            </button>
          </div>
        )}
      </span>
    </div>
  );
};
export default CompanyHeadingOptions;
