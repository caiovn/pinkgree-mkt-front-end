type IBrand = {
  id: number;
  name: string;
};

interface ICategory extends IBrand {
  image: string;
}

interface IProduct {
  active: boolean;
  brand: IBrand;
  categories: Array<ICategory>;
  id: number;
  mainImageUrl: string;
  name: string;
  price: number;
}

interface ISku {
    skuCode: string,
    name: string,
    stockQuantity: number,
    height: number,
    width: number,
    length: number,
    weight: number,
    mainImageUrl: string,
    urlImages: Array<string>,
    price: {
      listPrice: number,
      salePrice?: number,
      startDate?: Date,
      endDate?: Date
    },
    skuAttributes: Array<{label: string, type: string, value: string}>,
}

