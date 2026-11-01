# Modifier les contenus

Ce guide décrit où modifier les informations affichées par le site. Les fichiers de `src/` sont la source du build Jekyll ; `_site/` est généré et ne doit pas être édité.

## Pages et navigation

Les pages sont des fichiers HTML avec un en-tête Jekyll. Par exemple :

```yaml
---
layout: default
nav_active: courses-sensi
title: Sensibilisation
---
```

`layout: default` applique l’en-tête et le pied de page communs. `nav_active` sélectionne l’entrée active du menu : sa valeur doit correspondre à celle de `src/_data/navigation.yml`. `title` est facultatif ; sans lui, l’onglet du navigateur reprend le titre général défini dans `_config.yml`.

| Contenu | Fichier ou dossier |
| --- | --- |
| Accueil et résumé des tarifs | `src/index.html` |
| Présentation des cours | `src/pages/courses/` |
| Présentation des véhicules | `src/pages/vehicles/` |
| Tarifs complets | `src/pages/tarifs.html` |
| Moniteur, lieux, contact et page en anglais | `src/pages/monitor.html`, `lieux.html`, `contact.html`, `english.html` |
| Menu et pied de page | `src/_data/navigation.yml`, utilisé par les deux inclusions de `src/_includes/` |

Pour ajouter une page, créer le fichier sous `src/pages/`, lui donner un en-tête Jekyll et, si elle doit apparaître dans la navigation, ajouter son URL dans `src/_data/navigation.yml`. Les liens internes existants utilisent le filtre Liquid `relative_url` ; conserver cette convention. Les URL des pages suivent leur chemin de fichier, par exemple `/pages/courses/auto-ecole.html`.

## Tarifs et coordonnées

Les prix sont écrits directement dans **deux pages** : le résumé de `src/index.html` et `src/pages/tarifs.html`. Lors d’un changement de tarif, contrôler les deux, ainsi que les montants éventuellement cités dans les pages des cours.

Le titre général, l’adresse du site, l’e-mail, le téléphone et les liens sociaux du pied de page se trouvent dans `_config.yml`. Certaines coordonnées sont toutefois écrites directement dans les pages : le numéro affiché dans `src/pages/courses/courses.html`, le bouton d’appel de `src/pages/english.html` et les coordonnées du partenaire dans `src/pages/courses/moto-ecole.html`. Les modifier séparément si nécessaire.

Le lien de paiement TWINT est dans `src/pages/tarifs.html`. Le formulaire de contact est une intégration Jotform dans `src/pages/contact.html` ; le formulaire lui-même se gère dans Jotform, pas dans ce dépôt.

## Dates des cours depuis des CSV

Quatre pages chargent leurs tableaux depuis des fichiers CSV externes, au moment où le visiteur ouvre la page :

| Page | Source CSV | `data-group` |
| --- | --- | --- |
| Moto-école | `https://pit-lane-auto-ecole.github.io/data/moto-ecole.csv` | 3 |
| Sensibilisation | `https://pit-lane-auto-ecole.github.io/data/sensibilisation.csv` | 2 |
| Trott-école | `https://pit-lane-auto-ecole.github.io/data/trott-ecole.csv` | 1 (valeur par défaut) |
| Samaritain | `https://pit-lane-auto-ecole.github.io/data/samaritain.csv` | 2 |

Les URL sont inscrites dans l’attribut `data-csv` du tableau de chaque page. `src/assets/js/data-loader.js` récupère le fichier, utilise la première ligne comme en-têtes et crée les lignes suivantes. `data-group` définit le nombre de lignes partageant la même couleur de fond avant alternance.

Le parseur découpe simplement sur les retours à la ligne et les virgules : les champs contenant une virgule, des guillemets CSV ou un retour à la ligne ne sont pas pris en charge. Les fichiers CSV ne sont pas présents dans ce dépôt. Si un tableau reste vide, vérifier l’URL, la réponse réseau et les erreurs dans la console du navigateur ; le build Jekyll ne valide pas ces données.

## Cartes, images et apparence

La liste des lieux et les identifiants des cartes Google My Maps sont dans `src/_data/maps.yml`. Chaque entrée a un `id` unique, un `title` et un `embed_id`. `src/pages/lieux.html` génère le sélecteur et les iframes ; `src/assets/js/map-selector.js` affiche la carte choisie.

Les images sont dans `src/assets/img/`. La plupart des pages affichent des fichiers WebP ; les fichiers JPG présents ne sont pas automatiquement utilisés comme solution de repli. Après ajout ou remplacement d’une image, vérifier son chemin dans le HTML et son texte alternatif. Les formats d’image déclarés dans `.gitattributes` passent par Git LFS : les personnes qui clonent le dépôt doivent récupérer les objets LFS.

Les classes utilitaires viennent de Tailwind chargé par CDN dans `src/_layouts/default.html`. Les règles propres au site et la couleur principale `#AD2B31` sont dans `src/assets/css/style.css`. Les carrousels Swiper sont initialisés dans `src/assets/js/swiper.js` ; leurs images et diapositives sont définies directement dans les pages HTML.

## Avant de publier

1. Vérifier les informations dupliquées, surtout les tarifs et les coordonnées.
2. Lancer le build décrit dans le [README](../README.md#modifier-le-site).
3. Contrôler les pages modifiées dans le navigateur, sur mobile et sur ordinateur.
4. Tester les éléments dépendants du réseau : CSV, cartes, Jotform, TWINT et ressources CDN.

La procédure de publication est dans le [guide de déploiement](DEPLOYMENT.md).
