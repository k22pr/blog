export interface IImage {
   id: number;
   created_at: string;
   ext: string;
   hash: string;
   mime: string;
   name: string;
   provider: string;
   public_id: number;
   sha256: string;
   size: string;
   updated_at: string;
   url: string;
}

export interface IPost {
   id: number;
   category: any;
   title: string;
   content: string;
   logo: IImage;
   banner: IImage;
   created_at: string;
   updated_at: string;
   is_deleted: boolean;
}
