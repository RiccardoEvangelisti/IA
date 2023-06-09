Una strategia informata sfrutta la conoscenza (euristica: in greco "trovare") sul problema per decidere quale nodo espandere per primo, invece di espandere i nodi in modo qualunque.

###### Funzione di valutazione
Una funzione di valutazione $f(n)$ fornisce, dato uno stato $n$, una **stima** computazionale dello sforzo per raggiungere lo stato finale. La funzione deve fornire una stima che riduca la complessità spaziale del problema, e deve tenere conto del tempo speso a calcolare la stima stessa.
Trovare una funzione di valutazione precisa e veloce è molto difficile.

###### Funzione euristica
La funzione euristica $h(n)$, dato uno stato $n$, restituisce la distanza (in termini di costo) dall'obiettivo $goal$: $h(goal) = 0$


###### Euristica ammissibile
La funzione euristica $h(n)$ è un'euristica **ammissibile** se non sbaglia mai per eccesso la stima (del costo per arrivare all'obiettivo), in caso di alberi TREE-SEARCH.
Indicando con $vera\_distanza(n)$ la vera distanza tra il nodo $n$ e il goal, la funzione euristica $h(n)$ è ammissibile se abbiamo sempre che:
	*$h(n) \le vera\_distanza(n)$*

Se  $h(n) \le h'(n) \le vera\_distanza(n)$  , la migliore è $h'(n)$.


###### Euristica consistente/monotòna
La funzione euristica $h(n)$ è un'euristica **consistente** se:
	per ogni nodo $n$
	per ogni nodo successore $n'$ di $n$, generato da un'azione $a$:
	il costo stimato per raggiungere il goal (partendo da $n$) è minore-uguale al costo di passo per arrivare ad $n'$ sommato al costo stimato per andare da $n'$ al goal:
	- $h(n) = 0$, se $n$ coincide con il goal
	- $h(n) ≤ c(n, a, n') + h(n')$, ovvero la stima di $n$ deve essere minore-uguale della strada per arrivare da $n$ ad $n'$ sommata alla stima di $n'$ (proprietà triangolare).
	  ![[Pasted image 20230606101527.png | 150]]
	  Ad esempio:
	  ![[Pasted image 20230608184923.png|200]]
	  L'euristica h(n) NON è consistente perché:
	  - Preso l'arco A->C: 
	    $h(A) = 5$
	    $h(C) = 1$
	    $c(A,C) = 3$ 
	    $5 \le 3+1$ ? NO!
	- Preso l'arco B->C:
		$h(B) = 4$
	    $h(C) = 1$
	    $c(B,C) = 1$ 
	    $4 \le 1+1$ ? NO!
	  


