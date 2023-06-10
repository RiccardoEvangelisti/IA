Molti problemi di intelligenza artificiale possono essere visti come problemi di soddisfacimento di vincoli o **CSP** (Constraints Satisfaction Problem), il cui obiettivo è trovare uno stato del problema che soddisfi determinati vincoli. ^CSP

### Vincolo
Un CSP può essere definito su un insieme finito di variabili ($X_1, X_2, ..., X_n$) i cui valori appartengono a domini finiti ($D_1, D_2, ..., D_n$), e su un insieme di vincoli. Un **vincolo** $c(X_{i1}, X_{i2}, ..., X_{ik})$ tra $k$ variabili è un sottoinsieme del prodotto cartesiano $D_{i1} × D_{i2} × ... × D_{ik}$ che specifica quali valori delle variabili sono compatibili con le altre.
Tale sottoinsieme non deve essere definito esplicitamente ma è rappresentato in termini di relazioni. 
Una soluzione ad un CSP significa un assegnamento di tutte le variabili che soddisfi tutti i vincoli.

---
### CPS come [[2) Ricerca nello spazio degli stati|problema di ricerca nello spazio degli stati]]
- stato iniziale è l'assegnamento vuoto { } delle variabili.
- stato attuale è definito dalle variabili $X_i$ con valori nei domini $D_i$.
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
	- la **propagazione dei vincoli** effettuata in ciascun nodo -> dipende dagli [[#Algoritmi di/con propagazione]]. La propagazione dei vincoli consiste nell'eliminazione dei valori incompatibili con quello appena istanziato dai domini delle variabili non ancora istanziate. ^propagazione

---
## Algoritmi generativi/senza propagazione
*Algoritmi che GENERANO l'albero, assegnando variabili, e applicano **a posteriori** i vincoli.*
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
Algoritmi che *propagano i vincoli (quindi NON istanziano)*, ossia eliminano dai domini delle variabili non ancora istanziate i valori incompatibili con quello appena istanziato, applicando *a priori* i vincoli, in modo da evitare backtracking, "potando l'albero" a priori (**pruning**) dai rami che porterebbero ad un sicuro insuccesso. ^pruning

### Forward Checking (FC)
Dopo l'assegnamento di una variabile, applicando l'algoritmo *si vanno a modificare i domini di tutte (E SOLE) le variabili che hanno un vincolo con la variabile appena assegnata.* Cioè viene controllata la compatibilità dei vincoli contenenti la variabile appena assegnata con le precedenti (istanziate) e le successive (libere).
*I domini di variabili che non hanno vincoli con la variabile appena assegnata non vengono toccati*.

In questo modo i vincoli agiscono in avanti (forward) e limitano lo spazio delle soluzioni prima che vengano effettuati tentativi su di esso.

Se ad un certo punto della computazione ci si accorge che un dominio associato ad una variabile risulta vuoto il meccanismo del Forward Checking fallisce senza proseguire in tentativi e poi si esegue backtracking.

![[Pasted image 20230606161244.png|450]]

### Look Ahead
Come per il Forward Checking, dopo ogni assegnazione viene controllata la compatibilità dei vincoli contenenti la variabile appena assegnata con le precedenti (istanziate) e le successive (libere).

In più viene sviluppato il look ahead (sguardo in avanti) che, nei domini associati alle variabili ancora libere, controlla l'esistenza di valori compatibili con i vincoli contenenti solo variabili ancora libere.

##### Partial Look Ahead (PLA)
Sia $X_{k}$ la variabile appena assegnata e $X_h$ una generica variabile futura non assegnata. Si ha una propagazione dei vincoli tra OGNI variabile $X_h$ e le variabili successive non istanziate $X_{h+1}, ..., X_n$, **andando a ridurre il dominio di solo $X_h$**.
In pratica, $X_h$ (non ancora assegnata) deve rispettare i vincoli con tutte le sue successive $X_{h+1}, ..., X_n$. Poi $X_{h+1}$ deve rispettare i vincoli con tutte le sue successive $X_{h+2}, ..., X_n$. E via così fino all'ultima variabile, che non farà nessun controllo.

##### Full Look Ahead (FLA)
Sia $X_{k}$ la variabile appena assegnata e $X_h$ una generica variabile futura non assegnata. Si ha una propagazione dei vincoli tra OGNI variabile $X_h$ e le variabili *precedenti e successive non istanziate* $X_{k+1}, ..., X_{h−1}, X_{h+1}, ..., X_n$., **andando a ridurre il dominio di solo $X_h$**.
In pratica, $X_h$ (non ancora assegnata) deve rispettare i vincoli con tutte le sue precedenti e successive $X_{k+1}, ..., X_{h−1}, X_{h+1}, ..., X_n$. Poi $X_{h+1}$ deve rispettare i vincoli con tutte le sue precedenti e successive $X_{k+1}, ..., X_{h}, X_{h+2}, ..., X_n$. E via così fino all'ultima variabile, che controllerà solo le precedenti.


> [!Modellazione] 
> come si fanno??????????????????????????????? #TODO


> [!Ricerca Forward Checking] Ricerca Forward Checking
> Dato il modello del problema, i vincoli e la scelta euristica sulle variabili e sui valori, si applichi [[#Forward Checking (FC)]]
> 1) Disegnare la tabella.
> 2) Procedere con l'assegnamento della variabile secondo l'euristica
> 3) Applica il FC: viene controllata la compatibilità dei vincoli contenenti la variabile appena assegnata con le precedenti (istanziate) e le successive (libere), **andando a ridurre il dominio delle variabili successive**.
> 4) Se una variabile giunge ad un dominio vuoto, fare backtracking come in depth first.
>    ![[Pasted image 20230609152115.png|350]]



