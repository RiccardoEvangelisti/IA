Molti problemi di intelligenza artificiale possono essere visti come problemi di soddisfacimento di vincoli o **CSP** (Constraints Satisfaction Problem), il cui obiettivo è trovare uno stato del problema che soddisfi determinati vincoli. ^CSP

### Vincolo
Un CSP può essere definito su un insieme finito di variabili ($X_1, X_2, ..., X_n$) i cui valori appartengono a domini finiti ($D_1, D_2, ..., D_n$), e su un insieme di vincoli. Un **vincolo** $c(X_{i1}, X_{i2}, ..., X_{ik})$ tra $k$ variabili è un sottoinsieme del prodotto cartesiano $D_{i1} × D_{i2} × ... × D_{ik}$ che specifica quali valori delle variabili sono compatibili con le altre.
Tale sottoinsieme non deve essere definito esplicitamente ma è rappresentato in termini di relazioni.
Una soluzione ad un CSP significa un assegnamento di tutte le variabili che soddisfi tutti i vincoli.

### CPS come [[2) Ricerca nello spazio degli stati|problema di ricerca nello spazio degli stati]]
- stato iniziale è l'assegnamento vuoto { } delle variabili.
- stato attuale è definito dalle variabili $X_i$ con valori nei dominii $D_i$.
- funzione successore assegna un valore ad una variabile non ancora legata. Fallisce se non esiste.
- goal test: *tutte le variabili sono assegnate (assegnamento completo)*, ossia tutti i vincoli sono rispettati.

#### Risolvere CPS con DFS
Poiché l'assegnamento deve essere completo, se $n$ è il numero di variabili, la profondità dell'albero di ricerca è $n$. Per questo motivo è popolare utilizzare [[3a) Strategie di ricerca non informate#Depth First Search|Depth First Search]]. Nell'albero, ogni livello corrisponde all'assegnamento della stessa variabile, ogni nodo è l'assegnamento della variabile nei vari valori del proprio dominio. L'albero termina con una soluzione (assregnamento completo) o fallimento. 
![[Pasted image 20230606150501.png|450]]

#### Risolvere CPS con [[3c) Algoritmi di ricerca locale|algoritmi di ricerca locale]]
*Il cammino con cui si arriva alla soluzione è sempre irrilevante.* Si può usare una **formulazione a stato completo**, nella quale ogni stato è un assegnamento completo che può soddisfare i vincoli. Qui si possono usare [[3c) Algoritmi di ricerca locale|algoritmi di ricerca locale]]. ^formulazione-a-stato-completo
