
###### Algoritmi costruttivi
Quelli visti fin ora. Costruiscono passo dopo passo la soluzione del problema, partendo da una situazione di partenza vuota. Tengono in memoria uno o più cammini e, quando viene raggiunto uno stato obiettivo, il cammino verso quello stato costituisce una soluzione del problema.

# Algoritmi di ricerca locale
Algoritmi che si limitano a raggiungere l'obiettivo, senza curarsi del cammino. Operano sul singolo stato corrente invece che su cammini, cercando iterativamente la soluzione negli stati localmente "adiacenti", rimpiazzando la soluzione corrente con una migliore. Uno stato adiacente è diverso da quello attuale per piccole modifiche.
Tali algoritmi hanno il vantaggio principale di usare poca memoria, e di trovare soluzioni ragionevoli in spazi degli stati grandi o infiniti, in cui gli algoritmi sistematici non possono essere applicati.

###### Neighborhood
Sia $S$ l'insieme degli stati, sia $F(s)$ una funzione che assegna ad ogni stato $s ∈ S$ un insieme di stati neighborhood $N(s) ⊂ S$.
*$N(s)$ definisce l'insieme degli stati che possono essere raggiunti da $s$ in un singolo passo di ricerca dell'algoritmo.*
Tale approccio non garantisce assolutamente di trovare la soluzione ottima globalmente, ma al massimo una soluzione ottima rispetto ai cambiamenti locali.

###### Massimo locale
E' uno stato $s$ tale che per qualunque $s'$ appartenente all'intorno $N(s)$, si ha $f(s) ≥ f(s')$.

###### Massimo globale
E' ciò che si cerca in un problema di massimizzazione, per cui $f(s_{massimo}) ≥ f(s)$ per ogni $s$.
Più è grande il neighborhood, più è probabile che il massimo locale sia il massimo globale.

###### Iterative improvement
L'algoritmo di base rimpiazza iterativamente la soluzione/stato corrente con una migliore trovata tra i vicini (se c'è), altrimenti termina con un massimo locale. Tale discorso è equivalente se si parla di minimi e minimizzazione.

---
## Algoritmo Hill Climbing

Ad ogni stato è associata un'altezza. L'obiettivo è trovare l'altezza più alta, che corrisponde al [[#Massimo globale]] (o minimo).
L'algoritmo non tiene traccia dell'albero di ricerca ma solo dello stato corrente.

###### Problemi
- Massimi locali
	  Se nel [[#Neighborhood]] dello stato corrente si trova un massimo locale, c'è il rischio che l'algoritmo veda tale massimo come massimo globale perché non trova attorno a sè altre soluzioni migliori.
- Pianori o Altopiani
	  Zone piatte dello stato di ricerca in cui gli stati vicini hanno tutti lo stesso valore. In quale direzione muoversi (scelta casuale)?
- Crinali
	  E' una zona più alta di quelle adiacenti verso cui dovremmo andare, ma non possiamo andarci in modo diretto. Dobbiamo quindi muoverci in un'altra direzione per raggiungerlo.
![[Pasted image 20230606114319.png | 500]]
Una possibile soluzione: ripartire con una nuova ricerca da una soluzione di partenza random o generata in modo costruttivo. Si salva poi la soluzione migliore dopo una serie di tentativi.

---
# Meta-Euristiche
Si definiscono meta-euristiche l'insieme di algoritmi, tecniche e studi relativi all'applicazione di criteri euristici per risolvere problemi di ottimizzazione (e quindi di migliorare la ricerca locale con criteri abbastanza generali).
- ANT colony optimization: è ispirata al comportamento di colonie di insetti, i quali hanno la capacità di trovare sempre il cammino migliore per arrivare al cibo a partire dal formicaio (si tratta di algoritmi di ricerca cooperativi).
- Tabu search: è caratterizzato dal fatto di usare una memoria in modo da evitare la ripetizione di stati già esplorati.
- Algoritmi genetici: si ispirano ai modelli di evoluzione delle specie in natura, utilizzando il principio di selezione naturale che favoriscono gli individui di una popolazione che sono più adatti ad un determinato ambiente. Ogni individuo rappresenta una soluzione con il corrispondente valore della funzione di valutazione.

---
# Ricerca in grafi AND/OR
