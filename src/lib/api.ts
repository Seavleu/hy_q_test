import axios from '@/lib/axios'
import type {
    LoginRequest,
    AutoLogin,
    ProductionChartParams,
    InvalidCurrent,
    InvalidChart,
    weatherCurrent,
    weatherChart,
    HomeCurrentData
} from '@/types/api'

export const AUTH_API = {
    login: (data: LoginRequest) => axios.post("/api/login/auth", data),
    autoLogin: (data: AutoLogin) => axios.post("/api/login/authAuto", data),
}

export const HOME_API = {
    fetchHomeData: (plantSeq: number) =>
        axios.get<HomeCurrentData>(`/api/home/current/hyq`, {
            params: { plant_seq: plantSeq },
        }),
}

export const GENERATION_API = {
    productionChart: (params: ProductionChartParams) =>
        axios.get('/api/powergen/stats/hyq', { params }),
    invalidCurrent: (data: InvalidCurrent) =>
        axios.get("/api/powergen/invalid/current/hyq", { params: data }),
    invalidChart: (data: InvalidChart) =>
        axios.get("/api/powergen/invalid/stats/hyq", { params: data }),
    weatherCurrent: (data: weatherCurrent) =>
        axios.get("/api/powergen/weather/stats", { params: data }),
    weatherChart: (data: weatherChart) =>
        axios.get("/api/powergen/weather/current", { params: data }),
    forecast: (data: weatherChart) =>
        axios.get("/api/powergen/weather/current", { params: data }),
}

export const TRANSMISSION_API = {
    smpCurrent: (data: any) =>
        axios.get("/api/powertransfer/smp/stats", { params: data }),
    smpChart: (params: ProductionChartParams) =>
        axios.get('', { params }),
    recCurrent: (data: any) =>
        axios.get("/api/powertransfer/smp/current", { params: data }),
    recChart: (params: any) =>
        axios.get('/api/powertransfer/rec/stats', { params }),
    trends: (params: any) =>
        axios.get('/api/powertransfer/rec/current', { params }),
}

export const DEVICE_API = {
    getInspectionDetail: (data: any) =>
      axios.get('/api/device/inspection', { params: data }),
    saveInspection: (data: any) => axios.post('/api/device/inspection', data),
    updateInspection: (data: any) => axios.put('/api/device/inspection', data),
    deleteIsnpection: (data: any) =>
      axios.delete('/api/device/inspection', { params: data }),
    getInspectionList: (data: any) =>
      axios.get('/api/device/inspection/list', { params: data }),
    getErrorFixDetail: (data: any) =>
      axios.get('/api/device/error_fix/info', { params: data }),
    saveErrorFix: (data: any) => axios.post('/api/device/error_fix', data),
    updateErrorFix: (data: any) => axios.put('/api/device/error_fix', data),
    deleteErrorFix: (data: any) =>
      axios.delete('/api/device/error_fix', { params: data }),
    getErrorFixList: (data: any) =>
      axios.get('/api/device/error_fix/list', { params: data }),
    getErrorFixTitleList: (data: any) =>
      axios.get('/api/device/error_fix/title_list', { params: data }),
    getInverterStats: (data: any) =>
      axios.get('/api/device/inveter/stats', { params: data }),
    getErrorAlarmList: (data: any) =>
      axios.get('/api/device/error/list', { params: data })
  }
  

export const ABNORMAL_API = {
    getAnomalies: (data: any) =>
      axios.get('/api/anomalies/dataList', { params: data })
}

export const REPORT_API = {
    getReport: (url: string, data: any)  =>
      axios.get(`/api/report/device/${url}`, { params: data }),
    excelDownload: (url: string, data: any)  =>
      axios.get(`/api/report/download/${url}`, { params: data })
}

export const FILE_API = {
    upload: (mid_url: string, data :any) =>
      axios.post(`/file/upload?mid_path=${mid_url}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }),
    delete: (data: any) => axios.delete('/file/delete', { params: data })
  }
  
  export const SETUP_API = {
    updatePassword: (data: any) => axios.put('/api/setup/user/password', data),
    checkPassword: (data: any) =>
      axios.post('/api/setup/user/checkPassword', data),
    checkAlarm: (data: any) =>
      axios.post('/api/setup/device/checkAlarm', data),
    saveAlarmUser: (data: any) => axios.post('/api/setup/alarm/user', data),
    deleteAlarmUser: (data: any) =>
      axios.delete('/api/setup/alarm/user', { data: data }),
    getDeviceAlarmList: (data: any) =>
      axios.get('/api/setup/device/alarmlist', { params: data }),
    getAlarmUserList: (data: any) =>
      axios.get('/api/setup/alarm/user_list', { params: data }),
    updateManager: (data: any) =>
      axios.post('/api/setup/manager/updateInfo', data)
  }