Questo significa che, se si hanno più strade, verranno valutate sempre per prime le strade migliori.
Se $h(n)$ è consistente, $f(n)$ è [[2) Ricerca nello spazio degli stati#Sistema di produzioni monotòno|monotòna]], ossia i suoi valori sono non decrescenti lungo il cammino. Il primo nodo obiettivo selezionato per l'espansione deve essere quindi una soluzione ottima visto che tutti quelli successivi avranno un costo almeno uguale.


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
La [[#Funzione di valutazione|funzione di valutazione]] è: 
	$f(n) = g(n) + h(n)$
	dove:
	- $g(n)$ è cammino già percorso, ovvero il costo per raggiungere il prossimo nodo $n$ a partire dalla radice. ^g-n
	- $h(n)$ è la [[#Funzione euristica|funzione euristica]], ossia la distanza stimata da $n$ al goal. ^h-n
![[Pasted image 20230605185117.png]]
Nell'immagine, $g(n)$ viene incrementato di 1 ad ogni livello, più il costo del nodo ($h(n)$).

- [[2) Ricerca nello spazio degli stati#^completezza|Completezza]]: Sì
- [[2) Ricerca nello spazio degli stati#^complessita-temporale|Complessità temporale]]: $O(b^d)$ con [[3) Strategie di ricerca non informate#^b|b]] e [[3) Strategie di ricerca non informate#^d|d]]
- [[2) Ricerca nello spazio degli stati#^complessita-spaziale|Complessità spaziale]]: uguale alla temporale
- [[2) Ricerca nello spazio degli stati#^ottimalita|Ottimalità]]: No
	- Nell'algoritmo Tree Search A*, la strategia è ottima se $h(n)$ è un'[[#Euristica ammissibile|euristica ammissibile]].
	- Nell'algoritmo [[#Grafi|Graph Search]] A*, la strategia è ottima se $h(n)$ è un'[[#Euristica consistente/monotòna|euristica consistente]] (dato che l'algoritmo scarta un cammino appena scoperto, se questo porta ad un nodo già espanso può succedere che venga scartato un cammino migliore di quello trovato in precedenza, e quindi che si perda una soluzione ottima).


---
# Grafi
I grafi permettono di raggiungere uno stesso stato percorrendo cammini differenti, a differenza degli alberi. In tal caso, significa che esistono più cammini che portano in quello stato, e dunque si possono scartare eventuali cammini ciclici ed evitare che lo spazio degli stati divendi infinito per colpa dei cicli. *Gli algoritmi che dimenticano la propria storia sono condannati a ripeterla.*

Per la relizzazione algoritmica del **Graph Search**, c'è bisogno di due liste: lista dei nodi chiusi (ovvero dei nodi espansi e rimossi dalla lista per evitare di esaminarli nuovamente) e lista dei nodi aperti (ovvero quelli ancora da esaminare). Se il nodo corrente corrisponde ad un nodo della lista chiusa, non viene espanso ma scartato.


> [!A* da grafo ad albero]
> 1) Disegnare la tabella:
>   
> Percorso Attuale | Costo ([[#Algoritmo A*\|g(n)]]) | Stima [[#Funzione di valutazione\|f(n)]] = [[#Algoritmo A*\|g(n)]] + [[#Funzione euristica\|h(n)]] | Lista nodi espansi
> --- | --- | --- | ---
> 
> 2) Espandere il nodo iniziale:
>    
> Percorso Attuale | Costo ([[#Algoritmo A*\|g(n)]]) | Stima [[#Funzione di valutazione\|f(n)]] = [[#Algoritmo A*\|g(n)]] + [[#Funzione euristica\|h(n)]] | Lista nodi espansi
> --- | --- | --- | ---
>  A | 0 | stima_A | A |
> 
> 3) Valutare il prossimo nodo da espandere, basandosi sulla più piccola [[#Funzione di valutazione\|f(n)]] = [[#Algoritmo A*|g(n)]] + [[#Funzione euristica\|h(n)]] tra TUTTI i nodi foglia attualmente presenti.
> 4) Selezionare il nodo da espandere, SEGNARE SULL'ALBERO (con un numeretto) L'ORDINE DEI NODI CHE SI STANNO ESPANDENDO, e inserire in tabella:
> 
> Percorso Attuale | Costo ([[#Algoritmo A*\|g(n)]]) | Stima [[#Funzione di valutazione\|f(n)]] = [[#Algoritmo A*\|g(n)]] + [[#Funzione euristica\|h(n)]] | Lista nodi espansi
> --- | --- | --- | ---
>  A | 0 | stima_A | A 
>  A B | 0 + g(B) | stima_B | A,B
>   
> - "In caso di non determinismo si selezionino i nodi da espandere secondo l’ordine alfabetico" --> significa espandere entrambi i nodi, uno dopo l'altro, poi valutare la strada migliore.
> - Se il nodo è un vicolo cieco, si scarta il nodo e si trova il nuovo valore f(n) più piccolo.
> - A parità di costo per arrivare al goal, scegli la soluzione con meno nodi.
> - Termina appena "vorresti espandere" il nodo goal
> - L'albero è OTTIMALE se vi è una [[#Euristica ammissibile|euristica ammissibile]], perché non si tiene traccia dei nodi già visitati.


> [!A* risoluzione grafo]
> - Il grafo è OTTIMALE se vi è una [[#Euristica consistente/monotòna|euristica consistente]], perché così si garantisce che si raggiunga un nodo con il percorso più breve nell'ipotesi di non riespandere nodi già espansi.
> - Qui non si vanno ad espandere  di nuovo i nodi già espansi
> - Il resto è uguale