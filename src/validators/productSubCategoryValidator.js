import yup from 'yup';

const schema = yup.object().shape({
  categoryId: yup.string().required(),
  name: yup.string().required(),
});

const cast = (data) => schema.cast(data);

export default {
  cast,
};
