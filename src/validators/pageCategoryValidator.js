import yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
});

const indexQuerySchema = yup.object().shape({
  limit: yup.number(),
  offset: yup.number(),
});

const cast = data => schema.cast(data);

export default {
  cast,
  schema,
  indexQuerySchema,
};
