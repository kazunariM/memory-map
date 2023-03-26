import { ChangeEvent, FC, useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent, useMapEvents } from 'react-leaflet'
import * as L from 'leaflet';
import { LatLng } from 'leaflet';
import "leaflet/dist/leaflet.css"

const redIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

type Props = {
    lat: number | null
    lon: number | null
}

const Map = (props: Props) => {
    const [map, setMap] = useState<L.Map>()
    const [marker, setMarker] = useState<L.Marker | null>()
    const [position, setPosition] = useState<LatLng | null>()
    const defaultPosition = new LatLng(35.68209024197379, 139.76712479998636)

    function MapComponent() {
        const map = useMapEvents({})
        useEffect(() => {
            setMap(map)
        }, [map])
        return null
    }

    useEffect(() => {
        if (map) {
            if (position) {
                {marker && map.removeLayer(marker)}
                setMarker(L.marker(position).setIcon(redIcon))
                map.setView(position, map.getZoom())
                setMap(map)    
            }
        }
    }, [position])

    useEffect(() => {
        setPosition((props.lat && props.lon) ? new LatLng(props.lat, props.lon) : null)
    }, [props.lat, props.lon])

    useEffect(() => {
        if (marker && map) {
            marker.addTo(map)
        }
    }, [marker])

    return (
        <>
        <MapContainer
            center={(props.lat && props.lon) ? new LatLng(props.lat, props.lon) : defaultPosition}
            zoom={13}
            scrollWheelZoom={true}
            style={{
                width: '100%',
                height: '100%'
            }}
        >
            <TileLayer
                url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors' 
            />
            <MapComponent />
        </MapContainer>
        </>
    )
}

export default Map