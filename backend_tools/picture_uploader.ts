import { deleteObject, getBlob, getStorage, ref, uploadBytes, UploadResult } from "firebase/storage"
class PictureUploader {
    storage = getStorage()
    image_path = "images"

    /// Uploads an image to our storage bucket
    /// if image name is undefined, it will be left as an empty string
    async uploadImage(image: Blob, subpath: string, image_name?: string): Promise<UploadResult> {
        const pad: string = image_name !== undefined ? `/${image_name}.jpg` : ""
        const storageRef = ref(this.storage, `${this.image_path}/${subpath}${pad}`)
        return uploadBytes(storageRef, image)
    }

    /// downloads an image from firebase and exposes it in the form of a blob
    /// the subpath parameter signifies where it is stored (eg users)
    /// will fetch image from images/subpath/image_name
    async downloadImage(subpath: string, image_name: string) {
        const image_reference = ref(this.storage, `${this.image_path}/${subpath}/${image_name}`)
        return getBlob(image_reference)
    }

    async deleteImage(subpath: string, image_name: string): Promise<boolean> {
        const image_reference = ref(this.storage, `${this.image_path}/${subpath}/${image_name}`)
        try {
            deleteObject(image_reference)
            return true
        } catch (error) {

            console.log(error);
            return false

        }
    }
}

export default PictureUploader