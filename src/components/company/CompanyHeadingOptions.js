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

  const userFilter = company.users.filter(({ id }) => id === user.id);

  const isOwner = userFilter.some(
    ({ relationship }) => relationship.type === 1
  );

  const isMember = userFilter.some(
    ({ relationship }) => !relationship.pending && relationship.type === 2
  );

  const isSubscribed = userFilter.some(
    ({ relationship }) => relationship.type === 3
  );

  const canSubscribe = !isSubscribed && !isOwner;
  const canJoin = !isMember && !isOwner;

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
      {isOwner && (
        <span className="block">
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
        <span className="block ml-3">
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
        <span className="block ml-3">
          <button
            type="button"
            className="relative inline-flex items-center bg-purple-500 py-2 pl-3 pr-4 border border-transparent rounded-md shadow-sm text-white"
          >
            <CheckIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
            Joined
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
    </div>
  );
};
export default CompanyHeadingOptions;
