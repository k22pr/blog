import { IPost, IImage } from "./post";
export interface ICategory {
   id: string;
   created_at: string;
   updated_at: string;
   name: string;
   parent: ICategory;
   banner: IImage;
   posts: IPost[];
}
