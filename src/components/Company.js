import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";

import { companyQuery } from "../utilities/queries";

const Company = () => {
  const {
    params: { id },
  } = useRouteMatch();

  let { data: company } = useQuery(["companies", id], () => companyQuery(id), {
    keepPreviousData: true,
  });

  return (
    <div className="flex min-h-screen">
      <div className="w-full p-10 max-w-md m-auto rounded-lg border border-primary flex justify-between">
        <h2 className="text-xl font-semibold">Entity:</h2>
        <h2 className="text-xl">{company?.name}</h2>
      </div>
    </div>
  );
};
export default Company;
