import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab/Rating'

import useStyles from './styles'
import mapStyles from './mapStyles'

const Map = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData }) => {
  const classes = useStyles()
  const isMobile = useMediaQuery('(min-width:600px)')

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng })
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            key={i}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
          >
            {!isMobile ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography className={classes.Typography} variant="subtitle2" glutterBottom>
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  height="50"
                  src={place.photo ? place.photo.images.large.url : '/images/Restaurant-Placeholder.jpg'}
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
        {weatherData?.list?.length && weatherData.list.map((data, i) => (
            <div
              key={i}
              lat={data.coord.lat}
              lng={data.coord.lon}
            >
              <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="50px" alt="weather" />
            </div>
          ))}
      </GoogleMapReact>
    </div>
  )
}

export default Map
