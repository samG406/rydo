//import React, { useEffect, useState } from "react";
//import { ActivityIndicator, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polygon } from "react-native-maps";
import { forwardRef } from "react";
import { useLocationStore } from "@/store";
import { BETH_REGION, icons } from "@/constants";
// import { useDriverStore } from "@/store";
import {
  // calculateDriverTimes,
  calculateRegion,
  // generateMarkersFromData,
} from "@/lib/map";

// import { useFetch } from "@/lib/fetch";
// import { Driver, MarkerData } from "@/types/type";
import MapViewDirections from "react-native-maps-directions";

interface MapProps {
  onPress?: () => void;
}

const Map = forwardRef<MapView, MapProps>(({ onPress }, ref) => {
  // const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver");

  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();
  // const { selectedDriver, setDrivers } = useDriverStore();
  // const [markers, setMarkers] = useState<MarkerData[]>([]);

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  // setting the drivers car location
  // useEffect(() => {
  //   if (drivers && Array.isArray(drivers)) {
  //     if (!userLatitude || !userLongitude) return;

  //     const newMarkers = generateMarkersFromData({
  //       data: drivers,
  //       userLatitude,
  //       userLongitude,
  //     });

  //     setMarkers(newMarkers);
  //   }
  // }, [drivers, userLatitude, userLongitude]);

  // useEffect(() => {
  //   if (
  //     markers.length > 0 &&
  //     destinationLatitude !== undefined &&
  //     destinationLongitude !== undefined
  //   ) {
  //     calculateDriverTimes({
  //       markers,
  //       userLatitude,
  //       userLongitude,
  //       destinationLatitude,
  //       destinationLongitude,
  //     }).then((drivers) => {
  //       setDrivers(drivers as MarkerData[]);
  //     });
  //   }
  // }, [
  //   markers,
  //   destinationLatitude,
  //   destinationLongitude,
  //   userLatitude,
  //   userLongitude,
  //   setDrivers,
  // ]);

  // if (loading || (!userLatitude && !userLongitude)) {
  //   return (
  //     <View
  //       style={{
  //         flexDirection: "row",
  //         justifyContent: "space-between",
  //         alignItems: "center",
  //         width: "100%",
  //       }}
  //     >
  //       <ActivityIndicator size="small" color="#000" />
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View
  //       style={{
  //         flexDirection: "row",
  //         justifyContent: "space-between",
  //         alignItems: "center",
  //         width: "100%",
  //       }}
  //     >
  //       <Text>Error: {error}</Text>
  //     </View>
  //   );
  // }

  return (
    <MapView
      ref={ref}
      provider={PROVIDER_GOOGLE}
      style={{ width: "100%", height: "100%" }}
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      region={region || undefined}
      showsUserLocation={true}
      userInterfaceStyle="light"
      onPress={onPress}
    >
      {/* Service Region Polygon */}
      <Polygon
        coordinates={BETH_REGION}
        fillColor="rgba(0, 128, 255, 0.1)"
        strokeColor="rgba(0, 128, 255, 0.5)"
        strokeWidth={2}
      />

      {/* Driver markers - commented out */}
      {/* {markers && markers.length > 0 && markers.map((marker, index) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === +marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))} */}

      {destinationLatitude && destinationLongitude && (
        <>
          <Marker
            key="destination"
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title="Destination"
            image={icons.pin}
          />
          <MapViewDirections
            origin={{
              latitude: userLatitude!,
              longitude: userLongitude!,
            }}
            destination={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
            strokeColor="#0286FF"
            strokeWidth={2}
          />
        </>
      )}
    </MapView>
  );
});

Map.displayName = "Map";

export default Map;
