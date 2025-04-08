type FetchItemsOptionsType = Record<string, string>;

export const fetchItemsServ = async <T>(
  url: string,
  headers: FetchItemsOptionsType = {}
): Promise<T> => {
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  return await (
    await fetch(url, {
      method: "GET",
      headers: defaultHeaders,
    })
  ).json();
};

export const postItemsServ = async <T>(
  url: string,
  body: Record<string, T>,
  headers: FetchItemsOptionsType = {}
): Promise<T> => {
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  return await (
    await fetch(url, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(body),
    })
  ).json();
};
