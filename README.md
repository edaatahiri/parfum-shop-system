# 🌟 Parfum Shop - Dokumentacioni i Sistemit

Ky projekt është një aplikacion modern për menaxhimin dhe shitjen e parfumeve luksoze, i ndërtuar me **React.js** në frontend dhe **Node.js / Prisma ORM** në backend.

---

## 📂 Struktura dhe Funksionaliteti i Faqeve (Frontend)

Sistemi përbëhet nga 4 modula/faqe kryesore të cilat janë plotësisht funksionale dhe të lidhura me API-në:

### 1. 🛍️ Catalog (Katalogu i Produkteve)
Faqja kryesore ku shfaqen të gjitha parfumet dinamikisht nga databaza.
* **Kërkimi dhe Filtrimi:** Përdoruesit mund të kërkojnë parfumet me emër, t'i filtrojnë sipas gjinisë (Men, Women, Unisex) ose sipas çmimit maksimal.
* **Procesi i Blerjes (Checkout):** Kur një përdorues i kyçur klikon "Shto në Shportë", sistemi ekzekuton dy kërkesa të njëpasnjëshme:
  1. Krijon faturën kryesore te tabela `Shitjet`.
  2. Merr ID-në e asaj shitjeje dhe shton artikullin te tabela `detajet_Shitjes`.

### 2. 🔐 Login (Autentikimi)
Sistemi i sigurisë dhe qasjes në aplikacion.
* **JWT Token:** Pas validimit të email-it dhe password-it, backend-i gjeneron një token sigurie.
* **Local Storage:** Token-i, emri i përdoruesit dhe roli i tij (Admin ose User) ruhen në `localStorage` për të mbajtur sesionin aktiv.
* **Ndarja e Roleve (RBAC):** Nëse përdoruesi ka rolin "Admin", ai delegohet automatikisht te Dashboard-i i menaxhimit, përndryshe drejtohet te Katalogu.

### 3. 💬 Testimonials (Përshtypjet / Reviews)
Faqja ku klientët ndajnë eksperiencat e tyre.
* **Slider-i Dinamik:** Shfaq vlerësimet e fundit që vijnë në kohë reale nga databaza duke përfshirë emrin e klientit dhe parfumin që ka blerë.
* **Forma e Vlerësimit:** Përdoruesit e kyçur mund të përzgjedhin yjet (Rating) dhe të shkruajnë një koment. Forma nuk shfaqet nëse përdoruesi nuk është i loguar.

### 4. ❓ FAQ (Pyetjet e Shpeshta)
Një faqe asimetrike dhe luksoze që u përgjigjet pyetjeve të shpeshta të klientëve.
* **Accordion UI:** Pyetjet hapen dhe mbyllen në mënyrë interaktive duke përdorur `useState` të React-it për një eksperiencë sa më të lëmuar të përdoruesit.


## 🌐 Dokumentacioni i API-së (Backend Endpoints)

Për të bërë faqe të tilla dinamike, frontend-i komunikon me backend-in nëpërmjet këtyre rrugëve kryesore:

### 1. Moduli i Autentikimit (Përdoret te Login.jsx)
* **`POST /api/login`**
  * **Përshkrimi:** Validon kredencialet e përdoruesit dhe kthen JWT Token-in së bashku me rolin (Admin/User).
  * **Payload (Body):** `{ "email": "...", "password": "..." }`

### 2. Moduli i Katalogut (Përdoret te Catalog.jsx)
* **`GET /api/parfumet`**
  * **Përshkrimi:** Merr listën e plotë të parfumeve nga databaza për t'i shfaqur në dyqan.
* **`POST /api/shitjet`**
  * **Përshkrimi:** Krijon faturën kryesore të blerjes. Kërkon JWT Token në Headers.
* **`POST /api/detajetShitjes`**
  * **Përshkrimi:** Shton artikujt specifikë të blerë duke i lidhur me ID-në e shitjes së mësipërme.

### 3. Moduli i Vlerësimeve (Përdoret te Testimonials.jsx)
* **`GET /api/reviews`**
  * **Përshkrimi:** Merr të gjitha përshtypjet e klientëve për t'i shfaqur te slider-i.
* **`POST /api/reviews`**
  * **Përshkrimi:** Lejon një klient të kyçur të dërgojë një review të re. Kërkon JWT Token.

---

## ⚡ Si të lëshohet projekti lokalish?

1. **Backend:**
   ```bash
   cd backend
   npm install
   npx prisma db push
   npm start