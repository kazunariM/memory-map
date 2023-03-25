import { ChangeEvent, useEffect, useState } from "react"

type Props = {
    loadedData: (image: string|ArrayBuffer|null) => void
}

const ImageUpload = (props: Props) => {
    const [image, setImage] = useState<string | ArrayBuffer | null>(null)

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        let reader = new FileReader()

        if (e.target.files !== null) {
            let file = e.target.files[0]
            reader.onloadend = () => {
                setImage(reader.result)
            }

            if (file !== undefined) {
                reader.readAsDataURL(file)
            } else {
                setImage(null)
            }
        }
    }

    useEffect(() => {
        props.loadedData(image)
    }, [props, image])

    return (
        <p><input type="file" accept="image/jpeg,image/png" onChange={handleImageChange}/></p>
    )
}

export default ImageUpload