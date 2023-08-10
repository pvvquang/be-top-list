import Handlebars from "handlebars";
import { getS3LinkUrl } from "services/s3.service";

export const passImageUrlToHTMLTemplate = (
  html: string,
  imageKeys: string[]
) => {
  const template = Handlebars.compile(html);
  const data: { [key: string]: string } = {};
  imageKeys.forEach(async (key) => {
    const url = await getS3LinkUrl(key);
    data[key] = url;
  });
  return template(data);
};
