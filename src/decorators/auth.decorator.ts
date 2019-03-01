import {appContainer} from "../app/app.container";
import {AuthService} from "../services/auth.service";
import {Nav} from "ionic-angular";
import {Login} from "../pages/login/login";

export const Auth = () =>{
  return (target: any) => {
      // aqui é verificado se a pessoa pode acessar a página ou não
     target.prototype.ionViewCanEnter = function () {
         let property =
             Object
                 .keys(this)
                .find(value => this[value] instanceof Nav);
         if(typeof property === "undefined"){
             setTimeout(()=>{
                 throw new TypeError("Auth decorator precisa do NavController instance.");
             });
             return false;
         }
        let authService = appContainer().get(AuthService);
        return authService.check().then(isLogged => {
            if(!isLogged){
                setTimeout( () => {
                    let navCtrl = this[property];
                    navCtrl.setRoot(Login);
                    return false;
                });
            }
            return true;
        })
      }
  }
};