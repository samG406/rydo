// import React from "react";
import { View, Text,
  //   TouchableOpacity,
      Image } from "react-native";
import { icons } from "@/constants";
import RideLayout from "@/components/RideLayout";
import React, { useEffect } from "react";
import { router } from "expo-router";

const ProcessingRide = () => {

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/(root)/ride-booked")
    }, 5000);

    return () => clearTimeout(timer);
  }, [])



  return (
    <RideLayout title="Ride">
      <Text className="font-JakartaBold text-2xl text-center mb-8">
        Processing your request...
      </Text>

      {/* Ride Details */}
      <View className="space-y-6">
        {/* Origin */}
        <View className="flex-row items-center">
          <Image source={icons.arrowUp} className="w-5 h-5 mr-3" />
          <View className="flex-1">
            <Text className="font-JakartaMedium text-gray-600 text-sm">
              Origin
            </Text>
            <Text className="font-JakartaMedium text-gray-800">
              321 West Jersey Street, Elizabeth, NJ, USA
            </Text>
          </View>
        </View>

        {/* Destination */}
        <View className="flex-row items-center mt-4 mb-4">
          <Image source={icons.arrowDown} className="w-5 h-5 mr-3" />
          <View className="flex-1">
            <Text className="font-JakartaMedium text-gray-600 text-sm">
              Destination
            </Text>
            <Text className="font-JakartaMedium text-gray-800">
              273 North Broad Street, Elizabeth, NJ, USA
            </Text>
          </View>
          <Text className="font-JakartaMedium text-gray-800"></Text>
        </View>

        {/* Payment Information */}
        <View className="flex-row items-center mt-4">
          <Text className="font-JakartaBold text-gray-800 mr-2">VISA</Text>
          <Text className="font-JakartaMedium text-gray-600">
            Paid by: Visa 6206
          </Text>
        </View>
      </View>
    </RideLayout>
  );
};

export default ProcessingRide;