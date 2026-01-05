export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Option {
    id: string
    name: string
    group_name: string
    extra_price: number
    is_available: boolean
    created_at: string
}

export interface Product {
    id: string
    name: string
    slug: string
    description: string | null
    price: number
    image_url: string | null
    category_id: string
    is_available: boolean
    created_at: string
    updated_at: string
}

export interface Category {
    id: string
    name: string
    slug: string
    description: string | null
    image_url: string | null
    created_at: string
}

export interface Settings {
    id: string
    store_name: string
    store_tagline: string
    store_description: string
    phone: string
    email: string
    address: string
    city: string
    postal_code: string
    operating_hours: Json
    operating_hours_text: string
    instagram_url: string | null
    facebook_url: string | null
    twitter_url: string | null
    google_maps_url: string | null
    whatsapp_number: string | null
    about_hero: string | null
    about_story: string | null
    created_at: string
    updated_at: string
}

export interface Database {
    public: {
        Tables: {
            options: {
                Row: Option
                Insert: Omit<Option, 'id' | 'created_at'>
                Update: Partial<Omit<Option, 'id' | 'created_at'>>
            }
            products: {
                Row: Product
                Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>
            }
            categories: {
                Row: Category
                Insert: Omit<Category, 'id' | 'created_at'>
                Update: Partial<Omit<Category, 'id' | 'created_at'>>
            }
            settings: {
                Row: Settings
                Insert: Omit<Settings, 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Omit<Settings, 'id' | 'created_at' | 'updated_at'>>
            }
        }
    }
}