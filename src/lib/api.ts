import axios from '@/lib/axios'
import type { LoginRequest, AutoLogin, productionChart, InvalidCurrent, InvalidChart, weatherCurrent, weatherChart, HomeCurrentData } from '@/types/api';

export const AUTH_API = {
    login: (data: LoginRequest) => axios.post("/api/login/auth", data),
    autoLogin: (data: AutoLogin) => axios.post("/api/login/authAuto", data),
};

export const HOME_API = {
    fetchHomeData: (plantSeq: number) => axios.get<HomeCurrentData>(`/api/home/current/hyq`, {
        params: { plant_seq: plantSeq },
    }),
}

export const GENERATION_API = {
    productionChart: (data: productionChart) => axios.get("/api/powergen/stats/hyq", { params: data }),
    invalidCurrent: (data: InvalidCurrent) => axios.get("/api/powergen/invalid/current/hyq", { params: data }),
    invalidChart: (data: InvalidChart) => axios.get("/api/powergen/invalid/stats/hyq", { params: data }),
    weatherCurrent: (data: weatherCurrent) => axios.get("/api/powergen/weather/stats", { params: data }),
    weatherChart: (data: weatherChart) => axios.get("/api/powergen/weather/current", { params: data }),
}