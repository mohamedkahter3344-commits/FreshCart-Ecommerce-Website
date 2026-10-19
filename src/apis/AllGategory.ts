export async function getAllCategories() {
    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories")
        const {data:Gategories} = await response.json();


        return Gategories;
        
    } catch (error) {
        return error
    }
}