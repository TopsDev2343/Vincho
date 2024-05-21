export const getKeyByValue = (value: string, enumName: any) => {
    const indexOfS = Object.values(enumName).indexOf(value as unknown as enumName);
    const key = Object.keys(enumName)[indexOfS];
    return key;
};

export const getValueByKey = (key: string, enumName: any) => {
    const indexOfS = Object.keys(enumName).indexOf(key as unknown as enumName);
    const value = Object.values(enumName)[indexOfS];
    return value;
};