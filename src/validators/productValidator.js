import yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  title: yup.string().required(),
  category: yup.string().required(),
  subCategory: yup.string().required(),
  description: yup.string().required(),
  uniqueProductId: yup.string().required(),
  price: yup.number().required(),
});

const indexQuerySchema = yup.object().shape({
  categoryId: yup.number(),
  subCategoryId: yup.number(),
  options: yup.array().of(yup.string()),
  limit: yup.number().min(0).max(50).default(20),
  offset: yup.number().min(0),
});

const cast = data => schema.cast(data);
const castIndexQuery = data => indexQuerySchema.cast(data);

export default {
  cast,
  castIndexQuery,
  schema,
  indexQuerySchema,
};
