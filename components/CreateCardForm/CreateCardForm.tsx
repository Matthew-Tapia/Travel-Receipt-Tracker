'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import './styles.css'
import Image from "next/image";

interface ItineraryJSON {
    date: string,
    startTime: string,
    endTime: string,
    startLocation: string,
    endLocation: string
}

interface CreateCardFormProps {
    itineraryData: ItineraryJSON;
    imageURL: string
    close: () => void;
}

const CreateCardForm: React.FC<CreateCardFormProps> = ({ itineraryData, imageURL, close }) => {
    const [date, setDate] = useState<string>(itineraryData.date)
    const [startTime, setStartTime] = useState<string>(itineraryData.startTime)
    const [endTime, setEndTime] = useState<string>(itineraryData.endTime)
    const [startLocation, setStartLocation] = useState<string>(itineraryData.startLocation)
    const [endLocation, setEndLocation] = useState<string>(itineraryData.endLocation)

    const [components, setComponents] = useState<Array<ItineraryJSON>>([])

    useEffect(() => {
        const storedComponents = JSON.parse(localStorage.getItem("components")!) || []
        setComponents(storedComponents)
    }, [])

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const newComponent : ItineraryJSON = {
            date: date,
            startTime: startTime,
            endTime: endTime,
            startLocation: startLocation,
            endLocation: endLocation
        }

        const updatedComponents = [...components, newComponent]
        setComponents(updatedComponents)
        localStorage.setItem("components", JSON.stringify(updatedComponents))
        close()
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="bg-black bg-opacity-60 absolute inset-0"></div>
            <div className="modal bg-white w-3/4 h-3/4 rounded-md p-4 relative z-20 flex flex-col justify-between">
                <h1 className="flex justify-center text-4xl font-bold mb-4">Enter details:</h1>
                <div className='flex flex-row gap-4 items-center'>
                    <p><strong>Date: </strong><input onChange={(e) => { setDate(e.target.value) }} type="text" value={date}></input></p>
                    <p><strong>Start time:</strong><input onChange={(e) => { setStartTime(e.target.value) }} type="text" value={startTime}></input></p>
                    <p><strong>End time:</strong><input onChange={(e) => { setEndTime(e.target.value) }} type="text" value={endTime}></input></p>
                    <p><strong>Start location:</strong><input onChange={(e) => { setStartLocation(e.target.value) }} type="text" value={startLocation}></input></p>
                    <p><strong>End location:</strong><input onChange={(e) => { setEndLocation(e.target.value) }} type="text" value={endLocation}></input></p>
                </div>
                {imageURL && 
                <div className="flex justify-center">
                    <Image width='400' height='400' src={imageURL} alt="Uploaded file preview" />
                </div>}
                <button className="bg-neutral-200 p-4" onClick={handleSubmit}>Save</button>

            </div>
        </div>



    );
}

export default CreateCardForm;
