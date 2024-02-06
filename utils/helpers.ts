const filterCookieData = (data: string) => {
  const testStr = "some product name__variant_2";
  const regexPattern = /([^_]+)__(.+)/;

  if (data) {
    const matchResult = regexPattern.exec(data);
    // const tes = regexPattern2.exec(testStr);

    if (matchResult) {
      const res: { product: string; variant: string } = {
        product: matchResult[1],
        variant: matchResult[2],
      };
      return res;
    } else {
      console.log("No match found");
    }
  }
};
export { filterCookieData };
