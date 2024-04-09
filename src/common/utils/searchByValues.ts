export const searchByValues = <T extends Partial<T>>(
  fromData: T[],
  searchVal?: string
) => {
  if (!searchVal) {
    return fromData;
  }
  return fromData.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLocaleLowerCase().includes(searchVal.toLocaleLowerCase())
    )
  );
};
