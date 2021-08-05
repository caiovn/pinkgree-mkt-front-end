interface ICategories {
  id: number;
  name: string;
}

type IBrand = ICategories;

interface IProducts {
  active: boolean;
  brand: IBrand;
  categories: Array<ICategories>;
  id: number;
  mainImageUrl: string;
  name: string;
  price: number;
}
