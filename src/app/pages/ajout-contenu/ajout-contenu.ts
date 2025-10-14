import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ajout-contenu',
  templateUrl: './ajout-contenu.html',
  styleUrls: ['./ajout-contenu.css'] // Assurez-vous que le nom du fichier est correct
})
export class AjoutContenu {
    
    // 1. Correction de l'erreur 'fileInput'
    // @ViewChild permet de référencer un élément du DOM dans le template.
    // L'identifiant #fileInput doit être ajouté à l'input type="file" dans le HTML.
    @ViewChild('fileInput') fileInput!: ElementRef;
    
    // Propriété pour stocker le nom du fichier sélectionné (pour l'affichage)
    fileName: string = "Choisir un fichier Aucun fichier choisi";
    
    constructor() { }

    // 2. Correction de l'erreur 'onSubmit()'
    onSubmit() {
        // Logique de soumission du formulaire ici
        console.log("Formulaire soumis !");
        // Vous gérerez ici l'envoi des données vers un service ou le backend.
    }
    
    // 3. Correction de l'erreur 'onFileSelected()'
    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.fileName = file.name;
            console.log("Fichier sélectionné:", this.fileName);
            // Logique de gestion du fichier (téléchargement ou prévisualisation)
        } else {
            this.fileName = "Choisir un fichier Aucun fichier choisi";
        }
    }
}