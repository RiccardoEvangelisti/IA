Molti problemi di intelligenza artificiale possono essere visti come problemi di soddisfacimento di vincoli o **CSP** (Constraints Satisfaction Problem), il cui obiettivo è trovare uno stato del problema che soddisfi determinati vincoli. ^CSP

### Vincolo
Un CSP può essere definito su un insieme finito di variabili ($X_1, X_2, ..., X_n$) i cui valori appartengono a domini finiti ($D_1, D_2, ..., D_n$), e su un insieme di vincoli. Un **vincolo** $c(X_{i1}, X_{i2}, ..., X_{ik})$ tra $k$ variabili è un sottoinsieme del prodotto cartesiano $D_{i1} × D_{i2} × ... × D_{ik}$ che specifica quali valori delle variabili sono compatibili con le altre.
Tale sottoinsieme non deve essere definito esplicitamente ma è rappresentato in termini di relazioni.
Una soluzione ad un CSP significa un assegnamento di tutte le variabili che soddisfi tutti i vincoli.

---
### CPS come [[2) Ricerca nello spazio degli stati|problema di ricerca nello spazio degli stati]]
- stato iniziale è l'assegnamento vuoto { } delle variabili.
- stato attuale è definito dalle variabili $X_i$ con valori nei dominii $D_i$.
- funzione successore assegna un valore ad una variabile non ancora legata. Fallisce se non esiste.
- goal test: *tutte le variabili sono assegnate (assegnamento completo)*, ossia tutti i vincoli sono rispettati. ^assegnamento-completo

#### Algoritmo di risoluzione di un CSP
1) Poiché l'assegnamento deve essere completo, se $n$ è il numero di variabili, la profondità dell'albero di ricerca è $n$. Per questo motivo è popolare utilizzare [[3a) Strategie di ricerca non informate#Depth First Search|Depth First Search]]. Nell'albero, ogni livello corrisponde all'assegnamento della stessa variabile, ogni nodo è l'assegnamento della variabile nei vari valori del proprio dominio. L'albero termina con una soluzione ([[#^assegnamento-completo|assegnamento completo]]) o fallimento. 
![[Pasted image 20230606150501.png|450]]

2) *Il cammino con cui si arriva alla soluzione è sempre irrilevante.* Si può usare una **formulazione a stato completo**, nella quale ogni stato è un assegnamento completo che può soddisfare i vincoli. Qui si possono usare [[3c) Algoritmi di ricerca locale|algoritmi di ricerca locale]]. ^formulazione-a-stato-completo

3) Esistono due validi approcci per la risoluzione di un CSP:
	1) Tecniche di Consistenza. Essi sono basati sulla propagazione dei vincoli per derivare un problema più semplice di quello (completo) originale. Tipicamente si applicano per primi.
	2) Algoritmi di Propagazione. Essi sono basati sulla propagazione dei vincoli per eliminare a priori, durante la ricerca, porzioni dell'albero decisionale che porterebbero ad un sicuro fallimento (compatibilmente con le scelte già effettuate). Tipicamente si applicano dopo le tecniche di consistenza.

Qualsiasi algoritmo si utilizzi, esso ha sempre tre gradi di libertà:
- la scelta nell'ordinamento delle variabili -> dipende dall'euristica
- la scelta nell'ordine di selezione del valore da attribuire alla variabile corrente -> dipende dall'euristica
- la **propagazione** effettuata in ciascun nodo -> dipende dalla strategia con/senza Propagazione.

---
# Algoritmi di Propagazione

## Algoritmi generativi/senza propagazione

### Generate and Test (GT)
Si sviluppa un albero decisionale percorrendolo in profondità assegnando valori alle variabili *senza preoccuparsi di verificare la consistenza con gli altri vincoli*.
Solo in un secondo tempo si considerano gli altri vincoli rifiutando la soluzione trovata perché incompatibile con i vincoli del problema. A questo punto inizia la procedura di backtracking tentando con la seconda permutazione e così via finché non si trova una soluzione.
In questo modo i vincoli sono utilizzati per limitare lo spazio delle soluzioni dopo averlo generato, quindi a posteriori.

### Standard backtracking (SB)
A ogni assegnamento di una variabile, si verifica la coerenza della variabile appena assegnata con quelle assegnate precedentemente.
E' equivalente alla risoluzione Depth First Strategy.
Più efficiente di [[#Generate and Test (GT)|GT]] perché non procede nell'espansione dei rami appena questi non rispettano i vincoli. I vincoli sono utilizzati all'indietro (backward) e portano a una effettiva riduzione dello spazio di ricerca. Tuttavia questa riduzione viene fatta a posteriori (a posteriori-pruning) cioè dopo aver effettuato il tentativo.
![[Pasted image 20230606161100.png|450]]

---
## Algoritmi di propagazione

Applicano *a priori* i vincoli, in modo da evitare backtraking, "potando l'albero" a priori (**pruning**) dai rami che porterebbero ad un sicuro insuccesso. ^pruning

### Forward Checking (FC)
Dopo ogni assegnazione, associa a ciascuna variabile l'insieme dei valori ammissibili rimanenti della variabile stessa.
L'assegnazione di un valore ad una variabile ha ripercussioni sull'insieme dei valori disponibili per le variabili ancora libere. In questo modo i vincoli agiscono in avanti (forward) e limitano lo spazio delle soluzioni prima che vengano effettuati tentativi su di esso.
Se ad un certo punto della computazione ci si accorge che un dominio associato ad una variabile risulta vuoto il meccanismo del Forward Checking fallisce senza proseguire in tentativi e poi si esgue backtracking.
![[Pasted image 20230606161244.png|450]]

### Partial and Full Look Ahead (P/F LA)
Dopo ogni assegnazione, associa a ciascuna variabile l'insieme dei valori ammissibili rimanenti della variabile stessa.
In più viene sviluppato il look ahead (sguardo in avanti) che controlla l'esistenza, nei domini associati alle variabili ancora libere, di valori compatibili con i vincoli contenenti solo variabili non istanziate.
