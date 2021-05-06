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