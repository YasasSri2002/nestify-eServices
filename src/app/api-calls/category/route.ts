

const API_PREFIX = '/api-calls/auth/apis';




export async function AddCategory(data:{name:string}): Promise<{[key:string]: string}>{
    const response = await fetch(`${API_PREFIX}/api/v1/category`,{
        cache: 'no-store',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if(!response.ok){
        const error = await response.json();
        throw new Error(error.error || 'failed api-> Add categories')
    }

    return response.json();
}