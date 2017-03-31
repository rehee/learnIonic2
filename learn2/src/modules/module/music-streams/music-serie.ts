import { Episode, MusicStreamImage } from './index';
export class MusicSerie {
    count: number;
    image: MusicStreamImage;
    latest_episode_date: string;
    series_created_by: number;
    series_created_date: number;
    series_desc: string;
    series_id: string;
    series_image: string;
    series_image_360: any;
    series_stream: number;
    series_title: string;
    episodes:Episode[]=[];
}