import yup from 'yup';

const schema = yup.object().shape({
  parentCategory: yup.string().required(),
  subCategoryName: yup.string().required(),
});

export default {
};
