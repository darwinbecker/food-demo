enum amountType {
  gram = 'g',
  amount = 'x',
  ml = 'ml'
}

interface FoodItem {
  id: number;
  img?: string;
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  amount: number;
  amountType: amountType | string;
}

interface ImgItem {
  id: number,
  img: {
    type: string,
    data: number[];
  }
}

interface Tag {
  name: string;
  id: number;
}

interface TagRelation {
  id: number;
  foodID: number;
  tagID: number;
}

export {
  type FoodItem,
  type ImgItem,
  amountType,
  type Tag,
  type TagRelation,
}
