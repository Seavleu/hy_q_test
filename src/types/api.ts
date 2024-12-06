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

// ** OTHER_API types **//