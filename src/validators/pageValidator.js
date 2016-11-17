import yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required(),
  categoryId: yup.string().required(),
  subCategoryId: yup.string().required(),
  content: yup.string().required(),
});

const cast = (data) => schema.cast(data);

export default {
  cast,
};
