import yup from 'yup';

const schema = yup.object().shape({
  productId: yup.number().required(),
  group: yup.string().required(),
  key: yup.string().required(),
  value: yup.string().required(),
});

const cast = (data) => schema.cast(data);

export default {
  cast,
};
