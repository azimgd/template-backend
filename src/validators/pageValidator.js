import yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required(),
  categoryId: yup.string().required(),
  subCategoryId: yup.string().required(),
  content: yup.string().required(),
});

const indexQuerySchema = yup.object().shape({
  categoryId: yup.number(),
  subCategoryId: yup.number(),
  limit: yup.number(),
  offset: yup.number(),
});

const cast = data => schema.cast(data);
const castIndexQuery = data => indexQuerySchema.cast(data);

export default {
  cast,
  castIndexQuery,
  schema,
  indexQuerySchema,
};
