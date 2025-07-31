import { create } from "zustand";
import { LocationStore, DriverStore, MarkerData } from "@/types/type";
import { validateRideLocations } from "@/lib/map";

export const useLocationStore = create<LocationStore>((set, get) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  validation: {
    pickupInRegion: false,
    destInRegion: false,
    bothInRegion: false,
    message: "Select pickup and destination locations",
  },
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));

    // Update validation after setting user location
    const state = get();
    if (state.destinationLatitude && state.destinationLongitude) {
      const validation = validateRideLocations(
        latitude,
        longitude,
        state.destinationLatitude,
        state.destinationLongitude
      );
      set(() => ({ validation }));
    } else {
      // Only pickup is set, update validation accordingly
      set(() => ({
        validation: {
          pickupInRegion: true,
          destInRegion: false,
          bothInRegion: false,
          message: "Select destination location",
        },
      }));
    }

    //   // if driver is selected and now new location is set, clear the selected driver
    //   const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    //   if (selectedDriver) clearSelectedDriver();
  },

  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));

    // Update validation after setting destination location
    const state = get();
    if (state.userLatitude && state.userLongitude) {
      const validation = validateRideLocations(
        state.userLatitude,
        state.userLongitude,
        latitude,
        longitude
      );
      set(() => ({ validation }));
    } else {
      // Only destination is set, update validation accordingly
      set(() => ({
        validation: {
          pickupInRegion: false,
          destInRegion: true,
          bothInRegion: false,
          message: "Select pickup location",
        },
      }));
    }

    //   // if driver is selected and now new location is set, clear the selected driver
    //   const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    //   if (selectedDriver) clearSelectedDriver();
  },

  clearLocations: () => {
    set(() => ({
      userLatitude: null,
      userLongitude: null,
      userAddress: null,
      destinationLatitude: null,
      destinationLongitude: null,
      destinationAddress: null,
      validation: {
        pickupInRegion: false,
        destInRegion: false,
        bothInRegion: false,
        message: "Select pickup and destination locations",
      },
    }));
  },

  clearValidation: () => {
    set(() => ({
      validation: {
        pickupInRegion: false,
        destInRegion: false,
        bothInRegion: false,
        message: "Select pickup and destination locations",
      },
    }));
  },
}));

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,
  setSelectedDriver: (driverId: number) =>
    set(() => ({ selectedDriver: driverId })),
  setDrivers: (drivers: MarkerData[]) => set(() => ({ drivers })),
  clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
}));
