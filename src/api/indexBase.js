export default {
	failRequest: function(error) {
    this.status(500).json({ error });
  },
};
