
//this is the geofence for the current location

import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Polyline, Circle } from 'react-native-maps'; // ← ADDED Circle
import Geolocation from '@react-native-community/geolocation';
import { getDistance } from 'geolib';

// Custom MapButton component for consistent styling and accessibility
const MapButton = ({ title, onPress, disabled, active }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    accessibilityLabel={title}
    accessibilityHint={"Tap to " + title.toLowerCase()}
    style={[
      styles.button,
      active && styles.buttonActive,
      disabled && styles.buttonDisabled,
    ]}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default function App() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isChoosingSource, setIsChoosingSource] = useState(false);
  const [isChoosingDestination, setIsChoosingDestination] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [insideGeofence, setInsideGeofence] = useState(false); // ← ADDED geofence state
  const mapRef = useRef(null);

  const defaultLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const loc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setLocation(loc);
        setLoading(false);
      },
      error => {
        Alert.alert(
          'Error',
          `Failed to get your location: ${error.message}.` +
            ' Showing default map region.'
        );
        setLocation(defaultLocation);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            Alert.alert(
              'Permission Denied',
              'Location permission is required to show your current location. Showing default map.'
            );
            setPermissionDenied(true);
            setLocation(defaultLocation);
            setLoading(false);
          }
        } catch (err) {
          console.warn(err);
          setPermissionDenied(true);
          setLocation(defaultLocation);
          setLoading(false);
        }
      } else {
        getCurrentLocation();
      }
    };

    requestLocationPermission();
  }, []);

  // ← ADDED: Watch position for geofence entry/exit
  useEffect(() => {
    let watchId;
    if (!loading && !permissionDenied && location) {
      watchId = Geolocation.watchPosition(
        ({ coords }) => {
          // calculate distance from current location (geofence center) to new coords
          const dist = getDistance(
            { latitude: coords.latitude, longitude: coords.longitude },
            { latitude: location.latitude, longitude: location.longitude }
          );
          const nowInside = dist <= 150; // 150m radius

          if (nowInside && !insideGeofence) {
            setInsideGeofence(true);
            Alert.alert('Geofence', 'You have ENTERED the hostel area.');
          } else if (!nowInside && insideGeofence) {
            setInsideGeofence(false);
            Alert.alert('Geofence', 'You have EXITED the hostel area.');
          }
        },
        err => console.warn(err),
        { enableHighAccuracy: true, distanceFilter: 5, interval: 5000 }
      );
    }
    return () => {
      if (watchId != null) Geolocation.clearWatch(watchId);
    };
  }, [loading, permissionDenied, insideGeofence, location]);
  // ← END ADDED

  const handleMapPress = e => {
    const coordinate = e.nativeEvent.coordinate;
    if (isChoosingSource) {
      setSource(coordinate);
      setIsChoosingSource(false);
    } else if (isChoosingDestination) {
      setDestination(coordinate);
      setIsChoosingDestination(false);
    }
  };

  const showCoordinates = () => {
    if (source && destination) {
      const distance =
        getDistance(
          { latitude: source.latitude, longitude: source.longitude },
          { latitude: destination.latitude, longitude: destination.longitude },
        ) / 1000;
      Alert.alert(
        'Coordinates and Distance',
        `Source: Lat ${source.latitude}, Lon ${source.longitude}\n` +
          `Destination: Lat ${destination.latitude}, Lon ${destination.longitude}\n` +
          `Distance: ${distance.toFixed(2)} km`
      );
    } else {
      Alert.alert(
        'Error',
        'Please select both source and destination coordinates.'
      );
    }
  };

  const removeSource = () => setSource(null);
  const removeDestination = () => setDestination(null);

  const zoomToMarker = marker => {
    if (mapRef.current && marker) {
      mapRef.current.animateToRegion({
        latitude: marker.latitude,
        longitude: marker.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {permissionDenied && (
            <View style={styles.banner}>
              <Text style={styles.bannerText}>
                Showing default map because location permission was denied.
              </Text>
            </View>
          )}

          {/* ← ADDED: Status banner */}
          {location && (
            <View style={styles.geofenceStatus}>
              <Text style={{ color: insideGeofence ? 'green' : 'red' }}>
                {insideGeofence
                  ? 'INSIDE HOSTEL AREA'
                  : 'OUTSIDE HOSTEL AREA'}
              </Text>
            </View>
          )}

          <MapView
            ref={mapRef}
            style={styles.map}
            showsUserLocation
            region={location}
            onPress={handleMapPress}
          >
            {/* ← ADDED: Geofence circle around current location */}
            {location && (
              <Circle
                center={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                radius={150}
                strokeWidth={2}
                strokeColor="rgba(255,0,0,0.8)"
                fillColor="rgba(255,0,0,0.3)"
              />
            )}

            <Marker coordinate={location} />
            {source && (
              <Marker
                coordinate={source}
                title="Source"
                description="Your source location"
                pinColor="green"
                onPress={() => zoomToMarker(source)}
              />
            )}
            {destination && (
              <Marker
                coordinate={destination}
                title="Destination"
                description="Your destination location"
                pinColor="blue"
                onPress={() => zoomToMarker(destination)}
              />
            )}
            {source && destination && (
              <Polyline
                coordinates={[source, destination]}
                strokeColor="#000"
                strokeWidth={2}
              />
            )}
          </MapView>

          {/* Floating Action Buttons (FABs) */}
          <View style={styles.fabContainer}>
            <MapButton
              title={
                isChoosingSource
                  ? 'Selecting Source'
                  : source
                  ? 'Remove Source'
                  : 'Choose Source'
              }
              onPress={source ? removeSource : () => setIsChoosingSource(true)}
              active={isChoosingSource}
              disabled={isChoosingDestination}
            />
            <MapButton
              title={
                isChoosingDestination
                  ? 'Selecting Dest'
                  : destination
                  ? 'Remove Dest'
                  : 'Choose Dest'
              }
              onPress={
                destination
                  ? removeDestination
                  : () => setIsChoosingDestination(true)
              }
              active={isChoosingDestination}
              disabled={isChoosingSource}
            />
            <MapButton
              title="Show Coords"
              onPress={showCoordinates}
              disabled={!source || !destination}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  // Banner for permission denial
  banner: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,0,0,0.8)',
    padding: 8,
    borderRadius: 8,
    zIndex: 1000,
  },
  bannerText: {
    color: '#fff',
    textAlign: 'center',
  },
  // ← ADDED: Geofence status style
  geofenceStatus: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 100 : 70,
    left: 20,
    padding: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 4,
    zIndex: 1000,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    alignItems: 'center',
    gap: 10, // consistent spacing
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    elevation: 4,
    minWidth: 140,
    alignItems: 'center',
  },
  buttonActive: {
    borderWidth: 2,
    borderColor: '#000',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 14,
    color: 'blue',
    fontWeight: '600',
  },
});






