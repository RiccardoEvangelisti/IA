Una strategia informata sfrutta la conoscenza (euristica) sul problema per decidere quale nodo espandere per primo, invece di espandere i nodi in modo qualunque.
Una **funzione di valutazione** fornisce, dato uno stato, una stima computazionale dello sforzo per raggiungere lo stato finale. La funzione deve fornire una stima che riduca la complessità spaziale del problema, e deve tenere conto del tempo speso a calcolare la stima stessa.
Trovare una funzione precisa e veloce è molto difficile.
La **funzione euristica** restituisce la distanza (in termini di costo) dall'obiettivo "goal": `funzione_euristica(goal) = 0`

---
# Best First Search
Utilizzando la funzione di valutazione, viene scelto il nodo con la valutazione più bassa, in quanto tale funzione misura la distanza dall'obiettivo, e viene inserito in testa alla coda (in modo che sia il prossimo ad essere espanso). 
Non è detto che tale scelta sia in verità la migliore, infatti se potessimo sempre espandere per primo il nodo migliore, non ci sarebbe affatto ricerca.

## Best First Greedy
Cerca sempre di espandere il nodo più vicino all'obiettivo, sulla base del fatto che è probabile che questo porti rapidamente ad una soluzione.