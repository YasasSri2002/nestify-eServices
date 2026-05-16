'use server'




const BACKEND_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080';


export async function getRatingOfGigById(gigId: string): Promise<{[key:string]:string}> {
  

  // Keep the fetch in its own try/catch, separate from redirect logic
  let response: Response;

  try {
    response = await fetch(`${BACKEND_URL}/api/v1/review/average-rate/service-gig?gigId=${gigId}`, {
      method: "GET"
    });
  } catch (err) {
    throw new Error(`Network error calling get rating of gig API: ${err}`);
  }

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`get rating of gig API failed: ${response.status} - ${errBody}`);
  }

  return response.json();
}