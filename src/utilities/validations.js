import * as Yup from 'yup';

export const newCompanyValidation = Yup.object({
  name: Yup.string().required('Entity name is required'),
  type: Yup.string().required('You must select an Entity type'),
});

export const newStrategyValidation = Yup.object().shape({
  locationId: Yup.string().required('A location is required'),
  name: Yup.string()
    .min(2, 'A longer name is required')
    .max(50, 'This name is too long to use')
    .required('Your strategy must have a name so you can find it later.'),
  vision: Yup.string()
    .min(10, 'You must provide the vision statement for your strategy')
    .required('You must provide the vision statement for your strategy'),
});

export const newInitiativeValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, 'A longer name is required')
    .max(50, 'This name is too long to use')
    .required('You must provide a short name for this initiative.'),
  description: Yup.string()
    .min(10, 'You must provide a short description of this initiative')
    .required('You must provide a short description of this initiative'),
});

export const newOutcomeValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, 'A longer name is required')
    .max(50, 'This name is too long to use')
    .required('You must provide a short name for this outcome.'),
  description: Yup.string()
    .min(10, 'You must provide a short description of this outcome')
    .required('You must provide a short description of this outcome'),
});

export const newOutputValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, 'A longer name is required')
    .max(50, 'This name is too long to use')
    .required('You must provide a short name for this output.'),
  description: Yup.string()
    .min(10, 'You must provide a short description of this output')
    .required('You must provide a short description of this output'),
});

export const newIssueValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, 'A longer name is required')
    .max(50, 'This name is too long to use')
    .required('You must provide a short name for this output.'),
  description: Yup.string()
    .min(10, 'You must provide a short description of this output')
    .required('You must provide a short description of this output'),
});
