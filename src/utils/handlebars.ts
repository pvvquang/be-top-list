import Handlebars from "handlebars";
import { getS3LinkUrl } from "services/s3.service";

export const passImageUrlToHTMLTemplate = async (
  html: string,
  imageKeys: string[]
) => {
  const template = Handlebars.compile(html);
  const data: { [key: string]: string } = {};
  await Promise.all(
    imageKeys.map(async (key) => {
      const url = await getS3LinkUrl(key);
      data[key] = url;
    })
  );
  return template(data);
};
