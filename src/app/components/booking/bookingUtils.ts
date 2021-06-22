import * as appUtils from 'src/app/appUtils'


export function addOneHour(inputHour: string) {
    let outputHour: string;
    let hourString =inputHour.split(':')[0]
    let hourNumber=Number(hourString)
    hourNumber+=1
    outputHour=hourNumber.toString()+':00'
    return outputHour;
  }

  export function bookingRangeToString(startDate:Date,endDate:Date){
    return appUtils.addZeroBeforeNumber(startDate.getDate())+'-'+appUtils.addZeroBeforeNumber(startDate.getMonth()+1)+'-'+startDate.getFullYear()+' '+startDate.getHours().toString()+':'+appUtils.addZeroBeforeNumber(startDate.getMinutes())+'-'+endDate.getHours().toString()+':'+appUtils.addZeroBeforeNumber(endDate.getMinutes())

  }