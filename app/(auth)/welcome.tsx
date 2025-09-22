import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { BackArrow } from "@/components/BackArrow";

// import CustomButton from "@/components/customButton";
import { bata, images } from "@/constants";
const { width: screenWidth } = Dimensions.get("window");

const Welcome = () => {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === bata.length - 1;

  const renderItem = ({ item }: { item: any }) => (
    <View
      style={{
        width: screenWidth,
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      {/* Top Section - Main Slide Image */}
      <View style={{ height: 300, marginTop: 20 }}>
        <Image
          source={item.image}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>

      {/* Bottom Section - Background + Text + Button */}
      <View style={{ marginBottom: 80 }}>
        <ImageBackground
          source={images.bgOnboarding}
          resizeMode="stretch"
          style={{
            width: "100%",
            height: 200,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 0,
          }}
        >
          <Text className="text-black text-2xl font-JakartaBold text-center mb-4">
            {item.text}
          </Text>
          <Text className="text-sm font-JakartaSemiBold text-center text-[#858585] w-4/5">
            {item.description}
          </Text>

          {/* Conditional Button - Arrow for first 2 slides, Get Started for last slide */}
          {isLastSlide ? (
            <TouchableOpacity
              className="absolute bottom-2 px-8 py-3 rounded-full"
              style={{ backgroundColor: "#665CFF" }}
              onPress={() => router.replace("/(root)/(tabs)/home")}
            >
              <Text className="text-white text-lg font-JakartaBold">
                Get Started
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="w-12 h-12 rounded-full items-center justify-center absolute bottom-4"
              style={{ backgroundColor: "#665CFF" }}
              onPress={() => {
                if (swiperRef.current) {
                  swiperRef.current.scrollBy(1, true);
                }
              }}
            >
              <BackArrow colors="#fff" width={24} height={24} />
            </TouchableOpacity>
          )}
        </ImageBackground>
      </View>
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

      <View style={{ flex: 1 }}>
        <Swiper
          ref={swiperRef}
          loop={false}
          showsPagination={true}
          onIndexChanged={(index) => setActiveIndex(index)}
          activeDotStyle={{
            width: "7%",
            backgroundColor: "#665CFF", // Match button color
          }}
          paginationStyle={{
            bottom: 20,
          }}
        >
          {bata.map((item, index) => (
            <View key={index} style={{ flex: 1 }}>
              {renderItem({ item })}
            </View>
          ))}
        </Swiper>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
