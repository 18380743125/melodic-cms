import Compressor from 'compressorjs'

/**
 * 压缩文件
 * @param file
 * @returns
 */
export function compressFile(file: File, quality = 0.75): Promise<File | Blob> {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality,
      success(result) {
        resolve(result)
      },
      error(err) {
        reject(err)
      }
    })
  })
}
