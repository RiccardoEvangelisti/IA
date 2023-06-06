Una strategia informata sfrutta la conoscenza (euristica: in greco "trovare") sul problema per decidere quale nodo espandere per primo, invece di espandere i nodi in modo qualunque.

###### Funzione di valutazione
Una funzione di valutazione $f(n)$ fornisce, dato uno stato $n$, una stima computazionale dello sforzo per raggiungere lo stato finale. La funzione deve fornire una stima che riduca la complessità spaziale del problema, e deve tenere conto del tempo speso a calcolare la stima stessa. ^funzione-di-valutazione
Trovare una funzione di valutazione precisa e veloce è molto difficile.

###### Funzione euristica
La funzione euristica $h(n)$, dato uno stato $n$, restituisce la distanza (in termini di costo) dall'obiettivo $goal$: $h(goal) = 0$ ^funzione-euristica


###### Euristica ammissibile
La funzione euristica $h(n)$ è un'euristica **ammissibile** se non sbaglia mai per eccesso la stima (del costo per arrivare all'obiettivo).
Indicando con $vera\_distanza(n)$ la vera distanza tra il nodo $n$ e il goal, la funzione euristica $h(n)$ è ammissibile se abbiamo sempre che:
	*$h(n) \le vera\_distanza(n)$*

Se  $h(n) \le h'(n) \le vera\_distanza(n)$  , la migliore è $h'(n)$.


###### Euristica consistente/monotòna
La funzione euristica $h(n)$ è un'euristica **consistente/monotòna** se:
	per ogni nodo $n$
	per ogni nodo successore $n'$ di $n$, generato da un'azione $a$:
	il costo stimato per raggiungere il goal (partendo da $n$) è minore-uguale al costo di passo per arrivare ad $n'$ sommato al costo stimato per andare da $n'$ al goal:
	- $h(n) = 0$, se $n$ coincide con il goal
	- $h(n) ≤ c(n, a, n') + h(n')$, ovvero la stima di $n$ deve essere minore-uguale della strada per arrivare da $n$ ad $n'$ sommata alla stima di $n'$ (proprietà triangolare).

Questo significa che, se si hanno più strade, verranno valutate sempre per prime le strade migliori.
$h(n)$ è anche [[2) Ricerca nello spazio degli stati#Sistema di produzioni monotòno]]

---
# Best First Search
Utilizzando la [[#Funzione di valutazione]], viene scelto il nodo con la valutazione più bassa, in quanto tale funzione misura la distanza dall'obiettivo, e viene inserito in testa alla coda (in modo che sia il prossimo ad essere espanso).
Non è detto che tale scelta sia in verità la migliore, infatti se potessimo sempre espandere per primo il nodo migliore, non ci sarebbe affatto ricerca.

---
## Best First Greedy
La funzione di valutazione è uguale alla funzione euristica, quindi cerca sempre di espandere il nodo più vicino all'obiettivo: 
	$f(n) = h(n)$
Termina appena si raggiunge il goal, escludendo eventuali soluzioni più ottimali.
![[Pasted image 20230605175838.png]]
- [[2) Ricerca nello spazio degli stati#^completezza|Completezza]]: No, può intraprendere un ramo infinito
- [[2) Ricerca nello spazio degli stati#^complessita-temporale|Complessità temporale]]:
- [[2) Ricerca nello spazio degli stati#^complessita-spaziale|Complessità spaziale]]:
- [[2) Ricerca nello spazio degli stati#^ottimalita|Ottimalità]]: No

---
## Algoritmo A*
La funzione di valutazione è: 
	$f(n) = g(n) + h(n)$
	dove:
	- $g(n)$ è cammino già percorso, ovvero il costo per raggiungere il prossimo nodo $n$ a partire dalla radice, nonché la profondità del nodo $n$
	- $h(n)$ è la funzione euristica, ossia la distanza stimata dal goal
![[Pasted image 20230605185117.png]]
Nell'immagine, $g(n)$ viene incrementato di 1 ad ogni livello, più il costo del nodo ($h(n)$).
Termina appena si raggiunge il goal, escludendo eventuali soluzioni più ottimali.

- [[2) Ricerca nello spazio degli stati#^completezza|Completezza]]: Sì
- [[2) Ricerca nello spazio degli stati#^complessita-temporale|Complessità temporale]]: $O(b^d)$ con [[3a) Strategie di ricerca non informate#^b|b]] e [[3a) Strategie di ricerca non informate#^d|d]]
- [[2) Ricerca nello spazio degli stati#^complessita-spaziale|Complessità spaziale]]: uguale alla temporale
- [[2) Ricerca nello spazio degli stati#^ottimalita|Ottimalità]]: No
	- Nell'algoritmo Tree Search A*, la strategia è ottima se $h(n)$ è un'[[#Euristica ammissibile|euristica ammissibile]].
	- Nell'algoritmo [[3c) Grafi|Graph Search]] A*, la strategia è ottima se $h(n)$ è un'[[#Euristica consistente/monotòna|euristica consistente]] (dato che l'algoritmo scarta un cammino appena scoperto, se questo porta ad un nodo già espanso può succedere che venga scartato un cammino migliore di quello trovato in precedenza, e quindi che si perda una soluzione ottima).


---
# Grafi
I grafi permettono di raggiungere uno stesso stato percorrendo cammini differenti, a differenza degli alberi. In tal caso, significa che esistono più cammini che portano in quello stato, e dunque si possono scartare eventuali cammini ciclici ed evitare che lo spazio degli stati divendi infinito per colpa dei cicli. *Gli algoritmi che dimenticano la propria storia sono condannati a ripeterla.*

Per la relizzazione algoritmica del **Graph Search**, c'è bisogno di due liste: lista dei nodi chiusi (ovvero dei nodi espansi e rimossi dalla lista per evitare di esaminarli nuovamente) e lista dei nodi aperti (ovvero quelli ancora da esaminare). Se il nodo corrente corrisponde ad un nodo della lista chiusa, non viene espanso ma scartato.