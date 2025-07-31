import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import RideLayout from "@/components/RideLayout";

const RideBooked = () => {
  const { userAddress, destinationAddress } = useLocationStore();

  // Mock driver data (in real app, this would come from API)
  const driverData = {
    name: "Sharon T",
    vehicleType: "White Kia Carnival",
    vehicleNumber: "vehicle #0",
    plateNumber: "LNZ2499",
    pickupTime: "21 min",
    paymentMethod: "VISA 6206",
    passengers: 1,
  };

  return (
    <RideLayout title="Ride Booked" snapPoints={["60%", "90%"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Pickup Information */}
        <View className="mb-6">
          <View className="flex-row items-start mb-2">
            <View className="flex-row items-center mr-3">
              <Image source={icons.person} className="w-4 h-4 mr-1" />
              <View className="flex-row">
                <View className="w-1 h-1 bg-gray-400 rounded-full mx-0.5" />
                <View className="w-1 h-1 bg-gray-400 rounded-full mx-0.5" />
                <View className="w-1 h-1 bg-gray-400 rounded-full mx-0.5" />
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-gray-600 text-sm font-medium">
                Pickup at:
              </Text>
              <Text className="text-black text-base font-semibold">
                {userAddress || "Saint Pauls Ave & Tonnele Ave"}
              </Text>
            </View>
          </View>
        </View>

        {/* Ride Details Card */}
        <View className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-4">
          {/* Top Row - Service Info */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <Image source={icons.map} className="w-6 h-6 mr-2" />
              <Text className="text-lg font-bold text-black">Rydo Car</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-green-600 font-semibold mr-1">
                Pickup in {driverData.pickupTime}
              </Text>
              <Image source={icons.arrowUp} className="w-4 h-4" />
            </View>
          </View>

          {/* Divider */}
          <View className="h-px bg-gray-200 mb-4" />

          {/* Driver and Vehicle Information */}
          <View className="mb-4">
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <View className="flex-row items-center mb-2">
                  <Image source={icons.target} className="w-5 h-5 mr-2" />
                  <Text className="text-lg font-semibold text-black">
                    {driverData.name}
                  </Text>
                </View>

                <Text className="text-gray-600 text-sm mb-1">
                  Vehicle type {driverData.vehicleType}
                </Text>
                <Text className="text-gray-600 text-sm mb-1">
                  Vehicle no. {driverData.vehicleNumber}
                </Text>
                <Text className="text-gray-600 text-sm">
                  Plate no. {driverData.plateNumber}
                </Text>
              </View>

              {/* Call Driver Button */}
              <TouchableOpacity className="w-12 h-12 bg-blue-500 rounded-full items-center justify-center">
                <Image source={icons.chat} className="w-6 h-6" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Destination Line and Info */}
          <View className="flex-row items-start">
            <View className="items-center mr-3">
              <View className="w-0.5 h-8 bg-blue-500" />
              <View className="w-3 h-3 bg-blue-500 rounded-full" />
            </View>
            <View className="flex-1">
              <Text className="text-black text-base font-medium">
                {destinationAddress || "Newport Centre Entrance on Mall Drive"}
              </Text>
            </View>
          </View>
        </View>

        {/* Payment and Passenger Details */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row space-x-3">
            {/* Payment Method */}
            <View className="bg-gray-100 rounded-full px-4 py-2 flex-row items-center">
              <Text className="text-blue-600 font-semibold mr-2">VISA</Text>
              <Text className="text-gray-700 font-medium">6206</Text>
            </View>
          </View>

          {/* More Options */}
          <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
            <View className="flex-row space-x-1">
              <View className="w-1 h-1 bg-gray-600 rounded-full" />
              <View className="w-1 h-1 bg-gray-600 rounded-full" />
              <View className="w-1 h-1 bg-gray-600 rounded-full" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View className="flex-row space-x-3 mt-6">
          <TouchableOpacity className="flex-1 bg-gray-100 py-4 rounded-xl items-center">
            <Text className="text-gray-700 font-semibold">Cancel Ride</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-blue-500 py-4 rounded-xl items-center">
            <Text className="text-white font-semibold">Track Ride</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </RideLayout>
  );
};

export default RideBooked;
