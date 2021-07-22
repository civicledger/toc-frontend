import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";

import { entityQuery } from "../utilities/queries";

const Entity = () => {
  const {
    params: { id },
  } = useRouteMatch();

  let { data: entity } = useQuery(["entities", id], () => entityQuery(id), {
    keepPreviousData: true,
  });

  return (
    <div className="flex min-h-screen">
      <div className="w-full p-10 max-w-md m-auto rounded-lg border border-primary flex justify-between">
        <h2 className="text-xl font-semibold">Entity:</h2>
        <h2 className="text-xl">{entity?.name}</h2>
      </div>
    </div>
  );
};
export default Entity;
