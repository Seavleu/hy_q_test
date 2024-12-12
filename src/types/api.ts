// ** AUTH_API types ** //
export interface LoginRequest {
  user_id: string
  user_pw: string
}
export interface AutoLogin {
  token: string
}

// ** HOME_API types ** //
export interface HomeCurrentData {
  weather_info: {
    area_name: string
    base_date: string
    base_time: string
    sky: string
    sunrise: string
    rn1: string
    reh: string
    sunset: string
    sky_url: string
    wsd: string
    sky_desc: string
    t1h: string
  }
  device_status: {
    system_data_status: string
    error_message: string[]
    device_data_status: string
    inverter_data_status: string
  }
  today_power_transfer_info: {
    graph_trans_list: Array<{
      time_hour: string
      hourly_gen_kwh: number
      hourly_trans_kwh: number
      hourly_invalid_kwh: number
    }>
    today_trans_per: number
    today_invalid_power: number
    yesterday_invalid_power: number
    yesterday_transfer_power: number
    today_transfer_power: number
    yesterday_trans_per: number
    today_power_transfer_dately_info_list: Array<{
      date_type: string
      date_name: string
      transfer_power: number | null
      invalid_power: number | null
      trans_per: number | null
    }>
  }
  current_device_info: {
    current_power: number
    current_v: number
    current_a: number
    r_coil_temp: string
    s_coil_temp: string
    t_coil_temp: string
    front_bearing_temp: string
    back_bearing_temp: string
  }
  today_powergen_info: {
    graph_gen_list: Array<{
      time_hour: string
      hourly_kwh: number
    }>
    yesterday_power_gen: {
      yesterday_power_gen: number
    }
    today_power_gen_dately_info_list: Array<{
      date_type: string
      date_name: string
      mwh: number
    }>
    today_power_gen: number
    total_power_gen: {
      total_power_gen: number
    }
  }
  sales_info: {
    graph_data_list: Array<{
      date_month: string
      smp_ttl: number
      rec_ttl: number
    }>
    sell_price_info_list: Array<{
      date_type: string
      date_name: string
      rec_sell_total_price: number | null
      smp_sell_total_price: number | null
    }>
  }
}

// ** GENERATION_API types **//
export interface DateRange {
  start: Date
  end: Date
}
export interface ProductionChartParams {
  plant_seq: number
  start_date: string
  end_date: string
  device_id?: number
}
export interface ProductionChartData {
  power_data: {
    tot_power_trans: number;
    tot_power_gen: number;
    trans_per: number;
  };
  graph_data_list: Array<{
    time_hour: string;
    kw: number;
    scaled_kw: number;
  }>;
  invert_report_list: Array<{
    device_name: string;
    value: number;
  }>;
}

export interface InvalidCurrent { }
export interface InvalidChart { }
export interface weatherCurrent { }
export interface weatherChart { }

// ** API_REPORT 보고서 컨트롤러 ** //
// ** API_REPORT Download
export interface YearTemp {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface YearSystem {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface YearPv {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface YearInverter {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface WeekTemp {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface WeekSystem {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface WeekPv {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface WeekInverter {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface Rec {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface PowerGen {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface MonthTemp {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}

export interface MonthSystem {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface MonthPv {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface MonthInverter {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface DailyTemp {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}

export interface DailySystem {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface DailyPv {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface DailyInverter {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}

// ** API_REPORT DEVICE 
export interface YearTemp {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface YearSystem {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface YearPv {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface YearInverter {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface WeekTemp {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface WeekSystem {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface WeekPv {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface WeekInverter {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface Rec {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface PowerGen {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface MonthTemp {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}

export interface MonthSystem {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface MonthPv {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface MonthInverter {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface DailyTemp {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}

export interface DailySystem {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface DailyPv {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}
export interface DailyInverter {
  plant_seq: string
  start_date: string
  end_date: string
  date: string
  time: string
}

// **SCHEMA**//
export interface DeviceInspectionDTO {
  ins_type: string
  title: string
  content: string
  plant_seq: string
  reg_user_seq: string
  file_seq_list: string
  inspection_seq: string
}
export interface DeviceErrorFixDTO {
  device_error_seq: string
  title: string
  content: string
  plant_seq: string
  reg_user_seq: string
  file_seq_list: string
  device_error_fix_seq: string
}
export interface UserAppAlarmDTO {
  user_seq: string
  app_alarm_seq: string
  app_type: string
}
export interface UserAppDTO {
  user_seq: string
  device_token: string
  app_ver: string
  os: string
  is_push: string
  app_type: string
}
export interface PlantManagerDTO{
  user_name: string
  position: string
  mobile_phone: string
  email: string
  businessRegistrationNumber: string
  plantLocationSido: string
  plantLocationGugun: string
  plantLocationDong: string
  zipCode: string 
  businessAddress: string
  businessAddressDetail: string
}
export interface DeviceFilterDTO {
  device_error_code_seq: string
  is_use: string
  plant_seq: string
}
export interface AlarmUserDTO {
  user_name: string
  mobile_phone: string
  email: string
  plant_seq: string
  plant_user_seq: string
  plant_alarm_seq: string
}
export interface FCMAlarmDTO {
  user_seq: string;
  app_alarm_seq: string;
  reserve_datetime: string; 
  app_type: string;
}
export interface FCMNotificationDTO{
  title:	string
  url:	string
  content:	string
}

export interface RecipientDTO {
  phone: string
  templateParam: string[] 
}
export interface AlrimtalkDTO {
  templateCode: string
  reserve: string 
  sendDate: string 
  reSend: string
  resendCallback: string 
  resendType: string
  resendTitle: string
  resendContent: string 
  list: RecipientDTO[]
}
export interface RecipientDTO {
  phone: string;
  templateParam: string[];  
}
export interface ReportSearchDTO {
  plant_seq: string
  start_date: string 
  end_date: string
  date: string
  time: string 
}

// ** OTHER_API types **//

