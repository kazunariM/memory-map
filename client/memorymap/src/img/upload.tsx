import EXIF from "exif-js"
import { ChangeEvent, useEffect, useState } from "react"

type Props = {
    loadedData: (date: string|null, src: string|ArrayBuffer|null, lat: number|null, lon: number|null) => void
}

const ImageUpload = (props: Props) => {
    const [image, setImage] = useState<string | ArrayBuffer | null>(null)
    const [exifLat, setexifLat] = useState<number | null>(null)
    const [exifLon, setexifLon] = useState<number | null>(null)
    const [exifDate, setexifDate] = useState<string | null>(null)

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        let reader = new FileReader()

        if (e.target.files !== null) {
            let file = e.target.files[0]
            reader.onloadend = () => {
                setImage(reader.result)
                // @ts-ignore
                EXIF.getData(file, function(this: any) {
                    const lat: Array<number | null> = EXIF.getTag(this, 'GPSLatitude')
                    const lon: Array<number | null> = EXIF.getTag(this, 'GPSLongitude')

                    const date: string = EXIF.getTag(this, 'DateTime')
                    setexifDate(date ? date : null)

                    if (lat && lat.length > 2 && lat[0] !== null && lat[1] !== null && lat[2] !== null && lon && lon.length > 2 && lon[0] !== null && lon[1] !== null && lon[2] !== null) {
                        setexifLat(lat[0]+lat[1]/60+lat[2]/3600)
                        setexifLon(lon[0]+lon[1]/60+lon[2]/3600)
                    } else {
                        setexifLat(null)
                        setexifLon(null)
                    }
                })
            }

            if (file !== undefined) {
                reader.readAsDataURL(file)
            } else {
                setImage(null)
                setexifLat(null)
                setexifLon(null)
                setexifDate(null)
            }
        }
    }

    useEffect(() => {
        props.loadedData(exifDate, image, exifLat, exifLon)
    }, [props, exifDate, image, exifLat, exifLon])

    return (
        <p><input type="file" accept="image/jpeg,image/png" onChange={handleImageChange}/></p>
    )
}

export default ImageUpload