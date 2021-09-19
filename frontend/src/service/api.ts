import axios from 'axios'

const axiosConfig = {
    baseURL: 'https://api.sampleapis.com',
    timeout: 30000,
  }

const api = axios.create(axiosConfig)

export async function getWines(){
    return api.get('/wines/reds')
}