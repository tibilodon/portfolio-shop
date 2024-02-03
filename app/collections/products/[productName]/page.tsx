import data from "@/utils/dataset.json";

export default function ProductDetails({
  params,
}: {
  params: { productName: string };
}) {
  const keyName = params.productName.replace(/%20/g, " ").replace(/%26/g, "&");

  const findKey = (obj: any, targetKey: string) => {
    if (obj && typeof obj === "object") {
      if (targetKey in obj) {
        return obj[targetKey];
      }
      for (const key in obj) {
        const result: any = findKey(obj[key], targetKey);
        if (result !== undefined) {
          return result;
        }
      }
    }
    return undefined;
  };

  const pageData = findKey(data, keyName);
  console.log("Pagedata", pageData);

  return (
    <>
      <h1>product details</h1>
      <h1>{keyName}</h1>
      {[pageData].map((item: any, i: number) => {
        return (
          <span key={i}>
            <p>{item.id}</p>
            <p>{item.stock}</p>
            <p>{item.desc}</p>
          </span>
        );
      })}
    </>
  );
}
