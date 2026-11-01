# Site Pit Lane

Site vitrine de l’auto-école Pit Lane, construit avec Jekyll et publié sur GitHub Pages. Le domaine configuré est [www.pitlane-autoecole.ch](https://www.pitlane-autoecole.ch).

Le site présente les cours, les véhicules, les tarifs, les lieux de rendez-vous et un formulaire de contact. Les pages sont statiques ; certaines données et fonctionnalités sont chargées depuis des services externes dans le navigateur.

## Démarrer en local

### Avec Docker Compose

Prérequis : Docker avec Compose et Git LFS. Depuis la racine du dépôt :

```sh
git lfs install
git lfs pull
docker compose up --build
```

Ouvrir <http://localhost:4000>. Compose monte le dépôt dans le conteneur et Jekyll surveille les fichiers ; rafraîchir le navigateur après une modification. Arrêter avec `Ctrl+C`.

### Avec Ruby

Utiliser Ruby 3.2, la version du conteneur et de la CI. Installer Bundler et les dépendances du `Gemfile.lock`, puis lancer Jekyll :

```sh
gem install bundler -v 2.4.19
bundle install
bundle exec jekyll serve --source src --config _config.yml
```

Le site est alors disponible sur <http://localhost:4000>. Git LFS doit aussi être installé et les images récupérées avec `git lfs pull`.

## Organisation du dépôt

| Chemin | Rôle |
| --- | --- |
| `src/index.html` | Page d’accueil. |
| `src/pages/` | Pages des cours, véhicules, tarifs, contact et autres rubriques. Les URL conservent l’extension `.html`. |
| `src/_layouts/default.html` | Structure HTML commune et chargement des styles et scripts. |
| `src/_includes/` | En-tête et pied de page. |
| `src/_data/navigation.yml` | Liens du menu et du pied de page. |
| `src/_data/maps.yml` | Cartes Google intégrées sur la page des lieux. |
| `src/assets/css/style.css` | Styles personnalisés. |
| `src/assets/js/` | Carrousels, sélection de carte et chargement des tableaux CSV. |
| `src/assets/img/` | Images du site, suivies par Git LFS. |
| `_config.yml` | Configuration Jekyll, domaine et coordonnées utilisées par les modèles. |
| `Gemfile` / `Gemfile.lock` | Dépendances Ruby et versions verrouillées. |
| `.github/workflows/jekyll-gh-pages.yml` | Build et publication GitHub Pages. |

Le rendu utilise Tailwind CSS 4 dans le navigateur, Flowbite 3.1.2 et Swiper depuis des CDN. Il n’y a pas de `package.json` ni d’étape de compilation JavaScript ou CSS dans ce dépôt.

## Modifier le site

- [Guide des contenus](docs/CONTENT.md) : pages, navigation, tarifs, images, cartes et données externes.
- [Guide de publication](docs/DEPLOYMENT.md) : build, lancement manuel de la CI et points à vérifier après déploiement.

Pour vérifier un changement avant publication, lancer le même build que la CI :

```sh
bundle exec jekyll build --source src --config _config.yml --destination _site
```

Avec Docker Compose, préfixer cette commande par `docker compose run --rm jekyll`. Le dossier `_site/` est généré et ignoré par Git. Le dépôt ne contient pas de suite de tests automatisés ; vérifier aussi les pages modifiées dans le navigateur, notamment les tableaux et les intégrations externes.
