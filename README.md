# E-TROSA 💰
### Gérer vos dettes et vos créances

> Travail de Fin d'Études — Tsiferana Randriamampianina | X75 Front-end | IFAPME de Liège

🌐 **Application en ligne :** [https://e-trosa.pages.dev](https://e-trosa.pages.dev)

---

## 📖 Description

**E-TROSA** est une application web de gestion financière personnelle permettant de suivre simultanément ses dettes et ses créances. Elle offre un tableau de bord centralisé, clair et sécurisé pour visualiser sa situation financière en temps réel.

L'application fonctionne en deux modes :
- **Mode démo** — accessible sans connexion, avec des données fictives en mémoire (non sauvegardées)
- **Mode connecté** — données persistées et sécurisées via Supabase, propres à chaque utilisateur

---

## ✨ Fonctionnalités

- 📊 **Dashboard** — Vue globale avec statistiques (total à payer, total à recevoir, solde net, dettes en retard) et graphique d'évolution
- 💸 **Gestion des Dettes** — Ajout, remboursement partiel/total, suppression, visualisation graphique
- 🤝 **Gestion des Créances** — Même fonctionnalités que les dettes côté débiteurs
- 🧾 **Historique des Paiements** — Liste des dettes et créances déjà soldées
- 👤 **Profil utilisateur** — Modification du nom, prénom, photo de profil, mot de passe, suppression de compte
- 🔐 **Authentification sécurisée** — Inscription avec confirmation email, connexion par OTP
- 🌙 **Thème clair/sombre** — Persisté via localStorage
- 📱 **Responsive** — Sidebar sur desktop, navbar en bas sur mobile

---

## 🛠️ Technologies utilisées

| Catégorie | Technologie |
|---|---|
| Framework UI | React + TypeScript |
| Bundler | Vite.js |
| Style | Tailwind CSS + DaisyUI |
| Tableaux | AG-Grid Community |
| Graphiques | Recharts |
| Backend / BDD | Supabase (PostgreSQL) |
| Auth | Supabase Auth (OTP email) |
| Cache / State | TanStack Query |
| Routing | React Router DOM |
| Hébergement | Cloudflare Pages |
| Versioning | Git + GitHub |

---

## 🚀 Installation

```bash
# Cloner le projet
git clone https://github.com/tsifcarnage/E-trosa.git
cd E-trosa

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Remplir VITE_SUPABASE_URL et VITE_SUPABASE_PUBLISHABLE_KEY

# Lancer en développement
npm run dev
```

---

## ⚙️ Variables d'environnement

Créer un fichier `.env` à la racine :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=votre-clé-publique
```

---

## 🗄️ Structure de la base de données (Supabase)

```
auth.users
    │
    ├── debts (dettes)
    │     id, user_id, creditor, debt_amount, paid_amount, due_date, interest_rate
    │
    ├── credits (créances)
    │     id, user_id, creditor, debt_amount, paid_amount, due_date, interest_rate
    │
    └── profiles
          id, first_name, last_name, avatar_url, updated_at
```

Toutes les tables sont sécurisées avec **Row Level Security (RLS)** — chaque utilisateur ne voit et ne gère que ses propres données.

---

## 📁 Structure du projet

```
src/
├── components/       # Composants réutilisables (agGrid, charts, modal, nav...)
├── data/             # Données mock pour le mode démo
├── enums/            # Enums TypeScript (Status, Actions)
├── layouts/          # Layouts (DashboardLayout, ModalLayout)
├── models/           # Interfaces TypeScript
├── pages/            # Pages (Accueil, Dashboard, Dettes, Creances, Paiements, Parametre)
└── utils/            # Logique métier, calculs, service Supabase
```

---

## 🔒 Sécurité

- Authentification gérée par **Supabase Auth** (JWT)
- Politiques **RLS** directement au niveau PostgreSQL
- Suppression de compte via une **Edge Function** Supabase sécurisée
- Variables d'environnement chiffrées sur Cloudflare

---

## 👨‍💻 Auteur

**Tsiferana Randriamampianina**
Apprenant en développement web front-end — IFAPME de Liège 

---

## 📄 Licence

Ce projet est réalisé dans le cadre d'un TFE et est à usage éducatif.
