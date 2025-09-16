FROM ruby:3.2-alpine

# Installer les dépendances système
RUN apk add --no-cache \
    build-base \
    git \
    nodejs \
    npm \
    imagemagick

# Définir le répertoire de travail
WORKDIR /srv/jekyll

# Copier les fichiers de dépendances
COPY Gemfile ./

# Installer les gems
RUN bundle install --jobs 4 --retry 3

# Copier tout le projet
COPY . .

# Exposer les ports
EXPOSE 4000
EXPOSE 35729

# Commande par défaut
CMD ["bundle", "exec", "jekyll", "serve", "--force_polling", "--host", "0.0.0.0", "--livereload", "--source", "src"]