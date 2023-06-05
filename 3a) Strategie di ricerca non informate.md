Una strategia non informata (detta **blind**) non usa alcuna conoscenza sul dominio: applica regole in modo arbitrario. Impraticabile per problemi di una certa complessità.

In generale nell'algoritmo delle strategie si fa uso di una coda nella quale vengono inseriti i nodi da espandere. In testa si trova il prossimo nodo da espandere. E' la strategia a decidere dove posizionare nella coda i nuovi nodi espansi (se in testa, in mezzo o al termine della coda).

Indico con:
- *d*: profondità della soluzione a costo minimo ^d
- *b*: massimo fattore di ramificazione, dove il fattore è quanti figli genera un nodo ^b
- *m*: massima profondità dello spazio degli stati ^m
---
# Breadth First Search
Espande sempre per primi i nodi meno profondi di un albero, esplorandolo in ampiezza.
L'esplorazione dell'albero avviene tenendo aperte CONTEMPORANEAMENTE più strade.

Nell'algoritmo i nodi vengono semplicemente inseriti al termine della coda (FIFO).

La ricerca termina appena si trova la (prima) soluzione.
![[Pasted image 20230605124152.png]]

- [[2) Ricerca nello spazio degli stati#^completezza|Completezza]]: Sì, se *b* è finito
  Difficile da implementare efficientemente su architetture monoprocessore.
- [[2) Ricerca nello spazio degli stati#^complessita-temporale|Complessità temporale]]:
  Nel caso peggiore, $1 + b + b^2 + b^3 +…+(b^d – 1) \to b^d = O(b^d)$
  (all’ultimo livello sottraiamo 1 perché il goal non viene ulteriormente espanso)
- [[2) Ricerca nello spazio degli stati#^complessita-spaziale|Complessità spaziale]]: uguale alla temporale
- [[2) Ricerca nello spazio degli stati#^ottimalita|Ottimalità]]:
  Sì, se il costo coincide con la profondità.
  Altrimenti in generale No, perché è improbabile beccare il percorso migliore. Se ci sono altre soluzioni, queste possono solo che essere a profondità più basse (e quindi a costo più alto) perché BFS espande a livelli di profondità.

---
# Uniform Cost Search
I nodi sono inseriti in una coda ordinata, in modo che venga estratto il nodo con costo minore dal nodo di partenza, ossia i nodi sono in ordine di costo di cammino crescente. Nota che nella coda sono inseriti *anche i nodi già espansi*, e la coda viene riordinata dopo ogni espansione.

Si usa al posto della [[#Breadth First Search|BFS]] quando si hanno archi di costo non unitario e quando i costi sono non decrescenti in profondità, altrimenti è difficile inserirli nella coda ordinata.

La ricerca termina appena si trova in modo certo il percorso più corto.

![[Pasted image 20230605155226.png]]
In figura non viene espanso C perché è già stata trovata una soluzione migliore (S->B->G).

- [[2) Ricerca nello spazio degli stati#^completezza|Completezza]]: Sì, se *b* è finito
- [[2) Ricerca nello spazio degli stati#^complessita-temporale|Complessità temporale]]:
  $O(b^{1+C^*/\epsilon})$
  con $C^*$ il costo totale della soluzione ottimale
  e con $\epsilon$ il minimo costo di un arco,
  poiché ogni nodo viene generato nel caso peggiore.
- [[2) Ricerca nello spazio degli stati#^complessita-spaziale|Complessità spaziale]]: uguale alla temporale
- [[2) Ricerca nello spazio degli stati#^ottimalita|Ottimalità]]:
  Sì, perchè la prima volta che verrà espanso il nodo di arrivo la sua distanza dal nodo di partenza sarà minore di o uguale a quella di qualunque altro nodo in coda.

---
# Depth First Search
Espande per primi i nodi più profondi, scegliendo arbitrariamente i nodi di uguale profondità (tipicamente quelli più a sinistra).

Nell'algoritmo i nodi vengono inseriti all'inizio della coda (LIFO).
![[Pasted image 20230605155940.png]]

- [[2) Ricerca nello spazio degli stati#^completezza|Completezza]]: Sì, se non sono presenti rami infiniti.
- [[2) Ricerca nello spazio degli stati#^complessita-temporale|Complessità temporale]]: $O(b^m)$
  E' eccessiva se *[[#^m|m]] >> [[#^d|d]]*
- [[2) Ricerca nello spazio degli stati#^complessita-spaziale|Complessità spaziale]]: $O(b·m)$
  L'occupazione in memoria è modesta in quanto, una volta terminata l'esplorazione di un ramo, questo può essere rimosso dalla memoria se non conteneva un goal. Dal punto di vista realizzativo è efficiente perché si può realizzare con un solo stack che contiene il ramo attualmente espanso.
- [[2) Ricerca nello spazio degli stati#^ottimalita|Ottimalità]]: No, se il costo coincide con la profondità, perché può esistere una soluzione ad una profondità minore in un ramo inesplorato.

---
# Depth Limited Search (ricerca a profondità limitata)
E' la [[#Depth First Search|DFS]] con una massima profondità di ricerca per evitare problemi derivanti da rami infiniti.
Quando si raggiunge il massimo di profondità o un fallimento si considerano strade alternative della stessa profondità (se esistono). Terminate le opzioni della stessa profondità, si sale di un livello e si continua.

Dal punto di vista realizzativo si può sfruttare la ricorsività dell'ambiente di esecuzione del linguaggio di implementazione per costruire lo stack.

- [[2) Ricerca nello spazio degli stati#^completezza|Completezza]]: No, possono esistere soluzioni in livelli più profondi del limite
- [[2) Ricerca nello spazio degli stati#^complessita-temporale|Complessità temporale]]: uguale a [[#Depth First Search|DFS]]
- [[2) Ricerca nello spazio degli stati#^complessita-spaziale|Complessità spaziale]]: uguale a [[#Depth First Search|DFS]]
- [[2) Ricerca nello spazio degli stati#^ottimalita|Ottimalità]]: uguale a [[#Depth First Search|DFS]]

---
# Iterative Deepening Search (ricerca ad approfondimento iterativo)
Si comporta come una [[#Breadth First Search]] iterando più volte una [[#Depth First Search]] con profondità limitata crescente. Ossia completa e sviluppa un solo ramo per volta.

![[Pasted image 20230605163904.png]]

- [[2) Ricerca nello spazio degli stati#^completezza|Completezza]]: Sì, se *b* è finito
- [[2) Ricerca nello spazio degli stati#^complessita-temporale|Complessità temporale]]:
  $(d+1)1 + (d)b + (d-1)b^2 + … + 3b^{d-2} + 2b^{d-1} + b^d \to O(b^d)$ 
- [[2) Ricerca nello spazio degli stati#^complessita-spaziale|Complessità spaziale]]: uguale a [[#Depth First Search|DFS]]
- [[2) Ricerca nello spazio degli stati#^ottimalita|Ottimalità]]: uguale a [[#Depth First Search|DFS]]