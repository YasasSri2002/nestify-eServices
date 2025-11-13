import { CategoryResponseDto } from "@/dto/CategoryDto";
import axios from "axios";

export async function getAllCategories(){

    const response = await axios.get<CategoryResponseDto[]>(
        'http://localhost:8080/api/v1/category/all'
    )

    return response.data

} 