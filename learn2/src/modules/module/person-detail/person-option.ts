export class PersonOption {
    id: number = 0;
    key: string = "";
    name: string = "";
    options: PersonOptionKey[] = [];
}

export class PersonOptionKey {
    value: number = 0;
    name: string = "";
}