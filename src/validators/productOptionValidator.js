import yup from 'yup';

const schema = yup.object().shape({
  productId: yup.number().required(),
  key: yup.string().required(),
  value: yup.string().required(),
});

const indexQuerySchema = yup.object().shape({
  limit: yup.number(),
  offset: yup.number(),
});

const cast = data => schema.cast(data);
const castIndexQuery = data => indexQuerySchema.cast(data);

export default {
  cast,
  schema,
  indexQuerySchema,
  castIndexQuery,
};
