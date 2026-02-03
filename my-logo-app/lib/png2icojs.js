/**
 * @author Tiet Vadim
 */
/**
 * Provides a converter from PNG to ICO format
 */
export class PngIcoConverter {
    /**
     * Creates a new converter
     * @param {PngIcoConverterOptions} options - Conversion options
     */
    constructor(options) {
        this.options = Object.assign({
            imageSizeLimit: 256,
        }, options);
    }
    /**
     * Converts the given PNG files into a single ICO file
     * @param {PngIcoConversionInput[]} inputs - PNG files
     * @returns {Promise<Uint8Array>} ICO file
     */
    async convertAsync(inputs) {
        this.checkInputs(inputs);
        const header = this.createHeader(inputs.length);
        const imageDirectories = [];
        const imageDatas = [];
        let offset = header.length + (16 * inputs.length);
        for (const input of inputs) {
            const image = await this.readImageAsync(input.png);
            const directory = this.createImageDirectory(image, offset);
            imageDirectories.push(directory);
            imageDatas.push(image.data);
            offset += image.data.length;
        }
        const result = new Uint8Array(offset);
        let resultOffset = 0;
        result.set(header, resultOffset);
        resultOffset += header.length;
        for (const directory of imageDirectories) {
            result.set(directory, resultOffset);
            resultOffset += directory.length;
        }
        for (const data of imageDatas) {
            result.set(data, resultOffset);
            resultOffset += data.length;
        }
        return result;
    }
    /**
     * Converts the given PNG files into a single ICO file
     * @param {PngIcoConversionInput[]} inputs - PNG files
     * @returns {Promise<Blob>} ICO file
     */
    async convertToBlobAsync(inputs) {
        const array = await this.convertAsync(inputs);
        return new Blob([array], {
            type: 'image/x-icon',
        });
    }
    /**
     * Checks the given inputs for validity
     * @param {PngIcoConversionInput[]} inputs - PNG files
     * @returns {void}
     */
    checkInputs(inputs) {
        if (!Array.isArray(inputs) || (inputs.length === 0)) {
            throw new Error('No images given');
        }
        for (const input of inputs) {
            if (!(input.png instanceof File)) {
                throw new Error('Input is not a file');
            }
            if (input.png.type !== 'image/png') {
                throw new Error('Input is not a png file');
            }
        }
    }
    /**
     * Creates an ICO file header
     * @param {number} imageCount - Number of images in the file
     * @returns {Uint8Array} Header
     */
    createHeader(imageCount) {
        const buffer = new ArrayBuffer(6);
        const view = new DataView(buffer);
        // Reserved. Must be 0.
        view.setUint16(0, 0, true);
        // Specifies image type: 1 for icon (.ICO) image
        view.setUint16(2, 1, true);
        // Specifies number of images in the file.
        view.setUint16(4, imageCount, true);
        return new Uint8Array(buffer);
    }
    /**
     * Creates an ICO image directory
     * @param {PngImage} image - PNG image
     * @param {number} offset - Offset of the image data in the file
     * @returns {Uint8Array} Image directory
     */
    createImageDirectory(image, offset) {
        const buffer = new ArrayBuffer(16);
        const view = new DataView(buffer);
        // Specifies image width in pixels.
        view.setUint8(0, image.width);
        // Specifies image height in pixels.
        view.setUint8(1, image.height);
        // Specifies number of colors in the color palette. Should be 0 if the image does not use a color palette.
        view.setUint8(2, 0);
        // Reserved. Should be 0.
        view.setUint8(3, 0);
        // Specifies color planes. Should be 0 or 1.
        view.setUint16(4, 0, true);
        // Specifies bits per pixel.
        view.setUint16(6, 32, true);
        // Specifies the size of the image's data in bytes.
        view.setUint32(8, image.data.length, true);
        // Specifies the offset of BMP or PNG data from the beginning of the ICO/CUR file.
        view.setUint32(12, offset, true);
        return new Uint8Array(buffer);
    }
    /**
     * Reads a PNG file
     * @param {File} file - PNG file
     * @returns {Promise<PngImage>} PNG image
     */
    async readImageAsync(file) {
        const array = await this.readFileAsArrayAsync(file);
        const view = new DataView(array.buffer);
        // See http://www.libpng.org/pub/png/spec/1.2/PNG-Structure.html#IHDR
        const width = view.getUint32(16, false);
        const height = view.getUint32(20, false);
        if (!this.options.ignoreImageSizeLimit) {
            if (width > this.options.imageSizeLimit) {
                throw new Error(`Image width cannot be greater than ${this.options.imageSizeLimit}`);
            }
            if (height > this.options.imageSizeLimit) {
                throw new Error(`Image height cannot be greater than ${this.options.imageSizeLimit}`);
            }
        }
        return {
            width: width,
            height: height,
            data: array,
        };
    }
    /**
     * Reads a file as an Uint8Array
     * @param {File} file - File
     * @returns {Promise<Uint8Array>} File content
     */
    readFileAsArrayAsync(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                if (result instanceof ArrayBuffer) {
                    resolve(new Uint8Array(result));
                }
                else {
                    reject(new Error('Cannot read file'));
                }
            };
            reader.onerror = (ev) => {
                reject(ev);
            };
            reader.readAsArrayBuffer(file);
        });
    }
}
//# sourceMappingURL=png2ico.js.map