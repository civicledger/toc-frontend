import { shortDate } from "../../utilities/format";
import {
  MailIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";

const UserItem = ({ user }) => {
  const relationship = user.relationship;

  const isOwner = relationship.type === 1 ? true : false;
  const isMember =
    relationship.type === 2 && relationship.pending === false ? true : false;
  const isPendingMember =
    relationship.type === 2 && relationship.pending === true ? true : false;
  const isSubscriber = relationship.type === 3 ? true : false;

  return (
    <li>
      <a href="#" className="group block">
        <div className="flex items-center py-5 px-4 sm:py-6 sm:px-0">
          <div className="min-w-0 flex-1 flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-12 w-12 rounded-full group-hover:opacity-75"
                src={user.image}
                alt=""
              />
            </div>
            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <p className="text-sm font-medium text-purple-600 truncate">
                  {user.name}
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  <MailIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  <span className="truncate">{user.email}</span>
                </p>
              </div>
              <div className="hidden md:block">
                <div>
                  <p className="text-sm text-gray-900">
                    Joined on {shortDate(user.createdAt)}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500">
                    <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" />
                    {isOwner && "Owner"}
                    {isMember && "Member"}
                    {isPendingMember && "Pending Member"}
                    {isSubscriber && "Subscriber"}
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
  );
};
export default UserItem;
