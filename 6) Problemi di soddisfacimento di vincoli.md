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

#### Algoritmi di risoluzione di un CSP
1) Poiché l'assegnamento deve essere completo, se $n$ è il numero di variabili, la profondità dell'albero di ricerca è $n$. Per questo motivo è popolare utilizzare [[3) Strategie di ricerca non informate#Depth First Search|Depth First Search]]. Nell'albero, ogni livello corrisponde all'assegnamento della stessa variabile, ogni nodo è l'assegnamento della variabile nei vari valori del proprio dominio. L'albero termina con una soluzione ([[#^assegnamento-completo|assegnamento completo]]) o fallimento. 
![[Pasted image 20230606150501.png|450]]

2) *Il cammino con cui si arriva alla soluzione è sempre irrilevante.* Si può usare una **formulazione a stato completo**, nella quale ogni stato è un assegnamento completo che può soddisfare i vincoli. Qui si possono usare [[5) Algoritmi di ricerca locale|algoritmi di ricerca locale]]. ^formulazione-a-stato-completo

3) Esistono due validi approcci per la risoluzione di un CSP:
	1) [[#Tecniche di Consistenza]]. Essi sono basati sulla propagazione dei vincoli per derivare un problema più semplice di quello (completo) originale. Tipicamente si applicano per prime.
	2) [[#Algoritmi di Propagazione]]. Tipicamente si applicano dopo le tecniche di consistenza.

Qualsiasi algoritmo si utilizzi, esso ha sempre tre gradi di libertà:
	- a scelta per la selezione della variabile -> dipende dall'[[#Euristica per la selezione della variabile]].
	- la scelta per la selezione del valore da attribuire alla variabile corrente -> dipende dall'[[#Euristica per la selezione del valore]].
	- la **propagazione** effettuata in ciascun nodo -> dipende dagli [[#Algoritmi di Propagazione]].

---
# Algoritmi di Propagazione

## Algoritmi generativi/senza propagazione
Applicano *a posteriori* i vincoli.
Tipicamente si applicano dopo le tecniche di consistenza.

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
## Algoritmi di/con propagazione

Applicano *a priori* i vincoli, in modo da evitare backtraking, "potando l'albero" a priori (**pruning**) dai rami che porterebbero ad un sicuro insuccesso. ^pruning

### Forward Checking (FC)
Dopo ogni assegnazione, associa a ciascuna variabile l'insieme dei valori ammissibili rimanenti della variabile stessa.
L'assegnazione di un valore ad una variabile ha ripercussioni sull'insieme dei valori disponibili per le variabili ancora libere. In questo modo i vincoli agiscono in avanti (forward) e limitano lo spazio delle soluzioni prima che vengano effettuati tentativi su di esso.
Se ad un certo punto della computazione ci si accorge che un dominio associato ad una variabile risulta vuoto il meccanismo del Forward Checking fallisce senza proseguire in tentativi e poi si esgue backtracking.
![[Pasted image 20230606161244.png|450]]

### Look Ahead
Dopo ogni assegnazione, associa a ciascuna variabile l'insieme dei valori ammissibili rimanenti della variabile stessa.
In più viene sviluppato il look ahead (sguardo in avanti) che, nei domini associati alle variabili ancora libere, controlla l'esistenza di valori compatibili con i vincoli contenenti solo variabili ancora libere.

##### Partial Look Ahead (PLA)
Si ha una propagazione dei vincoli tra una variabile $X_h$ non ancora assegnata e le variabili future, ossia le variabili $X_{h+1}, ..., X_n$.
In pratica, nel dominio della variabile $X_h$ (non ancora assegnata) deve esistere *almeno un* valore compatibile con *tutte* le variabili *successive* a $X_h$ non ancora assegnate ($X_{h+1}, ..., X_n$), quindi compatibile con *almeno un* valore nel loro dominio. Questo ragionamento si applica per ogni variabile non assegnata (non solo $H_n$).

##### Full Look Ahead (FLA)
Se $X_k$ è la variabile appena assegnata, si ha una propagazione dei vincoli tra una variabile $X_h$, non ancora istanziata, e tutte le variabili non ancora assegnate, ossia le variabili $X_{k+1}, ..., X_{h−1}, X_{h+1}, ..., X_n$ (non solo le variabili successive come nella PLA).
In pratica,  nel dominio della variabile $X_h$ (non ancora assegnata) deve esistere *almeno un* valore compatibile con *tutte* le variabili (*successive e precedenti*) a $X_h$ non ancora assegnate ($X_{k+1}, ..., X_{h−1}, X_{h+1}, ..., X_n$), quindi compatibile con *almeno un* valore nel loro dominio. Questo ragionamento si applica per ogni variabile non assegnata (non solo $H_n$).


---
# Euristiche

- **euristiche statiche**: determinano l'ordine in cui le variabili (o i valori) vengono scelti prima di iniziare la ricerca. Tale ordine rimane invariato durante tutta la ricerca ^euristiche-statiche
- **euristiche dinamiche**: scelgono la prossima selezione da effettuare ogni volta che una nuova selezione viene richiesta (quindi ad ogni passo di labeling). ^euristiche-dinamiche

## Euristica per la selezione della variabile
Entrambe queste euristiche decidono di istanziare prima le variabili più difficili da assegnare.
###### First Fail o Minimum Remaining Values (MRV)
Sceglie la variabile con il dominio di cardinalità minore.
###### Most Constrained Principle
Sceglie la variabile legata a più vincoli.

## Euristica per la selezione del valore
###### Least Constrained Principle
Si scegliere prima il valore che si ritiene abbia più probabilità di successo.


---
# Tecniche di Consistenza
Le tecniche di consistenza riducono il problema originale *eliminando dai domini delle variabili i valori che non possono comparire in una soluzione finale*. 
Possono essere applicate staticamente oppure ad ogni passo di assegnamento (labeling).

###### Constraint Graph
Per applicare tali tecniche bisogna rappresentare il problema come una rete di vincoli, chiamata grafo dei vincoli (**constraint graph**).
I nodi del grafo rappresentano le variabili del CSP, mentre gli archi rappresentano i vincoli tra tali variabili.

#### Livelli di consistenza
###### Livello 1 - Node Consistency
Riguarda un solo nodo. Esso è consistente se per ogni valore $X_i ∈ D_i$ il vincolo $P(i)$ su $X_i$ è soddisfatto.
Nell'esempio qui sotto, il nodo non è consistente.
![[Pasted image 20230606180122.png]]

###### Livello 2 - Arc Consistency
Sia $A(i,j)$ un arco che collega il nodo $X_i$ al nodo $X_j$ , l'arco è consistente se per ogni valore $x ∈ D_i$ esiste *almeno un* valore $y ∈ D_j$ tale che il vincolo tra $X_i$ e $X_j$ sia soddisfatto.
Nell'esempio qui sotto, tutti gli archi sono consistenti dopo la rimozione di "r" e "g".
![[Pasted image 20230606180813.png]]

Le modifiche al dominio di qualche nodo può modificare la arc consistenza da altri nodi. Bisogna dunque iterare le modifiche finché non si giunge ad uno stato di quiescenza in cui tutto il grafo è arc consistente.
Il controllo della consistenza di un arco può essere applicato come passo di propagazione dopo ogni assegnamento.
**AC-3** è l'algoritmo completo per il controllo di consistenza. ^AC-3

###### Livello 3 - Path Consistency
Un cammino tra i nodi ($X_i , X_j , X_k$) è path consistente se, $∀x ∈ D_i$ , $y ∈ D_j$  ,che rispettano la node e la arc consistenza, esiste un valore $z ∈ D_k$ che soddisfa contemporaneamente i vincoli $P(i, k), P(k, j)$. 
La consistenza del vincolo unario $P(k)$ è garantita dalla node consistency della rete.
Nell'esempio qui sotto, tutti gli archi sono consistenti, ma il cammino dei tre nodi non lo è.
![[Pasted image 20230606181911.png]]


###### Livello k - K-Consistency
Dati $k − 1$ nodi (variabili) consistenti con i vincoli, sia $k$ ogni altra variabile, se essa soddisfa i vincoli con tutte le altre $k-1$ variabili allora le $k$ variabili sono $k$-consistenti.
Ad esempio con $k=3$ (path consistency) la definizione si riformula in questo modo:
	Dati 3−1=2 nodi (variabili) consistenti, se il terzo nodo (variabile) soddisfa i vincoli con le altre 2 variabili, allora le 3 variabili sono $k$-consistenti.

In generale, se un grafo contenente $n$ variabili è $k$-consistente con $k < n$, allora per trovare una soluzione è necessaria una ricerca nello spazio restante. 
Invece se un grafo contenente $n$ variabili è $n$-consistente, allora esiste sicuramente una soluzione ammissibile: questo perché nei domini saranno rimasti solo dei valori che possono far parte di una soluzione, quindi per qualunque valore scelto per una certa variabile, è sicuro che esiste una soluzione ammissibile.