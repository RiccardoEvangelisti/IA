Una strategia informata sfrutta la conoscenza (euristica: in greco "trovare") sul problema per decidere quale nodo espandere per primo, invece di espandere i nodi in modo qualunque.
###### Funzione di valutazione
Una funzione di valutazione ***f(n)*** fornisce, dato uno stato "*n*", una stima computazionale dello sforzo per raggiungere lo stato finale. La funzione deve fornire una stima che riduca la complessità spaziale del problema, e deve tenere conto del tempo speso a calcolare la stima stessa. ^funzione-di-valutazione
Trovare una funzione di valutazione precisa e veloce è molto difficile.
###### Funzione euristica
La funzione euristica ***h(n)***, dato uno stato "*n*", restituisce la distanza (in termini di costo) dall'obiettivo "goal": `funzione_euristica(goal) = 0` ^funzione-euristica

---
# Best First Search
Utilizzando la [[#Funzione di valutazione]], viene scelto il nodo con la valutazione più bassa, in quanto tale funzione misura la distanza dall'obiettivo, e viene inserito in testa alla coda (in modo che sia il prossimo ad essere espanso).
Non è detto che tale scelta sia in verità la migliore, infatti se potessimo sempre espandere per primo il nodo migliore, non ci sarebbe affatto ricerca.

---
## Best First Greedy
La funzione di valutazione è uguale alla funzione euristica, quindi cerca sempre di espandere il nodo più vicino all'obiettivo: 
	*f(n) = h(n)*
Termina appena si raggiunge il goal, escludendo eventuali soluzioni più ottimali.
![[Pasted image 20230605175838.png]]
- [[2) Ricerca nello spazio degli stati#^completezza|Completezza]]: No, può intraprendere un ramo infinito
- [[2) Ricerca nello spazio degli stati#^complessita-temporale|Complessità temporale]]:
- [[2) Ricerca nello spazio degli stati#^complessita-spaziale|Complessità spaziale]]:
- [[2) Ricerca nello spazio degli stati#^ottimalita|Ottimalità]]: No

---
## Algoritmo A*
La funzione di valutazione è: 
	*f(n) = g(n) + h(n)*
	dove:
	- *g(n)* è cammino già percorso, ovvero il costo per raggiungere il prossimo nodo "*n*" a partire dalla radice, nonché la profondità del nodo "*n*"
	- *h(n)* è la funzione euristica, ossia la distanza stimata dal goal
![[Pasted image 20230605185117.png]]
Nell'immagine, g(n) viene incrementato di 1 ad ogni livello, più il costo del nodo (h(n)).
Termina appena si raggiunge il goal, escludendo eventuali soluzioni più ottimali.

- [[2) Ricerca nello spazio degli stati#^completezza|Completezza]]: Sì
- [[2) Ricerca nello spazio degli stati#^complessita-temporale|Complessità temporale]]: $O(b^d)$ con [[3a) Strategie di ricerca non informate#^b|b]] e [[3a) Strategie di ricerca non informate#^d|d]]
- [[2) Ricerca nello spazio degli stati#^complessita-spaziale|Complessità spaziale]]: uguale alla temporale
- [[2) Ricerca nello spazio degli stati#^ottimalita|Ottimalità]]: No

###### Ottimalità di A*
L'algiritmo diventa ottimo se *h(n)* è un'euristica **ammissibile**, ovvero se non sbaglia mai per eccesso la stima del costo per arrivare all'obiettivo.
Indicando con *vera_distanza(n)* la vera distanza tra il nodo "*n*" e il goal, la funzione euristica *h(n)* è **ammissibile** se abbiamo sempre che:
	*vera_distanza(n) <= h(n)*


. La ricerca A* trova la soluzione ottima se l’euristica `e ammissibile (v. domanda relativa). Una condizione pi`u forte dell’ammissibilit`a `e la coerenza, che richiede che l’euristica rispetti la disuguaglianza triangolare, i.e. h(x) <= d(x, y) + h(y) essendo d(x, y) la distanza reale tra i nodi x e y. Ogni euristica coerente `e ammissibile, ma non vale il viceversa.