export interface Project {
    id: number;
    name: string;
    description: string;
    category?: string; // Ha van ilyen mező az API-ban
    member_number?: number;
    start_date?: string;
    end_date?: string;
  }
  