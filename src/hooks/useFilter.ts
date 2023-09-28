export const useFilter = () => {
  const filterAndSeparate = (
    dataArray: Array<any>,
    condition: (item: any) => {}
  ) => {
    return dataArray.reduce(
      (result, item) => {
        if (condition(item)) {
          result.matched.push(item);
        } else {
          result.notMatched.push(item);
        }
        return result;
      },
      { matched: [], notMatched: [] }
    );
  };

  const addFilter = (currentList: Array<any>, fields: Array<string>) => {
    // const {matched, notMatched} = filterAndSeparate(currentList,)
  };
  const removeFilter = (list: Array<any>, fields: Array<string>) => {};
};
