import React from "react";
import { Text, ScrollView } from "react-native";
import { STGContainer } from "stg-ui";
import styles from "./style";

export default function AboutParticular() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        marginBottom: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
      }}
    >
      <STGContainer>
        <Text style={styles.bigTitle}>Pratiquants</Text>
        <Text style={[styles.simpleTitle, styles.slogan]}>
          “Mon Sport, Où je veux, Quand je veux...”
        </Text>
        <Text style={styles.text}>
          Une <Text style={styles.bold}>envie de pratiquer votre sport</Text> où{" "}
          <Text style={styles.bold}>vous voulez et quand vous voulez ?</Text>
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Sport To Go</Text> est{" "}
          <Text style={styles.bold}>une application gratuite</Text> qui vous
          permet de{" "}
          <Text style={styles.bold}>
            vous connecter quelques soit le lieu, l’heure et la date
          </Text>{" "}
          afin de <Text style={styles.bold}>pratiquer la séance de sport</Text>{" "}
          de votre choix et à votre convenance. Que vous soyez en{" "}
          <Text style={styles.bold}>
            déplacements professionnels, en vacances
          </Text>{" "}
          ou <Text style={styles.bold}>chez vous</Text>, que{" "}
          <Text style={styles.bold}>vous soyez un sportif débutant</Text> ou
          <Text style={styles.bold}>confirmé</Text>, que vous{" "}
          <Text style={styles.bold}>pratiquiez régulièrement</Text> ou{" "}
          <Text style={styles.bold}>
            occasionnellement, seul ou à plusieurs
          </Text>
          , l’application{" "}
          <Text style={styles.bold}>Sport To Go vous offre confort</Text> et{" "}
          <Text style={styles.bold}>liberté</Text> dans votre pratique sportive.
        </Text>
        <Text style={[styles.simpleTitle, styles.slogan]}>
          “Où que vous soyez, connectez-vous et prenez soin de vous ...”
        </Text>
        <Text style={styles.text}>Les Avantages avec Sport To Go !</Text>
        <Text style={styles.text}>- Un sport à la Carte</Text>
        <Text style={styles.text}>- Pas d’Abonnement</Text>
        <Text style={styles.text}>
          - Réservez une séance de sport instantanément
        </Text>
        <Text style={styles.simpleTitle}>Un répertoire pour trouver :</Text>
        <Text style={styles.text}>- Une Salle</Text>
        <Text style={styles.text}>- Un Coach</Text>
        <Text style={styles.text}>- Un Club</Text>
        <Text style={styles.text}>- Une Association</Text>
        <Text style={styles.simpleTitle}>Créez votre profil pour :</Text>
        <Text style={styles.text}>- Soumettre un événement sportif</Text>
        <Text style={styles.text}>- Dialoguez entre Membres</Text>
        <Text style={styles.text}>- Un Fil d’actualité</Text>
        <Text style={styles.text}>
          - Interactivité entre membres de la Sport To Go Community (Créez un
          Groupe)
        </Text>
        <Text style={styles.text}>
          - Postez votre séance (Texte / Vidéos / Photos)
        </Text>
        <Text style={styles.text}>
          - S'informer sur des conseils diététiques
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Le Groupe Sport To Go</Text> est issu de la
          région{" "}
          <Text style={styles.bold}>
            PACA (Toulon, Marseille, la Ciotat, St-Cyr Les Lecques, Hyères,
            Draguignan, St-Tropez)
          </Text>{" "}
          et se développe aussi sur{" "}
          <Text style={styles.bold}>
            Monaco, Nice, Cannes, Antibes, Lyon, Paris, Lille, Valence,
            Saint-Etienne, Annecy
          </Text>
          . L'ambition du Groupe sera très rapidement de s'étendre sur tout le
          territoire Français. L'application{" "}
          <Text style={styles.bold}>
            Sport To Go est destinée à tous les acteurs du sport : Coachs,
            Salles de sports, Clubs Sportifs, Associations sportives et aux
            services des sports des Collectivités.
          </Text>
        </Text>
      </STGContainer>
    </ScrollView>
  );
}
