import { ICategory } from "./category";
import { IPost, IImage } from "./post";

export interface RootState {}

export interface CategoryState {
   categorys: ICategory[];
}

export interface PostState {
   bannerUrl: string;
}
