import db from "../models";
export type courseType = {
  id?: Number;
  name: string;
  description: string;
  points: Number;
};
export const index = async (): Promise<courseType[]> => {
  try {
    const courses: courseType[] = await db.course.findAll({});
    return courses;
  } catch (err) {
    throw Error(err as string);
  }
};

export const show = async (courseId: Number): Promise<courseType> => {
  try {
    const course: courseType = await db.course.findByPk(courseId);
    return course;
  } catch (err) {
    throw Error(err as string);
  }
};

export const create = async (course: courseType): Promise<void> => {
  try {
    await db.course.create(course);
  } catch (err) {
    throw Error(err as string);
  }
};

export const update = async (
  courseId: Number,
  updatedData: courseType
): Promise<void> => {
  try {
    await db.course.update(updatedData, { where: { id: courseId } });
  } catch (err) {
    throw Error(err as string);
  }
};

export const destroy = async (courseId: Number): Promise<void> => {
  try {
    await db.course.destroy({ where: { id: courseId } });
  } catch (err) {
    throw Error(err as string);
  }
};
