import { Router } from "@angular/router";
export function getCourtType(inputType: string) {
    let outputType: string;
  
    switch (inputType) {
      case "FAST":
        outputType = "Rápida"
        break;
      case "CLAY":
        outputType = "Tierra batida"
        break;
      default:
        outputType = inputType
        break;
    }
    return outputType;
  }

export const hours:Array<string>=['09:00','10:00','11:00','12:00','13:00','14:00','17:00','18:00','19:00','20:00','21:00']


