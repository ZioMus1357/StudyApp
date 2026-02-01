# Educational Platform – React + Node.js + MongoDB

## Opis projektu

Projekt jest pełnoprawną aplikacją webową typu **platforma edukacyjna**, umożliwiającą użytkownikom naukę materiałów dydaktycznych podzielonych na kategorie i podkategorie, realizację zadań oraz śledzenie postępów.  
System obsługuje **role użytkowników (user / admin)**, autoryzację opartą o JWT oraz dynamiczne zarządzanie treściami przez panel administracyjny.

Aplikacja została zaprojektowana w sposób modularny, skalowalny i zgodny z dobrymi praktykami fullstack developmentu.

---

## Główne funkcjonalności

### Użytkownik (USER)
- Rejestracja i logowanie
- Dostęp do materiałów dydaktycznych
- Przegląd kategorii i podkategorii
- Czytanie materiałów edukacyjnych
- Dostęp do przypisanych zadań
- Oznaczanie zadań jako wykonane (TaskProgress)
- Panel użytkownika (Dashboard)

### Administrator (ADMIN)
- Pełne zarządzanie zadaniami
- Zarządzanie kategoriami i podkategoriami
- Zarządzanie materiałami dydaktycznymi
- Dostęp do panelu administracyjnego
- Kontrola struktury edukacyjnej aplikacji

---

## Stack technologiczny

### Frontend
- React
- TypeScript
- React Router
- Bootstrap (globalne style)
- Context API (AuthContext)
- Fetch wrapper (`apiFetch`)

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT (access + refresh tokens)
- Middleware autoryzacyjne

---

## Architektura aplikacji

Projekt jest podzielony na **client** oraz **server**, co umożliwia niezależny rozwój warstwy frontendowej i backendowej.

```text
project-root/
│
├── client/        # frontend (React)
│
├── server/        # backend (Node.js + Express)
│
└── README.md
```

## Role użytkowników i autoryzacja

Aplikacja wykorzystuje mechanizm **uwierzytelniania i autoryzacji oparty o JWT (JSON Web Tokens)**. System został zaprojektowany w sposób bezpieczny i jednoznacznie rozdzielający uprawnienia użytkowników.

### Role użytkowników

W systemie występują dwie role:

- **USER**
  - dostęp do materiałów dydaktycznych
  - przeglądanie kategorii i podkategorii
  - czytanie materiałów
  - dostęp do własnych zadań
  - oznaczanie zadań jako wykonane

- **ADMIN**
  - pełny dostęp do panelu administracyjnego
  - zarządzanie kategoriami i podkategoriami
  - dodawanie, edycja i usuwanie materiałów
  - zarządzanie zadaniami
  - kontrola struktury edukacyjnej aplikacji

### Tokeny JWT

Stosowane są dwa typy tokenów:

- **Access Token**
  - krótki czas życia
  - przesyłany w nagłówku `Authorization`
  - używany do autoryzacji zapytań

- **Refresh Token**
  - dłuższy czas życia
  - służy do odświeżania access tokena

### Middleware backendowe

- `authenticate`
  - weryfikuje obecność i poprawność tokena
  - dekoduje payload i przypisuje użytkownika do `req.user`

- `authorize`
  - sprawdza rolę użytkownika
  - blokuje dostęp do endpointów niezgodnych z uprawnieniami

Dzięki temu wszystkie krytyczne operacje są chronione po stronie serwera, a frontend nie zawiera logiki bezpieczeństwa.

---

## Struktura backendu

Backend aplikacji oparty jest o **Node.js, Express oraz MongoDB**. Kod napisany jest w TypeScript, co zapewnia spójność typów i łatwiejsze utrzymanie.

### Modele danych (MongoDB + Mongoose)

#### User
- `email` – unikalny identyfikator użytkownika
- `password` – hasło przechowywane w postaci hasha
- `role` – `user` lub `admin`

#### Category
- `name` – nazwa kategorii
- `parent` – referencja do kategorii nadrzędnej (opcjonalna)

Pozwala to na tworzenie hierarchii:
- kategoria główna
- podkategorie

#### Material
- `title` – tytuł materiału
- `content` – treść dydaktyczna
- `category` – główna kategoria
- `subcategory` – podkategoria
- `createdBy` – użytkownik (admin), który dodał materiał
- `timestamps`

#### Task
- `title` – tytuł zadania
- `description` – opis zadania
- `category` – kategoria zadania

#### TaskProgress
- `user` – użytkownik
- `task` – zadanie
- `done` – status wykonania

Ten model rozwiązuje problem współdzielenia zadań globalnych przy jednoczesnym indywidualnym postępie użytkowników.

---

## Endpointy API

