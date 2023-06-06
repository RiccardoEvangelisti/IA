
###### Algoritmi costruttivi
Quelli visti fin ora. Costruiscono passo dopo passo la soluzione del problema, partendo da una situazione di partenza vuota. Tengono in memoria uno o più cammini e, quando viene raggiunto uno stato obiettivo, il cammino verso quello stato costituisce una soluzione del problema.

# Algoritmi di ricerca locale
Algoritmi che si limitano a raggiungere l'obiettivo, senza curarsi del cammino. Operano sul singolo stato corrente invece che su cammini, cercando iterativamente la soluzione negli stati localmente "adiacenti", rimpiazzando la soluzione corrente con una migliore. Uno stato adiacente è diverso da quello attuale per piccole modifiche.
Tali algoritmi hanno il vantaggio principale di usare poca memoria, e di trovare soluzioni ragionevoli in spazi degli stati grandi o infiniti, in cui gli algoritmi sistematici non possono essere applicati.

###### Neighborhood
E' una funzione che assegna ad ogni soluzione $s$ un insieme di soluzioni $N(s)$, entrambi appartenenti all'insieme di soluzioni generale $S$. Definisce l'insieme delle soluzioni che possono essere raggiunte da $s$ in un singolo passo di ricerca dell'algoritmo. Tale approccio non garantisce assolutamente di trovare la soluzione ottima globalmente, ma al massimo una soluzione ottima rispetto ai cambiamenti locali.

###### Massimo locale
E' una soluzione $s$ tale che per qualunque $s'$ appartenente all'intorno $N(s)$, si ha $f(s) ≥ f(s')$.

###### Massimo globale
E' ciò che si cerca in un problema di massimizzazione, per cui $f(s) ≥ f(s')$