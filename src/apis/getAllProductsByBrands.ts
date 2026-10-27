export async function getAllProductsBrand(idBrand:string) {
    try {
        const response = await fetch(`${process.env.API}/products?brand=${idBrand}`)
        const {data:productsBrand} = await response.json();


        return productsBrand;
        
    } catch (error) {
        return error
    }
}