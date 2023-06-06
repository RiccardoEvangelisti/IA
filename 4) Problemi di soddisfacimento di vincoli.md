Molti problemi di intelligenza artificiale possono essere visti come problemi di soddisfacimento di vincoli o **CSP** (Constraints Satisfaction Problem), il cui obiettivo è trovare uno stato del problema che soddisfi determinati vincoli. ^CSP

###### Vincolo
Un CSP può essere definito su un insieme finito di variabili ($X_1, X_2, ..., X_n$) i cui valori appartengono a domini finiti ($D_1, D_2, ..., D_n$), e su un insieme di vincoli. Un **vincolo** $c(X_{i1}, X_{i2}, ..., X_{ik})$ tra $k$ variabili è un sottoinsieme del prodotto cartesiano $D_{i1} × D_{i2} × ... × D_{ik}$ che specifica quali valori delle variabili sono compatibili con le altre.
Tale sottoinsieme non deve essere definito esplicitamente ma è rappresentato in termini di relazioni.
Una soluzione ad un CSP significa un assegnamento di tutte le variabili che soddisfi tutti i vincoli.

###### CPS come [[2) Ricerca nello spazio degli stati|problema di ricerca nello spazio degli stati]]
- stato iniziale è l'assegnamento vuoto { } delle variabili.
- stato attuale è definito dalle variabili $X_i$ con valori nei dominii $D_i$.
- funzione successore assegna un valore ad una variabile non ancora legata. Fallisce se non esiste.
- goal test: tutte le variabili sono assegnate, ossia tutti i vincoli sono rispettati.




Goal test: l’assegnamento è completo (tutte le variabili sono legate). Caratteristiche: • Schema identico per tutti i CSP • Profondità limitata a n se n sono le variabili  usa depth-first search • La strada è irrilevante. • Problema commutativo con dn foglie (se d è la cardinalità dei domini)
