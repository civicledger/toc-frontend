import { buildYup } from 'json-schema-to-yup';

export const createValidation = definition => {
  const properties = definition.fields.reduce((accumulator, field) => {
    accumulator['name'] = {
      type: 'string',
      required: 'true',
    };

    let type = 'string';
    if (field.type === 2) type = 'number';
    if (field.type === 3) type = 'boolean';
    if (field.type === 4) return accumulator;

    accumulator[field.name] = {
      type,
      required: true,
    };

    return accumulator;
  }, {});

  const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: 'http://example.com/person.schema.json',
    title: 'Person',
    description: 'A person',
    type: 'object',
    properties,
  };

  const config = {
    errMessages: {
      name: {
        required: 'You must provide a short name for this measure',
      },
    },
  };

  return buildYup(schema, config);
};
