import CompanyService from "../services/CompanyService";

const companyService = new CompanyService();

export const companiesQuery = async (id) => {
  const { data } = await companyService.getAll();
  return data;
};

export const companyQuery = async (id) => {
  const { data } = await companyService.getOne(id);
  return data;
};
