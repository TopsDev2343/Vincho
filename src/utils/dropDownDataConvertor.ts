function dropDownDataConvertor(data: object[]) {
  const transformed = data?.map(({title, id}) => ({
    label: title,
    value: id,
    key: id,
  }));
  return transformed;
}

export {dropDownDataConvertor};
