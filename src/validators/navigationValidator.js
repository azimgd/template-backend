import yup from 'yup';

const schema = yup.object().shape({
  newRoutePath: yup.string().required(),
  newRouteName: yup.string().required(),
});

const indexQuerySchema = yup.object().shape({
  limit: yup.number(),
  offset: yup.number(),
});

export default {
  schema,
  indexQuerySchema,
};
