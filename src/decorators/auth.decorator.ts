import {appContainer} from "../app/app.container";
import {AuthService} from "../services/auth.service";

export const Auth = () =>{
  return (target: any) => {
     target.prototype.ionViewCanEnter = () => {
        let authService = appContainer().get(AuthService);
        return authService.check().then(isLogged => {
            if(!isLogged){
                return false;
            }
            return true;
        })
      }
  }
};