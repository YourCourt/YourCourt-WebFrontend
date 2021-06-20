import { Router } from "@angular/router";


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

export function redirectParams(router:Router,navigation:string,params){
  router.navigate([navigation],{ queryParams:params,skipLocationChange: true, replaceUrl: true})//, skipLocationChange: true }
}

export function addZeroBeforeNumber(number:number) {
  return ('0' + number).slice(-2)
}

export const LOW_STOCK:number=20;