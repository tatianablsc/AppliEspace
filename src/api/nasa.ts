const CLE = process.env.EXPO_PUBLIC_NASA_KEY;
const URL_APOD = "https://api.nasa.gov/planetary/apod";

export type PhotoDuJour = {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  copyright?: string;
};

export async function getPhotoDuJour(date?: string): Promise<PhotoDuJour> {
  let adresse = `${URL_APOD}?api_key=${CLE}`;
  if (date) {
    adresse += `&date=${date}`;
  }

  const reponse = await fetch(adresse);

  if (!reponse.ok) {
    throw new Error(`Erreur de l'API NASA : ${reponse.status}`);
  }

  return await reponse.json();
}