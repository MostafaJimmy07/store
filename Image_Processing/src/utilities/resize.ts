import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
const ROOT_PATH = path.resolve(__dirname, '../');
//console.log('Root', ROOT_PATH);
const THUMBS_PATH = `${ROOT_PATH}/thumb`;

const resize = async (filename: string, width: number, height: number) => {
  let resizedImagePath;
  let errorMessage;
  const fullImage = `${ROOT_PATH}/image/${filename}.jpg`;
  const thumbImage = `${THUMBS_PATH}/${filename}_${width}_${height}.jpg`;
  if (fs.existsSync(thumbImage)) {
    resizedImagePath = thumbImage;
  } else {
    if (fs.existsSync(fullImage)) {
      console.log('Processing image');
      await sharp(fullImage)
        .resize(width, height)
        .toFile(thumbImage)
        .then(() => {
          resizedImagePath = thumbImage;
        })
        .catch((error) => (errorMessage = error));
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      errorMessage = "File doesn't exists";
    }
  }
  return resizedImagePath;
};

export default resize;
