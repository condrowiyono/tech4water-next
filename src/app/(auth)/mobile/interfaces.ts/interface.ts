type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  is_verified: null | boolean;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}

type River = {
  id: number;
  name: string;
  type: string;
  river_region: string;
  watershed: string;
  tributary: string;
  main_river: string;
  registry_number: string;
  latitude: number;
  longitude: number;
  village: string;
  district: string;
  city: string;
  observation: string;
  file: string;
  green_light: number;
  yellow_light: number;
  red_light: number;
  elevation: number;
  construction_year: number;
  operator: string;
  maker: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
};

type RainfallData = {
  id: number;
  river_id: number;
  river: null | string;
  date: string | Date;
  data: number;
  observation: string;
  duration: number;
  description: string;
  event: string;
  user_id: number;
  user: User;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
};

type WaterLevelData = {
  id: number;
  river_id: number;
  river: null | string;
  date: string | Date;
  data: number;
  observation: string;
  description: string;
  event: string;
  user_id: number;
  user: User;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
};

type ClimateData = {
  id: number;
  river_id: number;
  river: null | string;
  rainfall: number;
  date: string | Date;
  min_temperature: number;
  max_temperature: number;
  humidity: number;
  wet_humidity: number;
  dry_humidity: number;
  wind_speed: number;
  illumination_duration: number;
  evaporation: number;
  min_float_level: number;
  max_float_level: number;
  upper_hook: number;
  lower_hook: number;
  observation: string;
  illumination_process: string;
  user_id: number;
  user: User;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
};

export type { River, RainfallData, User, WaterLevelData, ClimateData};