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

  const filter = (allFilters: any, fullList: any) => {
    let filteredList = fullList;

    for (const category in allFilters) {
      if (allFilters[category as any].length === 0) {
        continue;
      }
      filteredList = filteredList.filter((obj: any) => {
        const {
          tags: [chain, type],
          status,
        } = obj;

        let current;
        switch (category) {
          case "chain":
            current = allFilters.chain;
            if (
              current.some((element: string) =>
                chain.toLowerCase().includes(element.toLowerCase())
              )
            ) {
              return true;
            }
            break;

          case "type":
            current = allFilters.type;

            if (
              type &&
              current.some((element: string) =>
                (type as string).toLowerCase().includes(element.toLowerCase())
              )
            )
              return true;

            break;

          case "result":
            current = allFilters.result;

            if (
              current.some((element: string) =>
                status.toLowerCase().includes(element.toLowerCase())
              )
            )
              return true;

            break;

          default:
            break;
        }
      });
    }
    return filteredList;
  };

  return { filter };
};
