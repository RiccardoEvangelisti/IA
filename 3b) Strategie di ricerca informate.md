Una strategia informata sfrutta la conoscenza (euristica) sul problema per decidere quale nodo espandere per primo, invece di espandere i nodi in modo qualunque.
Una **funzione di valutazione** fornisce, dato uno stato, una stima computazionale dello sforzo per raggiungere lo stato finale. La funzione deve fornire una stima che riduca la complessità spaziale del problema, e deve tenere conto del tempo speso a calcolare la stima stessa.
Trovare una funzione precisa e veloce è molto difficile.

---
# Best First Search
Il nodo da espandere viene scelto in base ad una funzione di valutazione. Solitamente viene scelto il nodo con la valutazione più bassa, in quanto tale funzione misura la distanza dall'obiettivo.