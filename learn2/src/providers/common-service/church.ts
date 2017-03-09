export class ChurchInfo {
    name: string;
    lat: string;
    lng: string;
}

export class ChurchInit {
    app_version: string;
    app_name: string;
    api_version: string;
    tcs: string;
    base_url: string;
    church_id: string;
    menu: Menu = new Menu();
}

export class MenuItem {
    text: string;
    private: boolean;
    icon: string;
    href: string;
    dragger: boolean;
    init: any;
    params: any;
    ios: boolean;
    android: boolean;
}
export class Menu {
    public: MenuItem[] = [];
}

export class Church {

    church: ChurchInfo = new ChurchInfo();
    init: ChurchInit = new ChurchInit();
    
}
