import { ChangeEvent, FC, useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent, useMapEvents } from 'react-leaflet'
import * as L from 'leaflet';
import { LatLng } from 'leaflet';
import "leaflet/dist/leaflet.css"

const Map = () => {
    const defaultPosition = new LatLng(35.68209024197379, 139.76712479998636)

    return (
        <>
        <MapContainer
            center={defaultPosition}
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

        </MapContainer>
        </>
    )
}

export default Map