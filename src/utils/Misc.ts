import {AlertController} from "ionic-angular";

export class Misc {
    static presentAlert(alertCtrl: AlertController, message: string, title: string = "Response !", button: string = "Ok"): void {
        let alert = alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: [button]
        });
        alert.present();
    }

    static isBlank(entries: any): boolean{
        var fieldBlank: boolean = false;
        entries.every(function (entry, index, _arr) {
            if (entry == undefined) {
                fieldBlank = true;
                return entry == undefined;
            }

            if (entry != undefined && entry.length == 0){
                fieldBlank = true;
                return entry.length == 0;
            }
        });
        return fieldBlank;
    }

    static hasBlank(entries: string[]): boolean {
        var fieldBlank: boolean = false;
        var i = 0;

        for (i = 0; i < entries.length; i++) {
            if (entries[i] == undefined) {
                fieldBlank = true;
                break;
            }else{
                if(entries[i].length == 0) {
                    fieldBlank = true;
                    break;
                }
            }
        }
        console.log(fieldBlank);
        return fieldBlank;
    }
}