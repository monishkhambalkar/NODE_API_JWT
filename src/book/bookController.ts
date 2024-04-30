import { NextFunction, Request, Response } from "express";

import cloudinary from "../config/cloudinary";

import path from "node:path";

import fs from "node:fs";

import createHttpError from "http-errors";

import bookModel from "./bookModel";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre } = req.body;

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

    // @ts-ignore

    console.log("user id", req.userId);

    const newBook = await bookModel.create({
      title,
      genre,
      author: "662e4272a9cfe81a698de3e5",
      coverImage: uploadResult.secure_url,
      file: bookFileUploadResult.secure_url,
    });

    // delete temp files
    // need to wrap in try catch
    await fs.promises.unlink(filePath);

    await fs.promises.unlink(bookFilePath);

    res.status(201).json({ id: newBook._id });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "error while uploading the files."));
  }
};

export { createBook };
