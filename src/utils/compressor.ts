import Compressor from 'compressorjs'

/**
 * 压缩文件
 * @param file
 * @returns
 */
export function compressFile(file: File): Promise<File | Blob> {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.85,
      success(result) {
        resolve(result)
      },
      error(err) {
        reject(err)
      }
    })
  })
}
