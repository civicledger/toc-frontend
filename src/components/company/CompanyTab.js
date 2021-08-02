import UserItem from "./UserItem";
const CompanyTab = ({ company }) => {
  return (
    <div className="px-4 sm:px-0">
      <h2 className="text-lg font-medium text-gray-900">Users</h2>

      <ul className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0">
        {company.users.map((user, index) => (
          <UserItem key={index} user={user} />
        ))}
      </ul>
    </div>
  );
};
export default CompanyTab;
