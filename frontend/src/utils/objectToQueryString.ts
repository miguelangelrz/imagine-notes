export function objectToQueryString(object?: { [key: string]: any }) {
  if (!object) return "";

  return Object.keys(object)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
    .join("&");
}