### Autoryzacja
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`

### Kategorie
- `GET /categories`
- `POST /categories` (admin)
- `DELETE /categories/:id` (admin)

### Materiały
- `GET /materials/subcategory/:id`
- `POST /materials` (admin)
- `DELETE /materials/:id` (admin)

### Zadania
- `GET /tasks/my`
- `POST /tasks/:id/toggle`
- CRUD dla administratora

---

## Struktura frontendu

Frontend został zbudowany w React + TypeScript, z wykorzystaniem Context API do zarządzania stanem autoryzacji.

```text
client/src
│
├── auth/
│   └── AuthContext.tsx
│
├── components/
│   ├── Navbar.tsx
│   ├── ProtectedRoute.tsx
│   ├── MaterialReader.tsx
│   └── Sidebar.tsx
│
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── Materials.tsx
│   ├── Subcategories.tsx
│   ├── MaterialsBySubcategory.tsx
│   ├── MaterialView.tsx
│   └── admin/
│       ├── AdminHome.tsx
│       ├── AdminTasks.tsx
│       ├── AdminCategories.tsx
│       └── AdminMaterials.tsx
│
├── api.ts
├── App.tsx
└── main.tsx
```

## Routing aplikacji

Routing w aplikacji został zrealizowany przy użyciu **React Router**. Trasy są jasno podzielone na publiczne, dostępne dla zalogowanych użytkowników oraz trasy administratora. Dostęp do odpowiednich widoków kontrolowany jest przez komponent `ProtectedRoute`, który sprawdza stan autoryzacji oraz rolę użytkownika.

### Trasy publiczne

Dostępne dla wszystkich użytkowników, niezależnie od zalogowania:

- `/`  
  Strona główna aplikacji – prezentuje nazwę projektu oraz przyciski logowania i rejestracji.

- `/login`  
  Formularz logowania użytkownika.

- `/register`  
  Formularz rejestracji nowego użytkownika (rejestracja wyłącznie z rolą `user`).

---

### Trasy użytkownika (USER)

Dostępne wyłącznie po zalogowaniu:

- `/dashboard`  
  Panel użytkownika zawierający listę przypisanych zadań oraz ich status (TaskProgress).

- `/materials`  
  Lista kategorii materiałów dydaktycznych.

- `/materials/:categoryId`  
  Widok podkategorii przypisanych do wybranej kategorii.

- `/materials/:categoryId/:subId`  
  Lista materiałów przypisanych do konkretnej podkategorii.

- `/materials/view/:materialId`  
  Czytnik pojedynczego materiału dydaktycznego.

---

### Trasy administratora (ADMIN)

Dostępne wyłącznie dla użytkowników z rolą `admin`:

- `/admin`  
  Panel główny administratora – wybór sekcji zarządzania.

- `/admin/tasks`  
  Zarządzanie zadaniami (tworzenie, usuwanie, przypisywanie).

- `/admin/categories`  
  Zarządzanie kategoriami i podkategoriami materiałów.

- `/admin/materials`  
  Zarządzanie materiałami dydaktycznymi.

---

## Interfejs użytkownika

Interfejs aplikacji został zbudowany w oparciu o **Bootstrap**, który zapewnia spójny wygląd i responsywność na różnych urządzeniach.

### Kluczowe cechy UI

- globalnie załadowany Bootstrap
- jednolita kolorystyka i typografia
- czytelne listy i formularze
- wykorzystanie komponentów takich jak:
  - `list-group`
  - `container`
  - `navbar`
  - `form-control`
  - `btn`

### Navbar

- reaguje na stan zalogowania (AuthContext)
- dynamicznie pokazuje dostępne opcje:
  - niezalogowany: Home, Login, Register
  - user: Dashboard, Materials, Logout
  - admin: Dashboard, Materials, Admin Panel, Logout

---

## Czytnik materiałów dydaktycznych

Materiały dydaktyczne prezentowane są w dedykowanym widoku czytnika:

- wyraźny tytuł materiału
- oddzielona sekcja treści
- wygodna szerokość kolumny do czytania
- możliwość dalszej rozbudowy (np. Markdown, WYSIWYG)

Komponent ten odpowiada wyłącznie za prezentację treści, bez logiki biznesowej.

---

## Panel administracyjny

Panel administratora został logicznie podzielony na niezależne sekcje:

- zarządzanie zadaniami
- zarządzanie kategoriami i podkategoriami
- zarządzanie materiałami dydaktycznymi

Każda sekcja posiada własny widok oraz formularze CRUD. Dzięki temu panel jest czytelny i łatwy w rozbudowie.

---

## Bezpieczeństwo aplikacji

- hasła użytkowników są hashowane
- JWT weryfikowane po stronie serwera
- role egzekwowane backendowo
- brak wrażliwych danych w localStorage
- brak logiki autoryzacyjnej po stronie UI

Model `TaskProgress` zapewnia pełną izolację danych postępu pomiędzy użytkownikami.

---

## Uruchomienie projektu lokalnie

### Backend

```bash
cd server
npm install
npm run dev
```
### Frontend

```bash
cd client
npm install
npm run dev
```
## Możliwe kierunki rozwoju

 - quizy i testy automatyczne
 - system komentarzy do materiałów
 - statystyki postępów użytkownika
 - upload plików (PDF, wideo)

##Status projektu

Projekt jest w pełni funkcjonalny, stabilny i gotowy do dalszej rozbudowy.
Architektura umożliwia łatwe dodawanie nowych modułów oraz skalowanie aplikacji.
