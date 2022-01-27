module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        username: {
          type: String,
          required: true,
          unique: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        }
      },
      { timestamps: true }// automatically manage createdAt and updatedAt
    );
    
  // create unique id
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    
    const User = mongoose.model("user", schema);
    return User;
  };
  
  