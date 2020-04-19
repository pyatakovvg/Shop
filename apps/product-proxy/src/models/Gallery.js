
module.exports = (db, DataType) => {

  const Gallery = db.define('Gallery', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    externalId: {
      type: DataType.STRING(36),
    },
    productId: {
      type: DataType.INTEGER,
    },
  });

  Gallery.associate = ({}) => {};

  return Gallery;
};
