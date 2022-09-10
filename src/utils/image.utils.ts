interface IImage {
    image: string
    filename: string
}
import { decode } from 'punycode'

function b64toBlob(b64Data: string, contentType = '', sliceSize = 512) {
    const byteCharacters = decode(b64Data)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)

        const byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)
        byteArrays.push(byteArray)
    }

    const blob = new Blob(byteArrays, { type: contentType })

    return blob
}

// function getInfo(filename: string) {
//     const filename = image.uri.split('/').pop()!
//     const ext = filename.split('.').pop()!.toLowerCase()

//     return { mime: `image/${ext}`, ext, filename }
// }

export function base64ToFile({ image, filename }: IImage) {
    const ext = filename.split('.').pop()?.toLowerCase()

    const mime = `image/${ext}`
    const blob: any = b64toBlob(image, mime)

    return new File([blob], filename, { type: mime })
}
export {}
