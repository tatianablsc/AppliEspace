import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { getPhotosRecentes, PhotoDuJour } from "../../api/nasa";

export default function Galerie() {
  const [photos, setPhotos] = useState<PhotoDuJour[]>([]);
  const [page, setPage] = useState(0);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const enCours = useRef(false);

  function chargerPageSuivante() {
    if (enCours.current) return;
    enCours.current = true;
    setChargement(true);
    setErreur(null);

    const numero = page + 1;
    getPhotosRecentes(numero)
      .then((nouvelles) => {
        setPhotos((anciennes) => [...anciennes, ...nouvelles]);
        setPage(numero);
      })
      .catch((e) => {
        setErreur(e instanceof Error ? e.message : "Erreur de chargement.");
      })
      .finally(() => {
        enCours.current = false;
        setChargement(false);
      });
  }

  useEffect(() => {
    chargerPageSuivante();
  }, []);

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={photos}
      keyExtractor={(item) => item.date}
      contentContainerStyle={{ padding: 16, gap: 20 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/photo/[date]",
              params: { date: item.date },
            })
          }
        >
          <Image
            source={{ uri: item.url }}
            style={{ width: "100%", aspectRatio: 1, borderRadius: 12 }}
          />
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 8 }}>
            {item.title}
          </Text>
          <Text style={{ color: "gray" }}>{item.date}</Text>
        </Pressable>
      )}
      onEndReached={() => {
        if (!erreur) chargerPageSuivante();
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        <View style={{ paddingVertical: 16, alignItems: "center", gap: 12 }}>
          {chargement && <ActivityIndicator size="large" />}
          {erreur && (
            <>
              <Text style={{ textAlign: "center" }}>{erreur}</Text>
              <Pressable
                onPress={chargerPageSuivante}
                style={{
                  backgroundColor: "#007AFF",
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Réessayer
                </Text>
              </Pressable>
            </>
          )}
        </View>
      }
    />
  );
}