import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { getPhotoDuJour, PhotoDuJour } from "../../api/nasa";

export default function Detail() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const [photo, setPhoto] = useState<PhotoDuJour | null>(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  function charger() {
    setChargement(true);
    setErreur(null);
    getPhotoDuJour(date)
      .then((donnees) => setPhoto(donnees))
      .catch((e) => {
        setErreur(
          e instanceof Error ? e.message : "Impossible de charger la photo."
        );
      })
      .finally(() => setChargement(false));
  }

  useEffect(() => {
    charger();
  }, [date]);

  if (chargement) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (erreur || !photo) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
          gap: 16,
        }}
      >
        <Text style={{ textAlign: "center" }}>{erreur}</Text>
        <Pressable
          onPress={charger}
          style={{
            backgroundColor: "#007AFF",
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Réessayer</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: 16, gap: 12 }}
    >
      <Image
        source={{ uri: photo.url }}
        style={{ width: "100%", aspectRatio: 1, borderRadius: 12 }}
        resizeMode="contain"
      />
      {photo.media_type === "video" && (
        <Text style={{ color: "gray" }}>
          Ce jour-là, la NASA a publié une vidéo. L'image ci-dessus en est un
          extrait.
        </Text>
      )}
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>{photo.title}</Text>
      <Text style={{ color: "gray" }}>{photo.date}</Text>
      <Text style={{ lineHeight: 22 }}>{photo.explanation}</Text>
      <Pressable onPress={() => Linking.openURL(photo.lien)}>
        <Text style={{ color: "#007AFF", fontWeight: "bold" }}>
          Voir l'article sur le site de la NASA
        </Text>
      </Pressable>
    </ScrollView>
  );
}