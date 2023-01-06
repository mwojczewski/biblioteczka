import { Location } from "../App"
import { useStorageContext } from "../contexts/StorageContext"

export default function LocationListEntryComponent(location:Location) {

    const { locations, books } = useStorageContext()

    const translateLocation = (id: string): string => {
        let location = locations.find(location => location.id === id)
        return typeof(location) !== "undefined" ? location.name : "brak danych"
    }

    const countBooks = (id: string): number => {
        return books.filter(book => book.locationID === id).length
    }

    const getLocationIndex = (id: string): number=> {
        return locations.findIndex(l => l.id === id)
    }

    return (
    <tr>
        <td>{getLocationIndex(location.id) + 1}</td>
        <td>{translateLocation(location.id)}</td>
        <td>{countBooks(location.id)}</td>
    </tr>
    )
}