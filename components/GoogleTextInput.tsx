import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { GoogleInputProps } from "@/types/type";
import { icons } from "@/constants";
import { useState, useEffect, useRef } from "react";

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  onFocus,
  handlePress,
}: GoogleInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    const safeLocation =
      initialLocation && typeof initialLocation === "string"
        ? initialLocation.trim()
        : "";
    setInputValue(safeLocation);
  }, [initialLocation]);

  // API key
  const apiKey = "AIzaSyDCOqPT_r_WZ0--5vhEVnhnslyF9ymfURE";

  // Fetch suggestions from Google Places API
  const fetchSuggestions = async (query: string) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${apiKey}&types=geocode&language=en`
      );
      const data = await response.json();

      if (data.status === "OK" && data.predictions) {
        setSuggestions(data.predictions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch {
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle text input changes
  const handleTextChange = (text: string) => {
    setInputValue(text);

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce the API call
    timeoutRef.current = setTimeout(() => {
      fetchSuggestions(text);
    }, 300);
  };

  // Handle suggestion selection
  const handleSuggestionPress = async (suggestion: any) => {
    try {
      // Get place details
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${suggestion.place_id}&key=${apiKey}&fields=geometry`
      );
      const data = await response.json();

      if (data.status === "OK" && data.result && data.result.geometry) {
        const location = data.result.geometry.location;
        handlePress({
          latitude: location.lat,
          longitude: location.lng,
          address: suggestion.description,
        });
      }
    } catch {
      // Handle error silently
    }

    setInputValue(suggestion.description);
    setShowSuggestions(false);
  };

  // Render suggestion item
  const renderSuggestion = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={{
        padding: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: "#e0e0e0",
        backgroundColor: "white",
      }}
      onPress={() => handleSuggestionPress(item)}
    >
      <Text style={{ fontSize: 16, color: "#000" }}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, marginBottom: 20, position: "relative" }}>
      {/* Input container */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: textInputBackgroundColor || "white",
          borderRadius: 20,
          paddingHorizontal: 15,
          height: 50,
          borderWidth: 1,
          borderColor: "#e0e0e0",
        }}
      >
        <Image
          source={icon ? icon : icons.search}
          style={{ width: 20, height: 20, marginRight: 10 }}
          resizeMode="contain"
        />
        <TextInput
          value={inputValue}
          onChangeText={handleTextChange}
          placeholder="Search location..."
          placeholderTextColor="gray"
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: "600",
            color: "#000",
          }}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
            onFocus?.();
          }}
          onBlur={() => {
            // Delay hiding suggestions to allow for taps
            setTimeout(() => setShowSuggestions(false), 200);
          }}
        />
        {isLoading && (
          <Text style={{ color: "#666", fontSize: 12 }}>Loading...</Text>
        )}
        {inputValue.length > 0 && !isLoading && (
          <TouchableOpacity
            onPress={() => {
              setInputValue("");
              setSuggestions([]);
              setShowSuggestions(false);
            }}
            style={{
              padding: 5,
            }}
          >
            <Image
              source={icons.close}
              style={{ width: 16, height: 16 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Suggestions list */}
      {showSuggestions && suggestions.length > 0 && (
        <View
          style={{
            position: "absolute",
            top: 55,
            left: 0,
            right: 0,
            backgroundColor: "white",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            zIndex: 1000,
            maxHeight: 200,
          }}
        >
          <FlatList
            data={suggestions}
            renderItem={renderSuggestion}
            keyExtractor={(item) => item.place_id}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
          />
        </View>
      )}

      {/* No results message */}
      {showSuggestions &&
        suggestions.length === 0 &&
        inputValue.length >= 2 &&
        !isLoading && (
          <View
            style={{
              position: "absolute",
              top: 55,
              left: 0,
              right: 0,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              zIndex: 1000,
            }}
          >
            <Text style={{ color: "#666" }}>No results found</Text>
          </View>
        )}
    </View>
  );
};

export default GoogleTextInput;
