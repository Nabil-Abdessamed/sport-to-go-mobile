import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "./style";
import { STGContainer } from "stg-ui";

export default function About({ navigation }) {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        marginBottom: 20,
        paddingVertical: 20,
        paddingHorizontal: 5,
      }}
    >
      <STGContainer>
        <Text style={styles.bigTitle}>{`Qui sommes-nous ?`}</Text>
        <Text style={styles.simpleTitle}>
          {`Pourquoi, pour qui et comment !`}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Sport To Go</Text> est une{" "}
          <Text style={styles.bold}>application novatrice</Text> qui a été
          conçue pour{" "}
          <Text style={styles.bold}>
            répondre aux besoins du consommateur sportif actuel
          </Text>
          , qui pratique{" "}
          <Text style={styles.bold}>
            sans engagement et en totale liberté. Sport To Go
          </Text>{" "}
          est là pour lui offrir la possibilité de pratiquer le sport de son
          choix <Text style={styles.bold}>où il veut, quand</Text> et{" "}
          <Text style={styles.bold}>comme il le veut !</Text>
        </Text>
        <Text style={styles.text}>
          En fonction de ce qu’ils désirent{" "}
          <Text style={styles.bold}>Sport To Go</Text> fait le lien par{" "}
          <Text style={styles.bold}>géolocalisation</Text> et{" "}
          <Text style={styles.bold}>
            renvoie les sportifs aux professionnels (partenaires) qui
            correspondent à la demande
          </Text>
          . Que vous soyez{" "}
          <Text style={styles.bold}>
            un sportif à la recherche de son sport
          </Text>{" "}
          ou{" "}
          <Text style={styles.bold}>
            que vous ayez votre propre structure, Sport To Go
          </Text>{" "}
          vous <Text style={styles.bold}>simplifie la vie</Text> et vous{" "}
          <Text style={styles.bold}>met directement en relation.</Text>
          L’application <Text style={styles.bold}>Sport To Go</Text> est la
          connexion entre <Text style={styles.bold}>la demande et l'offre</Text>{" "}
          ou <Text style={styles.bold}>l'offre et le besoin.</Text>
        </Text>
        <Text style={styles.simpleTitle}>
          {`Différents types de partenariats vous sont proposés`}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>National :</Text> Marques et Groupes
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>National - Régional :</Text> Salle de
          Fitness - Association - Salle de Crossfit - Service des Sports
          (Collectivité) - Coach sportif
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Régional :</Text> Salle de Sport -
          Association Sportive - Salle de Crossfit - Coach Sportif - Service des
          Sports (Collectivité)
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Local :</Text> Salle de Sport - Association
          Sportive - Salle de Crossfit - Club Sportif - Service des Sports
          (Collectivité) - Coach sportif
        </Text>
        <Text style={styles.simpleTitle}>
          N'hésitez pas à nous contacter pour toutes informations !
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Le Groupe Sport To Go</Text> est issu de la
          région{" "}
          <Text style={styles.bold}>
            PACA ( Toulon, Marseille, la Ciotat, St-Cyr Les Lecques, Hyères,
            Draguignan, St-Tropez )
          </Text>{" "}
          et se développe aussi sur{" "}
          <Text style={styles.bold}>
            Monaco, Nice, Cannes, Antibes, Lyon, Paris, Lille, Valence,
            Saint-Etienne, Annecy.
          </Text>{" "}
          L'ambition du Groupe sera très rapidement de s'étendre sur tout le
          territoire Français. L'application{" "}
          <Text style={styles.bold}>
            Sport To Go est destinée à tous les acteurs du sport: Coach sportif,
            Salle de sports, Clubs Sportifs, Associations sportives et aux
            services des sports des Collectivités.
          </Text>
        </Text>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AboutProfessional")}
          >
            <Text style={styles.link}>À propos des Professionnels</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AboutParticular")}
          >
            <Text style={styles.link}>À propos des Pratiquants</Text>
          </TouchableOpacity>
        </View>
      </STGContainer>
    </ScrollView>
  );
}
