import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel";

import CustomButton from "@/components/customButton";
import { onboarding } from "@/constants";

const { width: screenWidth } = Dimensions.get("window");

const Home = () => {
  const carouselRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  const renderItem = ({ item }: { item: any }) => (
    <View
      className="flex-1 items-center justify-center p-5"
      style={{ width: screenWidth }}
    >
      <Image
        source={item.image}
        className="w-full h-[300px]"
        resizeMode="contain"
      />
      <View className="flex flex-row items-center justify-center w-full mt-10">
        <Text className="text-black text-3xl font-JakartaBold mx-10 text-center">
          {item.title}
        </Text>
      </View>
      <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      <View className="flex-1">
        <Carousel
          ref={carouselRef}
          loop={false}
          width={screenWidth}
          height={400}
          data={onboarding}
          renderItem={renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
        />

        {/* Custom dots */}
        <View className="flex flex-row justify-center items-center mt-5">
          {onboarding.map((_, index) => (
            <View
              key={index}
              className={`w-[32px] h-[4px] mx-1 rounded-full ${
                index === activeIndex ? "bg-[#0286FF]" : "bg-[#E2E8F0]"
              }`}
            />
          ))}
        </View>
      </View>

      <View className="p-5">
        <CustomButton
          title={isLastSlide ? "Get Started" : "Next"}
          onPress={() =>
            isLastSlide
              ? router.replace("/(auth)/sign-up")
              : carouselRef.current?.scrollTo({
                  index: activeIndex + 1,
                  animated: true,
                })
          }
          className="w-full"
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
