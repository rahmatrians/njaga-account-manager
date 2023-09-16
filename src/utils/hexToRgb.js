export const hexToRgb = (hex) => {
    let newHex = hex;

    if (hex.slice(0, 1) === "#") {
        newHex = hex.slice(1, 7);
    }

    const bigint = parseInt(newHex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return r + "," + g + "," + b;
}