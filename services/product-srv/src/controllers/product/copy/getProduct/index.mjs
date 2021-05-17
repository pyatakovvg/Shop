
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { Product, Attribute, Unit, Gallery, Currency, Category, Type, Brand, ProductAttribute } = models;

  const product = await Product.findOne({
    where: { uuid },
    attributes: ['uuid', 'name', 'description', 'isView', 'price', 'fiscal', 'updatedAt'],
    order: [
      ['gallery', 'order', 'asc'],
      ['attributes', 'order', 'asc'],
    ],
    include: [
      {
        model: Brand,
        as: 'brands',
        attributes: ['id', 'value'],
        through: {
          attributes: [],
          order: [['order', 'asc']],
          as: 'brand',
        },
      },
      {
        model: Type,
        as: 'types',
        attributes: ['id', 'value'],
        through: {
          attributes: [],
          order: [['order', 'asc']],
          as: 'type',
        },
      },
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'value'],
        through: {
          attributes: [],
          order: [['order', 'asc']],
          as: 'category',
        },
      },
      {
        model: Currency,
        required: false,
        as: 'currency',
        attributes: ['code', 'value']
      },
      {
        model: ProductAttribute,
        required: false,
        as: 'attributes',
        attributes: ['value', 'order', 'use'],
        include: [
          {
            model: Attribute,
            attributes: ['id', 'value'],
            as: 'attribute',
            include: [
              {
                model: Unit,
                required: false,
                as: 'unit',
                attributes: ['value']
              }
            ]
          }
        ]
      },
      {
        model: Gallery,
        as: 'gallery',
        attributes: ['uuid'],
      },
    ],
  });

  return product.toJSON();
}