module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      Firstname: String,
      Lastname: String,
      Gender: String,
      Street: String,
      Postalcode: String,
      City: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Customer = mongoose.model("customer", schema);
  return Customer;
};

