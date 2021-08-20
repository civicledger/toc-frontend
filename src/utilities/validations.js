import * as Yup from 'yup';

export const newCompanyValidation = Yup.object({
  name: Yup.string()
    .min(2, 'A longer name is required')
    .max(50, 'This name is too long to use')
    .required('You must provide a short name for your Entity.'),
  description: Yup.string()
    .min(10, 'You must provide a short description of this Entity')
    .required('You must provide a short description of this Entity'),
  type: Yup.number().required('You must select a type for your Entity'),
  placeId: Yup.string().required('You must select a place'),
});

export const newStrategyValidation = Yup.object().shape({
  placeId: Yup.string().required('A place is required'),
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
  goalId: Yup.number().min(1, 'You must select a framework').required('You must select a Framework'),
  longTerm: Yup.boolean(),
  targetId: Yup.number().when('longTerm', {
    is: false,
    then: Yup.number()
      .min(1, 'You must select a framework element for short term outcome')
      .required('You must select a framework element for short term outcome'),
  }),
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
    .min(10, 'You must provide a short description of this issue')
    .required('You must provide a short description of this issue'),
});

export const newMilestoneValidation = Yup.object().shape({
  outputId: Yup.string().required('An output is required'),
  name: Yup.string()
    .min(2, 'A longer name is required')
    .max(50, 'This name is too long to use')
    .required('You must provide a short name for this output.'),
  description: Yup.string()
    .min(10, 'You must provide a short description of this milestone')
    .required('You must provide a short description of this milestone'),
  date: Yup.date().required('Milestones must provide an estimated date'),
});
