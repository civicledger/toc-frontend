import EntityService from "../services/EntityService";

const entityService = new EntityService();

export const entityQuery = async (id) => {
  const { data } = await entityService.getOne(id);
  return data;
};
