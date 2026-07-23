// src/components/LegalModal.js
import React from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../styles/LegalModal.styles';

const POLICIES = {
  privacy: {
    title: 'Politica de Confidențialitate (GDPR)',
    content: (
      <>
        <Text style={styles.paragraph}>
          Ultima actualizare: Octombrie 2026. Prezenta Politică de Confidențialitate descrie modul în care AIPSC (denumită în continuare „Asociația”, „Noi” sau „Operatorul”) colectează, utilizează, stochează și protejează datele dumneavoastră cu caracter personal în calitate de utilizator al site-ului și participant la Cursul Oficial de Siguranță și Competiție IPSC organizat la Poligonul de Tragere Criș Sălaj din Zalău, Sălaj.
        </Text>
        <Text style={styles.paragraph}>
          Prelucrăm datele dumneavoastră cu caracter personal în strictă conformitate cu Regulamentul (UE) 2016/679 (GDPR) și cu legislația națională aplicabilă în România privind protecția datelor.
        </Text>

        <Text style={styles.subHeading}>1. Identitatea Operatorului de Date</Text>
        <Text style={styles.paragraph}>
          Operatorul datelor dumneavoastră cu caracter personal este:
        </Text>
        <Text style={styles.bullet}>• Denumire: Asociația de Practică și Tir Sportiv AIPSC</Text>
        <Text style={styles.bullet}>• Sediu social: Zalău, Județul Sălaj, România</Text>
        <Text style={styles.bullet}>• Cod de Identificare Fiscală (CIF): RO12345678</Text>
        <Text style={styles.bullet}>• Email de contact: contact@aipsc.ro</Text>
        <Text style={styles.bullet}>• Telefon: +40 725 234 743</Text>

        <Text style={styles.subHeading}>2. Categoriile de Date cu Caracter Personal Prelucrate</Text>
        <Text style={styles.paragraph}>
          Colectăm următoarele date atunci când folosiți site-ul nostru sau vă înregistrați la curs:
        </Text>
        <Text style={styles.bullet}>
          • <Text style={{ fontWeight: 'bold' }}>Date de Identificare:</Text> Nume, prenume, serie și număr act de identitate (C.I. / Pașaport), data nașterii (pentru verificarea limitei legale de vârstă de 18 ani).
        </Text>
        <Text style={styles.bullet}>
          • <Text style={{ fontWeight: 'bold' }}>Date de Contact:</Text> Adresă de email, număr de telefon, adresa de domiciliu sau de facturare.
        </Text>
        <Text style={styles.bullet}>
          • <Text style={{ fontWeight: 'bold' }}>Date privind Înregistrarea și Cursul:</Text> Preferințe de cazare, detalii privind opțiunea de închiriere echipament (armă, toc, centură, cantitate de muniție solicitată).
        </Text>
        <Text style={styles.bullet}>
          • <Text style={{ fontWeight: 'bold' }}>Date de Tranzacționare și Facturare:</Text> Detalii privind plățile efectuate, contul bancar (în caz de rambursare).
        </Text>
        <Text style={styles.bullet}>
          • <Text style={{ fontWeight: 'bold' }}>Date Tehnice de Navigare (prin Cookie-uri):</Text> Adresa IP, tipul de browser, paginile vizualizate pe site, durata vizitei.
        </Text>

        <Text style={styles.subHeading}>3. Temeiurile Juridice și Scopurile Prelucrării</Text>
        <Text style={styles.paragraph}>
          Prelucrăm datele dumneavoastră doar în baza următoarelor temeiuri legale:
        </Text>
        <Text style={styles.bullet}>
          • <Text style={{ fontWeight: 'bold' }}>Executarea unui Contract (Art. 6 alin. 1 lit. b din GDPR):</Text> Pentru gestionarea înregistrării dumneavoastră la curs, rezervarea cazării la unitățile partenere, asigurarea serviciilor de catering și emiterea certificatului oficial MISIA/IPSC la finalizarea cursului.
        </Text>
        <Text style={styles.bullet}>
          • <Text style={{ fontWeight: 'bold' }}>Îndeplinirea unei Obligații Legale (Art. 6 alin. 1 lit. c din GDPR):</Text> Conform Legii nr. 295/2004 privind regimul armelor și al munițiilor, poligonul de tragere Criș Sălaj are obligația legală de a înregistra identitatea tuturor persoanelor care accesează poligonul și utilizează arme/muniții în Registrul de Evidență al Poligonului. De asemenea, conform legislației fiscale din România, avem obligația de a emite facturi fiscale pentru serviciile achitate.
        </Text>
        <Text style={styles.bullet}>
          • <Text style={{ fontWeight: 'bold' }}>Interesul Legitim al Operatorului (Art. 6 alin. 1 lit. f din GDPR):</Text> Pentru asigurarea securității fizice în incinta poligonului, gestionarea eventualelor litigii sau reclamații și evaluarea siguranței participanților în timpul manipulării armamentului.
        </Text>
        <Text style={styles.bullet}>
          • <Text style={{ fontWeight: 'bold' }}>Consimțământ (Art. 6 alin. 1 lit. a din GDPR):</Text> Pentru transmiterea de comunicări de marketing direct (newslettere) dacă ați bifat explicit această opțiune. Consimțământul poate fi retras în orice moment.
        </Text>

        <Text style={styles.subHeading}>4. Destinatarii Datelor cu Caracter Personal</Text>
        <Text style={styles.paragraph}>
          Pentru a asigura desfășurarea optimă a experienței, datele dumneavoastră pot fi partajate, sub obligație strictă de confidențialitate, cu:
        </Text>
        <Text style={styles.bullet}>• Poligonul de Tragere Criș Sălaj (Zalău) – în scopul înregistrării legale și instruirii în poligon.</Text>
        <Text style={styles.bullet}>• Furnizorii de Servicii de Cazare și Catering – exclusiv pentru rezervarea camerelor și asigurarea meselor incluse în pachet.</Text>
        <Text style={styles.bullet}>• Instructori MISIA acreditați – pentru evaluarea teoretică și practică și completarea diplomelor de absolvire.</Text>
        <Text style={styles.bullet}>• Autorități Publice (Inspectoratul de Poliție Județean Sălaj - Serviciul Arme, Explozivi, Substanțe Periculoase) – la cererea expresă a acestora sau în caz de control oficial, conform Legii nr. 295/2004.</Text>
        <Text style={styles.bullet}>• Furnizori de Servicii IT (găzduire web, baze de date) și Servicii Contabile autorizate în România.</Text>

        <Text style={styles.subHeading}>5. Perioada de Stocare a Datelor</Text>
        <Text style={styles.bullet}>• Datele de facturare și tranzacții sunt păstrate timp de 10 ani, conform legislației fiscale din România.</Text>
        <Text style={styles.bullet}>• Datele din Registrul de evidență al poligonului de tragere sunt păstrate pe perioada prevăzută de normele specifice stabilite prin instrucțiunile Poliției Române și Legea nr. 295/2004.</Text>
        <Text style={styles.bullet}>• Datele de contact și înregistrare la curs vor fi păstrate timp de 5 ani de la finalizarea cursului în scopul soluționării oricăror acțiuni sau pretenții legale.</Text>
        <Text style={styles.bullet}>• Datele pentru comunicări de marketing vor fi păstrate până la retragerea consimțământului dumneavoastră (dezabonare).</Text>

        <Text style={styles.subHeading}>6. Drepturile Dumneavoastră conform GDPR</Text>
        <Text style={styles.paragraph}>
          În calitate de persoană vizată, beneficiați de următoarele drepturi pe care le puteți exercita prin email:
        </Text>
        <Text style={styles.bullet}>• Dreptul de acces: Puteți solicita o confirmare a prelucrării datelor și o copie a acestora.</Text>
        <Text style={styles.bullet}>• Dreptul la rectificare: Puteți cere corectarea datelor inexacte sau completarea celor incomplete.</Text>
        <Text style={styles.bullet}>• Dreptul la ștergerea datelor („dreptul de a fi uitat”): Puteți cere ștergerea datelor dacă acestea nu mai sunt necesare scopurilor inițiale, dacă v-ați retras consimțământul sau dacă prelucrarea a fost ilegală (cu excepția datelor pe care suntem obligați prin lege să le păstrăm).</Text>
        <Text style={styles.bullet}>• Dreptul la restricționarea prelucrării: Puteți solicita suspendarea temporară a prelucrării datelor în anumite cazuri.</Text>
        <Text style={styles.bullet}>• Dreptul la portabilitatea datelor: Puteți solicita transferul datelor dumneavoastră către un alt operator într-un format structurat și ușor de citit.</Text>
        <Text style={styles.bullet}>• Dreptul de opoziție: Vă puteți opune prelucrării datelor bazate pe interesul nostru legitim din motive legate de situația dumneavoastră particulară.</Text>
        <Text style={styles.paragraph}>
          De asemenea, aveți dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP): B-dul G-ral. Gheorghe Magheru 28-30, Sector 1, București, România (www.dataprotection.ro).
        </Text>

        <Text style={styles.subHeading}>7. Securitatea Datelor</Text>
        <Text style={styles.paragraph}>
          Adoptăm măsuri tehnice și organizatorice adecvate pentru a proteja datele împotriva accesului neautorizat, distrugerii, pierderii sau modificării accidentale. Conexiunile pe site sunt criptate prin protocol HTTPS/SSL, iar bazele de date sunt stocate pe servere securizate din Uniunea Europeană cu acces restricționat doar personalului autorizat.
        </Text>
      </>
    )
  },
  terms: {
    title: 'Termeni și Condiții',
    content: (
      <>
        <Text style={styles.paragraph}>
          Ultima actualizare: Octombrie 2026. Prezentul document stabilește termenii și condițiile de utilizare a platformei noastre și regulile contractuale aplicabile încheierii contractului la distanță pentru participarea la Cursul Oficial de Siguranță și Competiție IPSC (denumit în continuare „Cursul”), organizat de AIPSC în colaborare cu Poligonul de Tragere Criș Sălaj din Zalău.
        </Text>
        <Text style={styles.paragraph}>
          Prin înregistrarea la curs și bifarea căsuței „Accept Termenii și Condițiile”, confirmați că ați citit, înțeles și sunteți de acord cu toate clauzele stipulate mai jos.
        </Text>

        <Text style={styles.subHeading}>1. Definiții și Dispoziții Generale</Text>
        <Text style={styles.bullet}>• <Text style={{ fontWeight: 'bold' }}>Organizator:</Text> Asociația de Practică și Tir Sportiv AIPSC, persoană juridică română fără scop patrimonial.</Text>
        <Text style={styles.bullet}>• <Text style={{ fontWeight: 'bold' }}>Participant / Client:</Text> Orice persoană fizică cu vârsta de minimum 18 ani împlinită care se înregistrează la Curs prin intermediul site-ului.</Text>
        <Text style={styles.bullet}>• <Text style={{ fontWeight: 'bold' }}>Poligonul gazdă:</Text> Poligon de Tragere Criș Sălaj, situat în Zalău, județul Sălaj, România.</Text>
        <Text style={styles.bullet}>• <Text style={{ fontWeight: 'bold' }}>Servicii:</Text> Curs de pregătire IPSC de 3 zile (30 ore active de antrenament), cazare opțională, închiriere echipament (armă, toc, muniție), catering (prânz, cină, BBQ) și tur ghidat la Porolissum.</Text>

        <Text style={styles.subHeading}>2. Condiții de Eligibilitate și Înregistrare</Text>
        <Text style={styles.paragraph}>
          Pentru a participa la Curs, Clientul trebuie să îndeplinească cumulativ următoarele condiții:
        </Text>
        <Text style={styles.bullet}>a) Să aibă vârsta minimă de 18 ani împlinită la data începerii Cursului.</Text>
        <Text style={styles.bullet}>b) Să nu se afle sub incidența niciunei interdicții legale privind deținerea, portul, utilizarea sau accesul la arme de foc în România conform Legii nr. 295/2004.</Text>
        <Text style={styles.bullet}>c) Să prezinte la începerea cursului un act de identitate valabil (C.I. sau Pașaport).</Text>
        <Text style={styles.bullet}>d) Să fie apt din punct de vedere medical și psihologic pentru desfășurarea activităților sportive și manipularea armelor sau replicilor de airsoft.</Text>

        <Text style={styles.subHeading}>3. Prețuri, Facturare și Modalități de Plată</Text>
        <Text style={styles.bullet}>• Prețul de bază al Cursului este de 420 EUR (include 3 zile de antrenament intensiv, prânz, cină și tur ghidat).</Text>
        <Text style={styles.bullet}>• Costurile opționale suplimentare sunt: Cazare (50 EUR / noapte în cameră dublă) și Închiriere armă + muniție (190 EUR, include pistol, centură, tocuri, protecții ochi/urechi și 350 cartușe).</Text>
        <Text style={styles.bullet}>• Plata se poate efectua prin transfer bancar sau prin plata online securizată cu cardul. Factura va fi emisă în RON, conversia din EUR realizându-se la cursul de schimb oficial al Băncii Naționale a României (BNR) din ziua emiterii facturii.</Text>
        <Text style={styles.bullet}>• Înregistrarea este considerată confirmată definitiv doar în momentul confirmării încasării integrale a sumei stabilite sau a avansului specificat de Organizator.</Text>

        <Text style={styles.subHeading}>4. Exceptarea de la Dreptul de Retragere (O.U.G. Nr. 34/2014)</Text>
        <Text style={styles.paragraph}>
          <Text style={{ fontWeight: 'bold' }}>IMPORTANT:</Text> Conform Articolului 16 litera l) din Ordonanța de Urgență nr. 34/2014 privind drepturile consumatorilor, sunt exceptate de la dreptul standard de retragere (dreptul de retur în 14 zile fără motiv) „prestările de servicii de cazare, altele decât în scop rezidențial, transportul de mărfuri, închirierea de mașini, cateringul sau serviciile legate de activitățile de agrement, în cazul în care contractul prevede o anumită dată sau perioadă de execuție”.
        </Text>
        <Text style={styles.paragraph}>
          Deoarece acest Curs este o activitate de agrement și pregătire sportivă programată la o dată fixă prestabilită și include logistică de cazare și catering contractată specific, Clientul înțelege și acceptă faptul că NU beneficiază de dreptul de retragere unilaterală în termen de 14 zile de la încheierea contractului la distanță.
        </Text>

        <Text style={styles.subHeading}>5. Politica Privată de Anulare și Rambursare a Organizatorului</Text>
        <Text style={styles.paragraph}>
          Deși dreptul legal de retragere nu se aplică, Organizatorul oferă următoarea politică comercială de anulare:
        </Text>
        <Text style={styles.bullet}>• Anulări efectuate cu mai mult de 30 de zile înainte de data începerii cursului: Se va rambursa 100% din suma achitată.</Text>
        <Text style={styles.bullet}>• Anulări efectuate în termen de 15-30 de zile înainte de începere: Se va rambursa 50% din suma achitată, restul acoperind costurile logistice deja angajate de Organizator cu partenerii de cazare/catering.</Text>
        <Text style={styles.bullet}>• Anulări efectuate cu mai puțin de 14 zile înainte de începere: Suma achitată este non-rambursabilă. Cu toate acestea, Clientul poate solicita transferul înscrierii către o altă persoană eligibilă, cu obligația de a notifica Organizatorul în scris cu cel puțin 3 zile înainte de curs.</Text>

        <Text style={styles.subHeading}>6. Regulament de Siguranță în Poligon și Excluderea Participantului</Text>
        <Text style={styles.bullet}>• Siguranța în poligon este prioritatea absolută. Participanții vor trece printr-un instructaj riguros privind regulile oficiale de siguranță IPSC și normele interne ale Poligonului de Tragere Criș Sălaj.</Text>
        <Text style={styles.bullet}>• Participantul se obligă să respecte necondiționat orice directivă primită de la instructorii certificați MISIA și de la personalul poligonului.</Text>
        <Text style={styles.bullet}>• Este strict interzisă prezența la antrenamente sub influența alcoolului, a substanțelor psihoactive sau a unor medicamente care afectează reflexele.</Text>
        <Text style={styles.bullet}>• Organizatorul își rezervă dreptul de a exclude imediat, fără avertisment și fără obligație de rambursare, orice participant care încalcă normele elementare de siguranță în manipularea armamentului sau nu respectă indicațiile instructorilor.</Text>

        <Text style={styles.subHeading}>7. Limitarea Răspunderii și Asumarea Riscurilor (Disclaimer)</Text>
        <Text style={styles.paragraph}>
          Activitățile de tir sportiv implică riscuri fizice inerente. Prin participarea la curs, Clientul își asumă pe proprie răspundere riscurile asociate cu manipularea armelor și participarea la antrenamentele dinamice. Organizatorul, instructorii MISIA și Poligonul de Tragere Criș Sălaj nu vor fi trași la răspundere pentru vătămările corporale sau pagubele materiale rezultate din nerespectarea regulamentului de siguranță.
        </Text>

        <Text style={styles.subHeading}>8. Soluționarea Litigiilor și Legea Aplicabilă</Text>
        <Text style={styles.paragraph}>
          Prezentul contract la distanță este guvernat de legea română. Orice neînțelegere sau litigiu va fi soluționat pe cale amiabilă. În cazul în care soluționarea pe cale amiabilă nu este posibilă, consumatorii au dreptul de a se adresa Autorității Naționale pentru Protecția Consumatorilor (ANPC), iar litigiile nerezolvate vor fi înaintate spre soluționare instanțelor de judecată competente din România.
        </Text>
      </>
    )
  },
  cookie: {
    title: 'Politica de Cookie-uri',
    content: (
      <>
        <Text style={styles.paragraph}>
          Ultima actualizare: Octombrie 2026. Această Politică de Cookie-uri explică ce sunt modulele cookie și cum le utilizăm pe site-ul nostru pentru a vă oferi o experiență de utilizare optimizată.
        </Text>

        <Text style={styles.subHeading}>1. Ce sunt Cookie-urile?</Text>
        <Text style={styles.paragraph}>
          Cookie-urile sunt fișiere text de mici dimensiuni plasate pe computerul sau dispozitivul dumneavoastră mobil de către site-urile web pe care le vizitați. Ele sunt utilizate pe scară largă pentru a asigura funcționarea eficientă a site-urilor, precum și pentru a furniza informații administratorilor site-ului.
        </Text>

        <Text style={styles.subHeading}>2. Tipurile de Cookie-uri pe care le Utilizăm</Text>
        <Text style={styles.bullet}>
          • <Text style={{ fontWeight: 'bold' }}>Cookie-uri Strict Necesare (Esenețiale):</Text> Acestea sunt indispensabile pentru a vă permite să navigați pe site și să utilizați funcțiile de bază (cum ar fi formularele de înregistrare). Fără aceste cookie-uri, serviciile solicitate nu pot fi furnizate.
        </Text>
        <Text style={styles.bullet}>
          • <Text style={{ fontWeight: 'bold' }}>Cookie-uri de Funcționalitate:</Text> Aceste cookie-uri permit site-ului nostru să își amintească opțiunile pe care le faceți (cum ar fi preferințele de limbă sau detaliile introduse în formulare) pentru a vă oferi o experiență personalizată.
        </Text>
        <Text style={styles.bullet}>
          • <Text style={{ fontWeight: 'bold' }}>Cookie-uri Analitice și de Performanță:</Text> Utilizăm servicii analitice anonimizate pentru a înțelege modul în care utilizatorii folosesc platforma noastră, ajutându-ne să îmbunătățim structura paginilor și timpii de încărcare.
        </Text>

        <Text style={styles.subHeading}>3. Controlul și Ștergerea Cookie-urilor</Text>
        <Text style={styles.paragraph}>
          Majoritatea browserelor web sunt configurate să accepte cookie-uri în mod automat. Cu toate acestea, aveți posibilitatea de a modifica setările browserului pentru a bloca instalarea cookie-urilor sau pentru a fi notificat înainte ca un cookie să fie stocat. Dezactivarea anumitor cookie-uri esențiale poate afecta funcționarea optimă a formularelor de înscriere de pe site.
        </Text>
      </>
    )
  }
};

export function LegalModal({ visible, onClose, type }) {
  const policy = POLICIES[type] || POLICIES.privacy;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{policy.title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollBody}>
            {policy.content}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
