

// import React, {useEffect, useState, useRef} from 'react';
// import {
//   StyleSheet,
//   View,
//   Platform,
//   PermissionsAndroid,
//   Alert,
//   ActivityIndicator,
//   Button,
// } from 'react-native';
// import MapView, {Marker, Polyline} from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import {getDistance} from 'geolib';

// export default function App() {
//   const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [source, setSource] = useState(null);
//   const [destination, setDestination] = useState(null);
//   const [isChoosingSource, setIsChoosingSource] = useState(false);
//   const [isChoosingDestination, setIsChoosingDestination] = useState(false);
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
//           `Failed to get your location: ${error.message}` +
//             ' Make sure your location is enabled.',
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
//               'Location permission is required to show your current location on the map.',
//             );
//             setLocation(defaultLocation);
//             setLoading(false);
//           }
//         } catch (err) {
//           console.warn(err);
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
//         ) / 1000; // Convert to kilometers
//       Alert.alert(
//         'Coordinates and Distance',
//         `Source: \nLatitude: ${source.latitude}, Longitude: ${
//           source.longitude
//         }\n\nDestination: \nLatitude: ${destination.latitude}, Longitude: ${
//           destination.longitude
//         }\n\nDistance between source and destination: ${distance.toFixed(
//           2,
//         )} kilometers`,
//       );
//     } else {
//       Alert.alert(
//         'Error',
//         'Please select both source and destination coordinates.',
//       );
//     }
//   };

//   const removeSource = () => {
//     setSource(null);
//   };

//   const removeDestination = () => {
//     setDestination(null);
//   };

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
//           <MapView
//             ref={mapRef}
//             style={styles.map}
//             showsUserLocation={true}
//             region={location}
//             onPress={handleMapPress}>
//             {/* Render default markers */}
//             <Marker coordinate={location} />
//             {/* Render main markers */}
//             {source && (
//               <Marker
//                 coordinate={source}
//                 title={'Source'}
//                 description={'Your source location'}
//                 pinColor={'green'}
//                 onPress={() => zoomToMarker(source)}
//               />
//             )}
//             {destination && (
//               <Marker
//                 coordinate={destination}
//                 title={'Destination'}
//                 description={'Your destination location'}
//                 pinColor={'blue'}
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
//           <View style={styles.buttonContainer}>
//             <View style={styles.buttonGroup}>
//               {source ? (
//                 <Button title="Remove Source" onPress={removeSource} />
//               ) : (
//                 <Button
//                   title={
//                     isChoosingSource ? 'Please Choose Source' : 'Choose Source'
//                   }
//                   onPress={() => setIsChoosingSource(true)}
//                 />
//               )}
//               {destination ? (
//                 <Button
//                   title="Remove Destination"
//                   onPress={removeDestination}
//                 />
//               ) : (
//                 <Button
//                   title={
//                     isChoosingDestination
//                       ? 'Please Choose Destination'
//                       : 'Choose Destination'
//                   }
//                   onPress={() => setIsChoosingDestination(true)}
//                 />
//               )}
//             </View>
//             <Button title="Show Coordinates" onPress={showCoordinates} />
//           </View>
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },

//   buttonContainer: {
//     position: 'absolute',
//     bottom: 30,
//     left: 20,
//     right: 20,
//     zIndex: 999,
//     backgroundColor: 'rgba(255, 255, 255, 0.95)',
//     borderRadius: 16,
//     padding: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 8,
//   },

//   buttonGroup: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//     gap: 10,
//   },

//   sourceButton: {
//     backgroundColor: '#4CAF50',
//     color: 'white',
//   },

//   destinationButton: {
//     backgroundColor: '#2196F3',
//     color: 'white',
//   },

//   showCoordButton: {
//     backgroundColor: '#000',
//     color: 'white',
//   },
// });

import React, {useEffect, useState, useRef} from 'react';
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
import MapView, {Marker, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {getDistance} from 'geolib';

// Custom MapButton component for consistent styling and accessibility
const MapButton = ({title, onPress, disabled, active}) => (
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
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
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
            setPermissionDenied(true);  // flag for banner
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
          {latitude: source.latitude, longitude: source.longitude},
          {latitude: destination.latitude, longitude: destination.longitude},
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
          <MapView
            ref={mapRef}
            style={styles.map}
            showsUserLocation
            region={location}
            onPress={handleMapPress}
          >
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
              title={isChoosingSource ? 'Selecting Source' : (source ? 'Remove Source' : 'Choose Source')}
              onPress={source ? removeSource : () => setIsChoosingSource(true)}
              active={isChoosingSource}
              disabled={isChoosingDestination}
            />
            <MapButton
              title={isChoosingDestination ? 'Selecting Dest' : (destination ? 'Remove Dest' : 'Choose Dest')}
              onPress={destination ? removeDestination : () => setIsChoosingDestination(true)}
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