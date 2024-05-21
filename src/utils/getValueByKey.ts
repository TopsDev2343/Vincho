export const getValueByKey = (jsonArray: any) => {
  const arr = jsonArray.map(data => [
    {
      phoneNumber: {
        eq: data?.phoneNumbers[1]?.number
          ? data.phoneNumbers[1].number
          : data?.phoneNumbers[0]?.number
          ? data?.phoneNumbers[0]?.number
          : '',
      },
    },
  ]);
  return arr.flat();
};
//[{phoneNumber:{eq:"09214944570"}}]
