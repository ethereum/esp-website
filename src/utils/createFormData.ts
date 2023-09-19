export const createFormData = (data: Record<string, any>) => {
  const formData = new FormData();

  for (const name in data) {
    const value = data[name];

    if (value instanceof File) {
      // do not stringify `File` types
      formData.append(name, value);
    }

    // do not append `undefined` fields
    if (typeof value !== 'undefined') {
      formData.append(name, JSON.stringify(value));
    }
  }

  return formData;
};
