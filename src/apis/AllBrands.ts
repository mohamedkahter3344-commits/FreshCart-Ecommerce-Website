export async function getAllBrands() {
    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands")
        const {data:Brands} = await response.json();


        return Brands;
        
    } catch (error) {
        return error
    }
}