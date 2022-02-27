import express, { Request, Response } from 'express';
import path from 'path';
import resize from '../../utilities/resize';
import fs from 'fs';
const images = express.Router();
images.get('/', async (req: Request, res: Response): Promise<void> => {
  let { filename, width, height } = req.query;
  filename = filename as unknown as string;
  width = width as unknown as string;
  height = height as unknown as string;
  const ROOT_PATH = path.resolve(__dirname, '../../');
  console.log(ROOT_PATH);
  const fullImage = `${ROOT_PATH}/image/${filename}.jpg`;

  if (!fs.existsSync(fullImage)) {
    res.status(400).json({ errorMessage: 'This Image Doesn`t Exist' });
  } else if (!Number(width) || !Number(height)) {
    res.status(400).json({
      errorMessage: 'You Must Provide WIDTH or HEIGHT in the Form of Numbers',
    });
  } else if (!filename || !width || !height) {
    res.status(400).json({
      errorMessage: 'You must provide a file name, a width and a ' + 'height to process image resizing',
    });
  } else {
    const images = await resize(filename, parseInt(width), parseInt(height));
    res.sendFile(path.resolve(__dirname, `${images}`));
  }
});
export default images;
