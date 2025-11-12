export interface ContenuGlobalDto {
    texteProverbe: string;
    significationProverbe: string;
    origineProverbe: string;
     photoProverbe?: string;
    nomAuteur: any;
    id: number;
    idFamille: number;
    nomFamille: string; // Nom de la famille
    idCreateur: number;
    nomCreateur: string;
    prenomCreateur: string; 
    idCategorie: number;
    nomCategorie: string;
    titre: string;
    description: string;
    typeContenu: string;
    urlFichier?: string;
    urlPhoto?: string;
    tailleFichier?: number;
    duree?: number;
    dateEvenement?: string;
    lieu?: string;
    region?: string; 
    regionFamille?: string; // Région associée à la famille ou au contenu
    statut: string;
    dateCreation: string;
    dateModification?: string;
    // J'utilise urlPhoto pour la miniature, mais je laisse thumbnailUrl pour la compatibilité si votre API l'utilise
    thumbnailUrl?: string; 
}