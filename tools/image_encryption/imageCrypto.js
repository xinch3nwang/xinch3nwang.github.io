const logisticMap = (x, r) => {
    const x1 = r * x * (1 - x);
    const x2 = r * x1 * (1 - x1);
    return x2;
};

const generateKeySequence = (initialValue, r, length) => {
    const key = new Uint8Array(length);
    let x = initialValue;
    for (let i = 0; i < length; i++) {
        x = logisticMap(x, r);
        key[i] = Math.floor(x * 255) ^ (i % 256);
    }
    return key;
};

const encryptImage = async (imageData, initialValue, r) => {
    const pixels = imageData.data;
    const key = generateKeySequence(initialValue, r, pixels.length);
    const encryptedPixels = new Uint8ClampedArray(pixels.length);
    for (let i = 0; i < pixels.length; i++) {
        encryptedPixels[i] = pixels[i] ^ key[i];
        encryptedPixels[i] = encryptedPixels[i] ^ key[(i + 1) % pixels.length];
        encryptedPixels[i] = encryptedPixels[i] ^ key[(i + 2) % pixels.length];
    }
    return new ImageData(encryptedPixels, imageData.width, imageData.height);
};

const decryptImage = async (encryptedImageData, initialValue, r) => {
    const pixels = encryptedImageData.data;
    const key = generateKeySequence(initialValue, r, pixels.length);
    const decryptedPixels = new Uint8ClampedArray(pixels.length);
    for (let i = 0; i < pixels.length; i++) {
        decryptedPixels[i] = pixels[i] ^ key[i];
        decryptedPixels[i] = decryptedPixels[i] ^ key[(i + 1) % pixels.length];
        decryptedPixels[i] = decryptedPixels[i] ^ key[(i + 2) % pixels.length];
    }
    return new ImageData(decryptedPixels, encryptedImageData.width, encryptedImageData.height);
}