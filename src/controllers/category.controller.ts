import db from "../models";
export type categoryType = {
  id?: Number;
  name: String;
};
export const index = async (): Promise<categoryType[]> => {
  try {
    const categories: categoryType[] = await db.category.findAll({});
    return categories;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const show = async (categoryId: Number): Promise<categoryType> => {
  try {
    const category: categoryType = await db.category.findByPk(categoryId);
    return category;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const create = async (category: categoryType): Promise<void> => {
  try {
    await db.category.create(category);
  } catch (error) {
    throw new Error(error as string);
  }
};

export const update = async (
  categoryId: Number,
  updatedCategory: categoryType
): Promise<void> => {
  try {
    await db.category.update(updatedCategory, { where: { id: categoryId } });
  } catch (error) {
    throw new Error(error as string);
  }
};

export const destroy = async (categoryId: Number): Promise<void> => {
  try {
    await db.category.destroy({ where: { id: categoryId } });
  } catch (error) {
    throw new Error(error as string);
  }
};
