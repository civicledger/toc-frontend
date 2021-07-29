import { useContext } from "react";
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
  const {
    login: { user },
  } = useContext(LoginContext);

  if (!company) return "";

  const companyUsers = company.users.filter((e) => {
    return e.id === user.id;
  });

  let isOwner = false;
  let isMember = false;
  let isPendingMember = false;
  let isSubscribed = false;
  let isKnownUser = false;

  companyUsers.forEach((companyUser) => {
    let relationship = companyUser.relationship;
    if (relationship?.type === 1) isOwner = true;
    if (relationship?.type === 2 && relationship?.pending === false)
      isMember = true;
    if (relationship?.type === 2 && relationship?.pending === true)
      isPendingMember = true;
    if (relationship?.type === 3) isSubscribed = true;
    if ((isKnownUser = companyUser)) isKnownUser = true;
  });

  const onSubscribe = () => {
    subscriptionService
      .create({ companyId: company.id })
      .then(window.location.reload())
      .catch(console.log("error"));
  };

  const onJoin = () => {
    membershipService
      .create({ companyId: company.id })
      .then(window.location.reload())
      .catch(console.log("error"));
  };

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
      {!isMember && !isOwner && !isPendingMember && (
        <span className="hidden sm:block ml-3">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
            onClick={() => onJoin()}
          >
            <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
            Join
          </button>
        </span>
      )}

      {!isSubscribed && !isOwner && (
        <span className="sm:ml-3 relative z-0">
          <div className="relative">
            <div className="inline-flex shadow-sm rounded-md divide-x divide-purple-600">
              <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-purple-600">
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
                  onClick={() => onSubscribe()}
                >
                  <AnnotationIcon className="h-5 w-5" />
                  <p className="ml-2.5 text-sm font-medium">Subscribe</p>
                </button>
              </div>
            </div>
          </div>
        </span>
      )}

      {!isOwner && isKnownUser && isSubscribed && (
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
