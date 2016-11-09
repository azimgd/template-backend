import yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
});

const cast = (data) => schema.cast(data);

export default {
  cast,
};
