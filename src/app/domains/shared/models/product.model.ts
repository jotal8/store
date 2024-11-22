import { Category } from "@shared/models/category.model";

export interface Product {
    id: number;
    title: string;
    price: number;
    images: string[];
    creationAt: string;
    description: string,
    category: Category;
}