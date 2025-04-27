export interface Project {
  id: number;
  name: string;
  user_id: number;
  description: string;
  category?: string; // Ha van ilyen mező az API-ban
  member_number?: number;
  start_date?: string;
  end_date?: string;
  created_at: Date;
  image_url?: string;
}

export interface IUser{
  name: string;
  email: string;
  bio: string;
  url: string;
  company: string;
  country: string;
  profilepicture: string;
}


export interface IColumn {
  id: number;
  name: string;
  project_id: number;
  taskIds: number[];
  order: number;
}

export interface ITask {
  id: number;
  name: string;
  description: string;
  column_id: number;
  start_date?: string;
  end_date?: string;
  assigned_user?: string;
  due_date?: string; 
  status?: string;
  comments?: string[];  // Ha van ilyen mező az API-ban
}