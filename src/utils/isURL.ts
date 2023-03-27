import validator from 'validator';

export const isURL = (value: string) => validator.isURL(value);
