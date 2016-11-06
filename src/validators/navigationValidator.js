import yup from 'yup';

const schema = yup.object().shape({
  newRoutePath: yup.string().required(),
  newRouteName: yup.string().required(),
});

export default {
};