//the below is the normal map code 




// import React, {useEffect, useState, useRef} from 'react';
// import {
//   StyleSheet,
//   View,
//   Platform,
//   PermissionsAndroid,
//   Alert,
//   ActivityIndicator,
//   Text,
//   TouchableOpacity,
// } from 'react-native';
// import MapView, {Marker, Polyline} from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import {getDistance} from 'geolib';

// // Custom MapButton component for consistent styling and accessibility
// const MapButton = ({title, onPress, disabled, active}) => (
//   <TouchableOpacity
//     onPress={onPress}
//     disabled={disabled}
//     accessibilityLabel={title}
//     accessibilityHint={"Tap to " + title.toLowerCase()}
//     style={[
//       styles.button,
//       active && styles.buttonActive,
//       disabled && styles.buttonDisabled,
//     ]}
//   >
//     <Text style={styles.buttonText}>{title}</Text>
//   </TouchableOpacity>
// );

// export default function App() {
//   const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [source, setSource] = useState(null);
//   const [destination, setDestination] = useState(null);
//   const [isChoosingSource, setIsChoosingSource] = useState(false);
//   const [isChoosingDestination, setIsChoosingDestination] = useState(false);
//   const [permissionDenied, setPermissionDenied] = useState(false);
//   const mapRef = useRef(null);

//   const defaultLocation = {
//     latitude: 37.78825,
//     longitude: -122.4324,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   };

//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         setLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         });
//         setLoading(false);
//       },
//       error => {
//         Alert.alert(
//           'Error',
//           `Failed to get your location: ${error.message}.` +
//             ' Showing default map region.'
//         );
//         setLocation(defaultLocation);
//         setLoading(false);
//       }
//     );
//   };

//   useEffect(() => {
//     const requestLocationPermission = async () => {
//       if (Platform.OS === 'android') {
//         try {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           );
//           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             getCurrentLocation();
//           } else {
//             Alert.alert(
//               'Permission Denied',
//               'Location permission is required to show your current location. Showing default map.'
//             );
//             setPermissionDenied(true);  // flag for banner
//             setLocation(defaultLocation);
//             setLoading(false);
//           }
//         } catch (err) {
//           console.warn(err);
//           setPermissionDenied(true);
//           setLocation(defaultLocation);
//           setLoading(false);
//         }
//       } else {
//         getCurrentLocation();
//       }
//     };

