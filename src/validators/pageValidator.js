import yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required(),
  category: yup.string().required(),
  subCategory: yup.string().required(),
  content: yup.string().required(),
});

export default {
};
