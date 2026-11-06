import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { getPhotoDuJour, PhotoDuJour } from "../api/nasa";

export default function Photo() {
  const [photo, setPhoto] = useState<PhotoDuJour | null>(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    getPhotoDuJour()
      .then((donnees) => setPhoto(donnees))
      .catch((e) => setErreur(String(e)))
      .finally(() => setChargement(false));
  }, []);

  if (chargement) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (erreur || !photo) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{erreur}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {photo.media_type === "image" ? (
        <Image
          source={{ uri: photo.url }}
          style={{ width: "100%", aspectRatio: 1, borderRadius: 12 }}
        />
      ) : (
        <Text>La NASA a publié une vidéo aujourd'hui.</Text>
      )}
      <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 16 }}>
        {photo.title}
      </Text>
      <Text style={{ color: "gray", marginTop: 4 }}>{photo.date}</Text>
      <Text style={{ marginTop: 12, lineHeight: 22 }}>{photo.explanation}</Text>
    </ScrollView>
  );
}