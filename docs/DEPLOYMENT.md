# Build et déploiement

Le site est publié sur GitHub Pages par `.github/workflows/jekyll-gh-pages.yml`. Le workflow dispose uniquement du déclencheur manuel `workflow_dispatch` : un `git push` ne publie pas le site à lui seul.

## Lancer la publication

1. Intégrer les changements sur la branche à publier, normalement `main`.
2. Dans GitHub, ouvrir **Actions** → **Deploy Jekyll site to GitHub Pages**.
3. Cliquer sur **Run workflow** et sélectionner la branche à publier.
4. Attendre la réussite des jobs `build` puis `deploy`, et contrôler le site publié.

Le dépôt doit être configuré pour une publication GitHub Pages depuis **GitHub Actions**. Le job `deploy` utilise l’environnement `github-pages` et les permissions `pages: write` et `id-token: write` définies dans le workflow.

## Ce que fait la CI

1. Le job `build` tourne sur `ubuntu-24.04` et récupère le dépôt avec les images Git LFS.
2. `ruby/setup-ruby` installe Ruby 3.2 et les gems du `Gemfile.lock` via `bundler-cache: true`. Une étape `bundle install` explicite suit dans le workflow.
3. Jekyll construit le site avec `JEKYLL_ENV=production`, la source `src/`, la configuration `_config.yml` à la racine et la sortie `_site/`.
4. `_site/` est envoyé comme artefact GitHub Pages, puis le job `deploy` le publie.

Reproduire le build localement depuis la racine du dépôt :

```sh
bundle exec jekyll build --source src --config _config.yml --destination _site
```

La commande peut aussi être exécutée dans Compose avec `docker compose run --rm jekyll` devant elle. Voir le [README](../README.md#démarrer-en-local) pour l’installation.

## Domaine et dépendances externes

`_config.yml` définit l’URL `https://www.pitlane-autoecole.ch` et le dépôt contient un fichier `CNAME` à la racine. **Point à vérifier :** le build Jekyll prend `src/` comme source ; le `CNAME` situé à la racine n’est donc pas copié dans `_site/`. Vérifier le domaine personnalisé dans les réglages GitHub Pages et, si le domaine doit être fourni par l’artefact, placer `CNAME` sous `src/`.

Les fichiers CSV des dates, les cartes Google, le formulaire Jotform, le lien TWINT et les bibliothèques CSS/JS chargées par CDN ne sont pas intégrés dans l’artefact. Leur disponibilité et leur configuration doivent être contrôlées sur le site publié, même quand la CI est verte.

## En cas d’échec

| Symptôme | Vérification |
| --- | --- |
| Échec de `bundle install` | Contrôler la version Ruby 3.2, le runner `ubuntu-24.04` et les variantes de gems dans `Gemfile.lock`. |
| Images absentes | Vérifier que Git LFS a téléchargé les objets, localement avec `git lfs pull` et dans la CI via `actions/checkout` avec `lfs: true`. |
| Tableau de dates vide | Vérifier le CSV externe et la console réseau du navigateur ; ce chargement se produit après le build. |
| Carte ou formulaire vide | Vérifier les identifiants et paramètres des services Google My Maps ou Jotform ainsi que leur disponibilité. |
| Domaine personnalisé incorrect | Vérifier les réglages GitHub Pages et la présence éventuelle d’un `CNAME` dans l’artefact. |
