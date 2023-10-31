export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      parking: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          name?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reservation: {
        Row: {
          created_at: string
          id: string
          parking_place: string | null
          reserved_by: string | null
          reserved_date: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          parking_place?: string | null
          reserved_by?: string | null
          reserved_date?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          parking_place?: string | null
          reserved_by?: string | null
          reserved_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservation_parking_place_fkey"
            columns: ["parking_place"]
            referencedRelation: "parking"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservation_reserved_by_fkey"
            columns: ["reserved_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
