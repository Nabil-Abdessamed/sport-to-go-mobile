import React from "react";
import { Text, ScrollView } from "react-native";
import { STGContainer } from "stg-ui";
import styles from "./style";

export default function AboutProfessional() {
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
        <Text style={styles.bigTitle}>Professionnels</Text>
        <Text style={[styles.simpleTitle, styles.slogan]}>
          “L’application Interactive entre Professionnels et Pratiquants...”
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
        <Text style={[styles.simpleTitle, styles.slogan]}>
          “Une Force d’opportunités et de croissance...”
        </Text>
        <Text style={styles.text}>
          Au travers de <Text style={styles.bold}>Sport To Go</Text> nous vous
          proposons{" "}
          <Text style={styles.bold}>
            la possibilité d’adopter une nouvelle dynamique
          </Text>
          , d’entrer dans l’ère digitale et de rencontrer ces sportifs d’un
          nouveau genre. Qu’ils soient en{" "}
          <Text style={styles.bold}>
            déplacements professionnels, en vacances ou bien chez eux
          </Text>
          , permettez-leur de vous géolocaliser et de
          <Text style={styles.bold}>venir découvrir votre univers</Text>, vos{" "}
          <Text style={styles.bold}>services</Text> et{" "}
          <Text style={styles.bold}>
            d’acheter vos séances/entraînements directement en ligne.
          </Text>
        </Text>
        <Text style={[styles.simpleTitle, styles.italicTitle]}>
          Entrez dans la poche de vos futurs clients !
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>
            Créez un lien avec eux, communiquez, publiez
          </Text>{" "}
          et <Text style={styles.bold}>diffusez</Text> sur votre{" "}
          <Text style={styles.bold}>activité</Text>, vos{" "}
          <Text style={styles.bold}>évènements</Text> et{" "}
          <Text style={styles.bold}>
            votre image. Renforcer votre Notoriété !
          </Text>
        </Text>
        <Text style={[styles.simpleTitle, styles.slogan]}>
          “Une Force d’opportunités et de croissance...”
        </Text>
        <Text style={styles.text}>
          - Répondre aux attentes du sportif actuel
        </Text>
        <Text style={styles.text}>- Proposez une pratique novatrice</Text>
        <Text style={styles.text}>- Vente de vos séances en ligne</Text>
        <Text style={styles.text}>
          - Développez de nouveaux services spécifiques
        </Text>
        <Text style={styles.text}>- Un outil publicitaire ciblé</Text>
        <Text style={styles.text}>- Une communication maitrisée</Text>
        <Text style={styles.text}>- Proposez et publiez vos événements</Text>
        <Text style={styles.text}>
          - Un Feedback entre le client et vous-même
        </Text>
        <Text style={[styles.simpleTitle, styles.slogan]}>
          “Créateur d’opportunités entre professionnels”
        </Text>
        <Text style={styles.text}>
          - Créez un lien d’échanges entre Professionnels
        </Text>
        <Text style={styles.text}>- Achetez ou revendre du matériel</Text>
        <Text style={styles.text}>- Offre ou recherche d’emploi</Text>
        <Text style={[styles.simpleTitle, styles.slogan]}>
          “Une veille constante du milieu sportif...”
        </Text>
        <Text style={styles.text}>- Pratique</Text>
        <Text style={styles.text}>- Diététique</Text>
        <Text style={styles.text}>- Innovation</Text>
        <Text style={styles.text}>- Tendance</Text>
        <Text style={styles.text}>- Rassemblements</Text>
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
