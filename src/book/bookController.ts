import { NextFunction, Request, Response } from "express";

import cloudinary from "../config/cloudinary";

import path from "node:path";

import { chownSync } from "fs";
import createHttpError from "http-errors";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const coverImageMineType = files.coverImage[0].mimetype.split("/").at(-1);

  const fileName = files.coverImage[0].filename;

  const filePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    fileName
  );

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "book-covers",
      format: coverImageMineType,
    });

    // Another way
    /* await cloudinary.uploader
      .upload("testcloudinary.png")
      .then((result) => console.log(result)); */

    const bookFileName = files.file[0].filename;

    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFileName
    );

    const bookFileUploadResult = await cloudinary.uploader.upload(
      bookFilePath,
      {
        resource_type: "raw",
        filename_override: bookFileName,
        folder: "book-Pdfs",
        format: "pdf",
      }
    );

    console.log("bookFileUploadResult", bookFileUploadResult);

    console.log("uploadResult", uploadResult);

    res.json({});
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "error while uploading the files."));
  }
};

export { createBook };