> [!Ricerca Partial/Full Look Ahead] Ricerca Partial/Full Look Ahead
> 1) Disegnare la tabella
> 2) Procedere con l'assegnamento della variabile secondo l'euristica
> 3) Eseguire FC: applicare i vincoli contenenti la variabile appena assegnata con le precedenti e le successive, andando a ridurre il dominio delle variabili successive. 
> 4) Eseguire Look Ahead: 
> 	1) [[#Partial Look Ahead (PLA)]]
> 	2) [[#Full Look Ahead (FLA)]]
> 5) Assegnare un'altra variabile, ..., fare backtracking come deep-first in caso di fallimento




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

Gli archi possono essere orientati o non orientati: ad esempio il vincolo $>$ viene rappresentato da un arco orientato, mentre il vincolo $\ne$ da un arco semplice (non orientato o doppiamente orientato).

###### Constraint Graph
Per applicare tali tecniche bisogna rappresentare il problema come una rete di vincoli, chiamata grafo dei vincoli (**constraint graph**).
I nodi del grafo rappresentano le variabili del CSP, mentre gli archi rappresentano i vincoli tra tali variabili.

#### Livelli di consistenza
###### Livello 1 - Node Consistency
Riguarda un solo nodo. Esso è consistente se per ogni valore $X_i ∈ D_i$ il vincolo $P(i)$ su $X_i$ è soddisfatto.
Nell'esempio qui sotto, il nodo non è consistente.
![[Pasted image 20230606180122.png]]

###### Livello 2 - Arc Consistency
Sia $A(i,j)$ un arco che collega il nodo $X_i$ al nodo $X_j$ , l'arco è consistente se *per ogni valore* $x ∈ D_i$ esiste *almeno un* valore $y ∈ D_j$ tale che il vincolo tra $X_i$ e $X_j$ sia soddisfatto.
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
Dati $k − 1$ nodi (variabili) consistenti con i vincoli, sia $k$ una variabile non ancora assegnata, se essa soddisfa i vincoli con tutte le altre $k-1$ variabili allora le $k$ variabili sono $k$-consistenti.
Ad esempio con $k=3$ (path consistency) la definizione si riformula in questo modo:
	Dati 3−1=2 nodi (variabili) consistenti, se il terzo nodo (variabile) soddisfa i vincoli con le altre 2 variabili, allora le 3 variabili sono $k$-consistenti.

In generale, se un grafo contenente $n$ variabili è $k$-consistente con $k < n$, allora per trovare una soluzione è necessaria una ricerca nello spazio restante. 
Invece se un grafo contenente $n$ variabili è $n$-consistente, allora esiste sicuramente una soluzione ammissibile: questo perché nei domini saranno rimasti solo dei valori che possono far parte di una soluzione, quindi per qualunque valore scelto per una certa variabile, è sicuro che esiste una soluzione ammissibile.



> [!Grafo e Arc-Consistency] Disegnare Grafo e Arc consistenza
> 1) Disegnare i nodi con i valori di dominio dati
> 2) Verificare [[#Livello 2 - Arc Consistency]] applicando i vincoli, **seguendo l'ordine con cui i vincoli sono dati**.
>     - **In base all'euristica applichi un ordine preciso di vincoli. Di solito applichi prima l'operazione nel verso dell'arco, poi nel verso opposto.** Poiché applichi tutti i vincoli in ogni caso, alla fine la soluzione è la stessa, al massimo cambia il numero di iterazioni che devi fare prima della quiescenza. 
>     - ** TRA DUE NODI VAI A MODIFICARE IL NODO DI PARTENZA**
> 4) Ogni "iterazione" corrisponde a quante volte ripeti la verifica di tutti i vincoli
> 5) Dopo una intera iterazione in cui non è cambiato nulla, si ha raggiunti la quiescenza.
>![[Pasted image 20230609155543.png]]

> [!Disegnare Albero e Arc-consistenza] Disegnare Albero e Arc-consistenza
> Disegnare l'albero:
> ![[Pasted image 20230609125644.png|400]]
> 1) Si parte da un ramo. Ogni ramo è l'assegnamento di variabile. Accanto ad ogni nodo scrivi i cambiamenti di dominio, se presenti
> 2) Se euristica [[#First Fail o Minimum Remaining Values (MRV)]], scrivi una tabellina:
>
   Nodo | Cardinalità
   -- | --
   A | ..
   B | ..
   C | ..
   .... | ..
>3) Selezioni il nodo con cardinalità minore. A parità di cardinalità, vai in ordine alfabetico.
>4) Assegna al nodo selezionato il primo valore (se non è richiesto altro).
>5) SE RICHIESTO, APPLICHI LA [[#Livello 2 - Arc Consistency|Arc Consistency]], aggiornando tutti i dominii coninvolti. ATTENZIONE perché devi aggiornare a cascata tutti i dominii che hai appena aggiornato.
>6) Aggiorna la tabella con le nuove cardinalità:
>
Nodo | Cardinalità
   -- | --
   A | .. , ..
   B | .., ..
   C | .., ..
   .... | .., ..
