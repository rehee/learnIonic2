import { MenuButton } from './tabs-menu-item';
export class TabItemService{
    static RefreshVisable(menus:MenuButton[],avaliable:{[id:string]:boolean}){
        menus.forEach(element => {
            try{
                element.display= avaliable[element.name];
            }
            catch(e){
                
            }
            
        });
    }
}