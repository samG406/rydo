import { router } from "expo-router";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { useEffect } from "react";
import RideLayout from "@/components/RideLayout";
import { images } from "@/constants";

const FindRide = () => {

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/(root)/confirm-ride");
    }, 8000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <RideLayout title="Ride" snapPoints={["30%", "30%"]}>
      <Text className="font-JakartaBold text-lg text-center mb-2">
        Finding the ride
      </Text>

      {/* Custom Loading GIF */}
      <View className="items-center">
        <Image
          source={images.loadingGif}
          style={{ width: 280, height: 280 }}
          contentFit="contain"
        />
      </View>
    </RideLayout>
  );
};

export default FindRide;
