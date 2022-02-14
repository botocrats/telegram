import { ITUser } from '../user'
import { ITMessage } from '../message'

export interface ITLocationBasic {
  longitude: number
  latitude: number
  horizontal_accuracy?: number
}
export interface ITLiveLocation extends ITLocationBasic {
  heading?: number
  proximity_alert_radius?: number
  live_period?: number
}

interface ITProximityAlertTriggered {
  traveler: ITUser
  watcher: ITUser
  distance: number
}

export interface ITLocationMethods {
    editMessageLiveLocation: (params) => Promise <ITMessage|boolean>
    stopMessageLiveLocation: (params) => Promise<ITMessage|boolean>
}

export interface ITVenueBase {
  title: string
  address: string
  foursquare_id?: string
  foursquare_type?: string
  google_place_id?: string
  google_place_type?: string
}
interface ITVenue extends ITVenueBase {
  location: Required<ITLocationBasic>
}