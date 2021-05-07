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

export function reload(){
  window.location.reload()
}

export function promiseReload(router:Router,navigation:string, timeout:number){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(router.navigate([navigation]).then(() => { reload() }))
    }, timeout)
  })
}

export function redirect(router:Router,navigation:string){
  router.navigate([navigation])
}