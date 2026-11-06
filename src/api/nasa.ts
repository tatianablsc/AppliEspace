const URL_APOD = "https://science.nasa.gov/wp-json/wp/v2/apod-basic";

export type PhotoDuJour = {
  date: string;
  title: string;
  explanation: string;
  url: string;
  media_type: string;
  lien: string;
};

type ReponseNasa = {
  date: string;
  title: string;
  explanation: string;
  media_type: string;
  hdurl: string;
  permalink: string;
};

function enleverHtml(texte: string): string {
  return texte
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "’")
    .trim();
}

function imageReduite(adresse: string): string {
  if (adresse.includes("assets.science.nasa.gov") && !adresse.includes("?")) {
    return `${adresse}?w=1024`;
  }
  return adresse;
}

function convertir(donnees: ReponseNasa): PhotoDuJour {
  return {
    date: donnees.date,
    title: enleverHtml(donnees.title),
    explanation: enleverHtml(donnees.explanation),
    url: imageReduite(donnees.hdurl),
    media_type: donnees.media_type,
    lien: donnees.permalink,
  };
}

async function appeler(adresse: string): Promise<any> {
  let reponse: Response;
  try {
    reponse = await fetch(adresse);
  } catch {
    throw new Error(
      "Impossible de joindre la NASA. Vérifie ta connexion Internet."
    );
  }

  if (reponse.status === 404) {
    throw new Error("Aucune photo n'a été publiée à cette date.");
  }
  if (!reponse.ok) {
    throw new Error(`La NASA a renvoyé une erreur (code ${reponse.status}).`);
  }

  return await reponse.json();
}

export async function getPhotoDuJour(date?: string): Promise<PhotoDuJour> {
  let adresse = `${URL_APOD}?per_page=1`;
  if (date) {
    const dateCourte = date.slice(2).replace(/-/g, "");
    adresse = `${URL_APOD}/${dateCourte}`;
  }

  const json = await appeler(adresse);
  const donnees: ReponseNasa = Array.isArray(json) ? json[0] : json;
  return convertir(donnees);
}

export async function getPhotosRecentes(page: number): Promise<PhotoDuJour[]> {
  const json: ReponseNasa[] = await appeler(
    `${URL_APOD}?per_page=20&page=${page}`
  );
  return json.map(convertir);
}