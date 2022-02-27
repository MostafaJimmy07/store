import resize from '../utilities/resize';
import path from 'path';
//import ROOT_PATH from '../utilities/resize';
import fs from 'fs';
const ROOT_PATH = path.resolve(__dirname, '../');
console.log('Root', ROOT_PATH);
const THUMBS_PATH = `${ROOT_PATH}/thumb`;
describe('Test ImageProcessing utility', () => {
  let file: string;
  let filename: string;
  beforeAll(() => {
    filename = 'hi';
    file = `${ROOT_PATH}/image/${filename}.jpg`;
  });
  //////////////////////////////////////////////////////////////////////////////////////

  it('should return true if image exists', function () {
    expect(fs.existsSync(file)).toBeTruthy();
  });
  //////////////////////////////////////////////////////////////////////////////////////
  it('Should return a processed image', async () => {
    const width = 1000;
    const height = 600;
    const processedImage = await resize(filename, width, height);
    expect(processedImage).toEqual(`${THUMBS_PATH}/${filename}_${width}_${height}.jpg`);
    expect(processedImage).toBeDefined();
  });
  //////////////////////////////////////////////////////////////////////////////////////
});
