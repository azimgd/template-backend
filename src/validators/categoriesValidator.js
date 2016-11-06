import yup from 'yup';

const schema = yup.object().shape({
  categoryName: yup.string().required(),
});

export default {
};
