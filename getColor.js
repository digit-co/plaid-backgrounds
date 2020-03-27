"use strict";

const { createCanvas, loadImage } = require("canvas");
const Color = require("color");

/**
 * Get color at pixel with coordinate [x, y]
 * https://stackoverflow.com/questions/3528299/get-pixel-color-of-base64-png-using-javascript
 * @param data: 1D array of RGBA values
 * @param width: width of the image
 * @param coordinate: [x, y] pixel in the image
 * @return hex color
 */
function getColorAt(data, width, coordinate) {
  const RGBA_LEN = 4;
  const [x, y] = coordinate;
  // eslint-disable-next-line no-mixed-operators
  const index = (y * width + x) * RGBA_LEN;

  const [r, g, b, a] = data.slice(index, index + RGBA_LEN);
  return Color(`rgba(${r},${g},${b},${a})`).hex();
}

/**
 * Get image background color.
 * If the color is inconsistent, return light grey.
 * @param data: 1D array of RGBA values
 * @param dimensions: [width, height] of the image
 * @return color as a hex string
 */
function getImageBackground(data, dimensions) {
  const [width, height] = dimensions;
  const topMid = [width / 2, 1];
  const bgColor1 = getColorAt(data, width, topMid);

  const leftMid = [1, height / 2];
  const bgColor2 = getColorAt(data, width, leftMid);

  if (bgColor1 !== bgColor2) {
    return "#F4F5F7";
  }
  return bgColor1;
}

/** Use node-canvas to get the logo style */
async function getBackgroundColor(base64Str) {
  const src = `data:image/gif;base64, ${base64Str}`;
  const image = await loadImage(src);

  const canvas = createCanvas(image.width, image.height);
  const context = canvas.getContext("2d");

  context.drawImage(image, 0, 0);
  const imageData = context.getImageData(0, 0, image.width, image.height);
  const data = Object.values(imageData.data);

  return getImageBackground(data, [image.width, image.height]);
}

module.exports = {
  getBackgroundColor,
};
