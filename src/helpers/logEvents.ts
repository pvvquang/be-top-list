import fs from "fs";
import path from "path";
import moment from "moment";

const fileName = path.join(__dirname, "../Logs", "custom.log");

export const logEvents = async (msg: string) => {
  const dateTime = `${moment().format("dd-MM-yyyy\tss:mm:HH")}`;
  const contentLog = `${dateTime}-----${msg}\n`;
  try {
    fs.promises.appendFile(fileName, contentLog);
  } catch (error) {
    console.error(error);
  }
};

// create a write stream (in append mode)
export const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../Logs", "access.log"),
  {
    flags: "a",
  }
);
