import * as z from 'zod';

export const stringFieldSchema = (
  fieldName: string,
  { min, max }: { min?: number; max?: number }
) => {
  let fieldSchema = z.string({ required_error: `${fieldName} is required` });

  if (min) {
    fieldSchema = fieldSchema.min(
      min,
      min > 1
        ? `${fieldName} must contain at least ${min} character(s)
    `
        : `${fieldName} is required`
    );
  }

  if (max) {
    fieldSchema = fieldSchema.max(max, `${fieldName} cannot exceed ${max} characters`);
  }

  return fieldSchema;
};
