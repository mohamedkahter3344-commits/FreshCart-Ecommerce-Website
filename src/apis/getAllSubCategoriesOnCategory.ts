export async function getAllSubCategoryOnCategories(id:string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
        const {data} = await response.json();


        return data;
        
    } catch (error) {
        return error
    }
}