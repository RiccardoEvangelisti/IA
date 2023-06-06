
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

Se nel [[#Neighborhood]] dello stato corrente si trova un massimo locale, c'è il rischio che l'algoritmo veda tale massimo come massimo globale.

Inoltre, la funzione f(·) pu`o presentare altopiani, zone molto “piatte” nelle quali gli stati vicini hanno tutti lo stesso valore e non `e immediato decidere verso quale stato muoversi, o “crinali”, stati con un valore maggiore ai quali non `e possibile arrivare direttamente. Una possibile soluzione a questi problemi `e lanciare pi`u volte l’algoritmo con condizioni iniziali casuali, salvare la soluzione migliore e restituirla dopo un certo numero di tentativi dettato dal tempo di computazione o dal numero di iterazioni.