const ImageTypes = {
  JPG: "image/jpeg",
  GIF: "image/gif",
  PNG: "image/png",
  UNKNOWN: "unknown",
};

const uint8ArrayType = (arr: Uint8Array) => {
  const sub = arr.subarray(0, 4);
  const header = sub.reduce((prev, next) => (prev += next.toString(16)), "");

  switch (header) {
    case "89504e47":
      return ImageTypes.PNG;
    case "47494638":
      return ImageTypes.GIF;
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
    case "ffd8ffe3":
    case "ffd8ffe8":
      return ImageTypes.JPG;
    default:
      return ImageTypes.UNKNOWN;
  }
};

const isJpeg = (arr: Uint8Array) => uint8ArrayType(arr) === ImageTypes.JPG;

export { isJpeg };
