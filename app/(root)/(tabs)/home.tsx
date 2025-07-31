import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { icons } from "@/constants";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { useLocationStore } from "@/store";
import Map from "@/components/Map";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GoogleTextInput from "@/components/GoogleTextInput";
import MapView from "react-native-maps";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [, setHasPermissions] = useState(false);
  // const { setUserLocation, userAddress } = useLocationStore();
  // const [pickupAddress, setPickupAddress] = useState(userAddress || "");
  // const [destinationAddress, setDestinationAddress] = useState("");

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null);
  const snapPoints = ["45%", "85%"];

  const expandBottomSheet = () => {
    try {
      bottomSheetRef.current?.expand();
    } catch {
      bottomSheetRef.current?.snapToIndex(1);
    }
  };

  const handlePickupFocus = () => {
    setTimeout(() => {
      expandBottomSheet();
    }, 100);
  };

  const handleDestinationFocus = () => {
    setTimeout(() => {
      expandBottomSheet();
    }, 100);
  };

  const collapseBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleMapPress = () => {
    collapseBottomSheet();
  };

  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
    userLatitude,
    userLongitude,
    validation,
  } = useLocationStore();

  const handleRecenter = () => {
    if (mapRef.current && userLatitude && userLongitude) {
      mapRef.current.animateToRegion(
        {
          latitude: userLatitude,
          longitude: userLongitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    } else {
      console.log("Cannot recenter: missing ref or coordinates");
    }
  };

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setHasPermissions(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync();

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    };
    requestLocation();
  }, [setUserLocation]);

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-white">
        <View style={{ height: "55%" }}>
          <View className="absolute z-10 top-16 left-5">
            <Text className="text-2xl font-JakartaExtraBold text-black">
              Welcome &nbsp; {user?.firstName}
            </Text>
          </View>

          <View className="absolute z-10 top-16 right-5">
            <TouchableOpacity
              onPress={handleSignOut}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "white",
              }}
            >
              <Image source={icons.out} style={{ width: 16, height: 16 }} />
            </TouchableOpacity>
          </View>

          <Map onPress={handleMapPress} ref={mapRef} />

          {/* Recenter Button */}
          <TouchableOpacity
            onPress={handleRecenter}
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Image
              source={icons.target}
              style={{ width: 24, height: 24 }}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>

        <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} index={0}>
          <BottomSheetView
            style={{
              flex: 1,
              padding: 20,
              borderRadius: 30,
            }}
          >
            <Text className="text-xl font-JakartaBold mb-4">Book a Ride</Text>

            <View className="mb-4">
              {/* Pickup Location Input */}
              <View className="mb-2">
                <View className="bg-gray-100 p-3 rounded-lg">
                  <View className="flex-row items-center mb-2">
                    <Text className="font-JakartaBold">Start from</Text>
                  </View>
                  <GoogleTextInput
                    icon={icons.target}
                    initialLocation={userAddress || "Current Location"}
                    containerStyle="bg-neutral-100"
                    textInputBackgroundColor="#f5f5f5"
                    handlePress={(location) => setUserLocation(location)}
                    onFocus={handlePickupFocus}
                  />
                </View>
              </View>

              {/* Destination Input */}
              <View className="bg-gray-100 p-3 rounded-lg">
                <View className="flex-row items-center mb-2">
                  <Text className="font-JakartaBold">Where to?</Text>
                </View>
                <GoogleTextInput
                  icon={icons.map}
                  initialLocation={destinationAddress || undefined}
                  containerStyle="bg-neutral-100"
                  textInputBackgroundColor="transparent"
                  handlePress={(location) => setDestinationLocation(location)}
                  onFocus={handleDestinationFocus}
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="font-JakartaMedium text-gray-600 mb-2">
                Saved Locations
              </Text>
              <TouchableOpacity className="bg-gray-50 p-3 rounded-lg mb-2 flex-row items-center">
                <Image
                  source={icons.home}
                  style={{ width: 16, height: 16, marginRight: 10 }}
                />
                <Text>Tap to add your home address</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-gray-50 p-3 rounded-lg mb-2 flex-row items-center">
                <Image
                  source={icons.list}
                  style={{ width: 16, height: 16, marginRight: 10 }}
                />
                <Text>Tap to add your work address</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-gray-50 p-3 rounded-lg flex-row items-center">
                <Image
                  source={icons.star}
                  style={{ width: 16, height: 16, marginRight: 10 }}
                />
                <Text>Sister&apos;s House</Text>
              </TouchableOpacity>
            </View>

            {/* Validation Status */}
            <View
              className="mb-4 p-3 rounded-lg"
              style={{
                backgroundColor: validation.bothInRegion
                  ? "#d4edda"
                  : "#f8d7da",
                borderColor: validation.bothInRegion ? "#c3e6cb" : "#f5c6cb",
                borderWidth: 1,
              }}
            >
              <Text
                style={{
                  color: validation.bothInRegion ? "#155724" : "#721c24",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                {validation.message}
              </Text>
            </View>

            <TouchableOpacity
              className={`p-4 rounded-lg ${validation.bothInRegion ? "bg-blue-500" : "bg-gray-400"}`}
              onPress={() => {
                if (validation.bothInRegion) {
                  router.push("/find-ride");
                } else {
                  console.log("Cannot book: locations outside service area");
                }
              }}
              disabled={!validation.bothInRegion}
            >
              <Text className="text-white text-center font-JakartaBold text-lg">
                {validation.bothInRegion ? "Find Ride" : "Service Area Only"}
              </Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
