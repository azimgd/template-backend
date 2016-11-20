import yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  filename: yup.string().required(),
  uniqueProductId: yup.string().required(),
  publicUrl: yup.string().required(),
});

const cast = (data) => schema.cast(data);

export default {
  cast,
};
