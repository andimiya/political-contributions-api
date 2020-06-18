import { validate } from "class-validator";

export default async function validateClass(classObj: any): Promise<boolean> {
  const errors = await validate(classObj);
  if (errors && errors.length > 0) {
    classObj.validationErrors = errors; // eslint-disable-line no-param-reassign

    errors.forEach((err) => {
      if (!err.constraints) return;

      Object.keys(err.constraints).forEach((key) => {
        if (!err?.constraints?.[key]) return;
        classObj.validationErrorMessages.push(
          `${err.property}: ${err.constraints[key]}`
        );
      });
    });

    return false;
  }
  return true;
}
