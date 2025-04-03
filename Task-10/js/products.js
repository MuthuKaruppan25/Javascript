export async function fetchProducts(){
    try{
        const res = await fetch('data.json');
        const data = await res.json();
        return data;
    }
    catch(e){
        console.log(e);
    }
}