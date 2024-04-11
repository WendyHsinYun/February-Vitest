import dayjs from 'dayjs';
import _ from 'lodash'

export const formatTimestamp = (v: number) => {
  return dayjs(v * 1000).format('YYYY-MM-DD HH:mm:ss');
};

export const formatSheet = (sheetData: any) => {
  const data = Object.values(sheetData)

  for(const value of data){
    value.register = formatTimestamp(Number(value.register))
    value.login = formatTimestamp(Number(value.login))
  }
  
  return data
}