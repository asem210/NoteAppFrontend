export interface Category {
    id: number;
    name: string;
  }
  
  export interface Note {
    id: number;
    user_id: number;
    title: string;
    content: string;
    is_archived: boolean;
    categories: Category[];
  }
  