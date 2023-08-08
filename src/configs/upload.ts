import * as dotenv from "dotenv";
dotenv.config();

/**
 * Config file
 */
export const config: {
  aws_access_key_id: string;
  aws_secret_access_key: string;
  bucket_name: string;
  region: string;
} = {
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID ?? " ",
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  bucket_name: process.env.BUCKET_NAME ?? "",
  region: process.env.REGION ?? "",
};