//     requestLocationPermission();
//   }, []);

//   const handleMapPress = e => {
//     const coordinate = e.nativeEvent.coordinate;
//     if (isChoosingSource) {
//       setSource(coordinate);
//       setIsChoosingSource(false);
//     } else if (isChoosingDestination) {
//       setDestination(coordinate);
//       setIsChoosingDestination(false);
//     }
//   };

//   const showCoordinates = () => {
//     if (source && destination) {
//       const distance =
//         getDistance(
//           {latitude: source.latitude, longitude: source.longitude},
//           {latitude: destination.latitude, longitude: destination.longitude},
//         ) / 1000;
//       Alert.alert(
//         'Coordinates and Distance',
//         `Source: Lat ${source.latitude}, Lon ${source.longitude}\n` +
//         `Destination: Lat ${destination.latitude}, Lon ${destination.longitude}\n` +
//         `Distance: ${distance.toFixed(2)} km`
//       );
//     } else {
//       Alert.alert(
//         'Error',
//         'Please select both source and destination coordinates.'
//       );
//     }
//   };

//   const removeSource = () => setSource(null);
//   const removeDestination = () => setDestination(null);

//   const zoomToMarker = marker => {
//     if (mapRef.current && marker) {
//       mapRef.current.animateToRegion({
//         latitude: marker.latitude,
//         longitude: marker.longitude,
//         latitudeDelta: 0.05,
//         longitudeDelta: 0.05,
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <>
//           {permissionDenied && (
//             <View style={styles.banner}>
//               <Text style={styles.bannerText}>
//                 Showing default map because location permission was denied.
//               </Text>
//             </View>
//           )}
//           <MapView
//             ref={mapRef}
//             style={styles.map}
//             showsUserLocation
//             region={location}
//             onPress={handleMapPress}
//           >
//             <Marker coordinate={location} />
//             {source && (
//               <Marker
//                 coordinate={source}
//                 title="Source"
//                 description="Your source location"
//                 pinColor="green"
//                 onPress={() => zoomToMarker(source)}
//               />
//             )}
//             {destination && (
//               <Marker
//                 coordinate={destination}
//                 title="Destination"
//                 description="Your destination location"
//                 pinColor="blue"
//                 onPress={() => zoomToMarker(destination)}
//               />
//             )}
//             {source && destination && (
//               <Polyline
//                 coordinates={[source, destination]}
//                 strokeColor="#000"
//                 strokeWidth={2}
//               />
//             )}
//           </MapView>

//           {/* Floating Action Buttons (FABs) */}
//           <View style={styles.fabContainer}>
//             <MapButton
//               title={isChoosingSource ? 'Selecting Source' : (source ? 'Remove Source' : 'Choose Source')}
//               onPress={source ? removeSource : () => setIsChoosingSource(true)}
//               active={isChoosingSource}
//               disabled={isChoosingDestination}
//             />
//             <MapButton
//               title={isChoosingDestination ? 'Selecting Dest' : (destination ? 'Remove Dest' : 'Choose Dest')}
//               onPress={destination ? removeDestination : () => setIsChoosingDestination(true)}
//               active={isChoosingDestination}
//               disabled={isChoosingSource}
//             />
//             <MapButton
//               title="Show Coords"
//               onPress={showCoordinates}
//               disabled={!source || !destination}
//             />
//           </View>
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },

//   // Banner for permission denial
//   banner: {
//     position: 'absolute',
//     top: Platform.OS === 'ios' ? 50 : 20,
//     left: 20,
//     right: 20,
//     backgroundColor: 'rgba(255,0,0,0.8)',
//     padding: 8,
//     borderRadius: 8,
//     zIndex: 1000,
//   },
//   bannerText: {
//     color: '#fff',
//     textAlign: 'center',
//   },

//   fabContainer: {
//     position: 'absolute',
//     bottom: 15,
//     left: 20,
//     alignItems: 'center',
//     gap: 10, // consistent spacing
//   },

//   button: {
//     backgroundColor: '#fff',
//     paddingVertical: 10,
//     paddingHorizontal: 14,
//     borderRadius: 20,
//     elevation: 4,
//     minWidth: 140,
//     alignItems: 'center',
//   },
//   buttonActive: {
//     borderWidth: 2,
//     borderColor: '#000',
//   },
//   buttonDisabled: {
//     opacity: 0.5,
//   },
//   buttonText: {
//     fontSize: 14,
//     color: 'blue',
//     fontWeight: '600',
//   },
// });