Una strategia informata sfrutta la conoscenza (euristica) sul problema per decidere quale nodo espandere per primo, invece di espandere i nodi in modo qualunque.
###### Funzione di valutazione
Una funzione di valutazione ***f(n)*** fornisce, dato uno stato, una stima computazionale dello sforzo per raggiungere lo stato finale. La funzione deve fornire una stima che riduca la complessità spaziale del problema, e deve tenere conto del tempo speso a calcolare la stima stessa. ^funzione-di-valutazione
Trovare una funzione precisa e veloce è molto difficile.
###### Funzione euristica
La funzione euristica ***h(n)*** restituisce la distanza (in termini di costo) dall'obiettivo "goal": `funzione_euristica(goal) = 0` ^funzione-euristica

---
# Best First Search
Utilizzando la [[#Funzione di valutazione]], viene scelto il nodo con la valutazione più bassa, in quanto tale funzione misura la distanza dall'obiettivo, e viene inserito in testa alla coda (in modo che sia il prossimo ad essere espanso).
Non è detto che tale scelta sia in verità la migliore, infatti se potessimo sempre espandere per primo il nodo migliore, non ci sarebbe affatto ricerca.

## Best First Greedy
La funzione di valutazione è uguale alla funzione euristica, quindi cerca sempre di espandere il nodo più vicino all'obiettivo: *f(n) = h(n)*.
Non considera il costo per raggiungere il nodo goal dallo stato iniziale.
Termina appena si raggiunge il goal, escludendo eventuali soluzioni più ottimali.

## Algoritmo A*
La funzione di valutazione è: f(n) = h 0 (n) + g(n)