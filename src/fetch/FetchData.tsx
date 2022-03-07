
export const fetchFoodData = async () => (await fetch('http://127.0.0.1:8080/food')).json();
export const fetchFoodItem = async (id: number) => (await fetch(`http://127.0.0.1:8080/food/${id}`)).json();
export const fetchFoodItemImg = async (id: number) => (await fetch(`http://127.0.0.1:8080/food/img/${id}`)).text();

export const fetchTagRelation = async (id: number) => (await fetch(`http://127.0.0.1:8080/tags-relation/${id}`)).json();