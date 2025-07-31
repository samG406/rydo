import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { router } from "expo-router";
import { icons } from "@/constants";
import RideLayout from "@/components/RideLayout";

const ConfirmRide = () => {
  const [selectedRide, setSelectedRide] = useState(0);

  const rideOptions = [
    {
      id: 0,
      type: "Rydo Car",
      route: "1",
      pickup: "5 min from 321 West Jersey Street, Elizabeth, NJ, USA",
      arrival: "11:35 AM",
      price: "$2.00",
      color: "bg-white",
      selected: true,
    },
    {
      id: 1,
      type: "Rydo Car",
      route: "2",
      pickup: "20 min from 321 West Jersey Street, Elizabeth, NJ, USA",
      arrival: "11:38 AM",
      price: "$2.00",
      color: "bg-white",
      selected: false,
    },
  ];

  return (
    <RideLayout title="Ride" snapPoints={["85%"]}>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Ride Options */}
        <View className="space-y-4">
          {rideOptions.map((ride, index) => (
            <TouchableOpacity
              key={ride.id}
              onPress={() => setSelectedRide(ride.id)}
              className={`${ride.color} rounded-xl p-4 border ${
                selectedRide === ride.id ? "border-blue-500" : "border-gray-200"
              }`}
            >
              {/* Route Summary */}
              <View className="flex-row items-center mb-3">
                <Image source={icons.person} className="w-5 h-5" />
                <Text className="font-JakartaSemiBold text-lg mx-2">
                  {ride.route}
                </Text>
                <Image source={icons.to} className="w-4 h-4" />
                <View className="bg-purple-100 rounded-lg px-2 py-1 mx-2">
                  <Text className="font-JakartaBold text-purple-800 text-xs">
                    Rydo 
                  </Text>
                  <Text className="font-JakartaBold text-blue-600 text-xs">
                    Car
                  </Text>
                </View>
              </View>

              {/* Pickup Details */}
              <Text className="text-green-600 font-JakartaMedium text-sm mb-3">
                {ride.pickup}
              </Text>

              {/* Arrival and Price */}
              <View className="flex-row justify-between items-center">
                <Text className="font-JakartaMedium text-gray-700">
                  Est. Arrival: {ride.arrival}
                </Text>
                <View className="flex-row items-center">
                  <Text className="font-JakartaBold text-lg text-gray-800 mr-2">
                    {ride.price}
                  </Text>
                  <Image source={icons.to} className="w-4 h-4" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Action Bar */}
        <View className="mt-6 pt-4 border-t border-gray-200">
          <View className="flex-row items-center justify-between mb-4">
            {/* Payment Method */}
            <TouchableOpacity className="bg-white border border-gray-300 rounded-full px-4 py-2 flex-row items-center">
              <Text className="font-JakartaBold text-gray-800 mr-2">VISA</Text>
              <Text className="font-JakartaMedium text-gray-600">
                •••• 6206
              </Text>
            </TouchableOpacity>
          </View>

          {/* Book Ride Button */}
          <TouchableOpacity
            className="bg-blue-500 rounded-xl py-4 items-center"
            onPress={() => router.push("/(root)/processing-ride")}
          >
            <Text className="font-JakartaBold text-white text-lg">
              Book This Ride
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </RideLayout>
  );
};

export default ConfirmRide;
