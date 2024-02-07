const filterCookieData = (data: string) => {
  // const testStr = "some product name__variant_2";
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

import { Metadata } from "next";

interface Image {
  url: string;
  width: number;
  height: number;
}

class CustomMetaData implements Metadata {
  title: string;
  description: string;
  metadataBase: URL;
  openGraph: {
    title: string;
    description: string;
    images: Image[];
  };

  constructor(title: string, description: string) {
    const testUrl = "http://localhost:3000";
    const ogHostUrl: string = testUrl + "/api/og";

    this.title = title;
    this.description = description;
    this.metadataBase = new URL(ogHostUrl);
    this.openGraph = {
      title: title,
      description: description,
      images: [
        {
          url: ogHostUrl,
          width: 1200,
          height: 630,
        },
      ],
    };
  }
}

export { filterCookieData, findKey, CustomMetaData };
